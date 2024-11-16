'use client'

import { BsThreeDotsVertical } from "react-icons/bs"
import './Message.css'
import { useEffect, useRef, useState } from "react"
import { HiOutlineFaceSmile } from "react-icons/hi2"
import EmojiPicker from "emoji-picker-react"
import { FiSend } from "react-icons/fi"
import { ImAttachment } from "react-icons/im"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "@/context/firebase"
import upload from "@/context/upload"
import moment from "moment"

type PropsType = {
    data: any
}

export default function MessageBoxForAll({ data, currentUser }  : any ) {

    const [demoMessageCollection, setDemoMessageCollection]  : any  = useState<any[]>([]); // here it is for the demo message collection fot the message box
    const [messageCollection, setMessageCollection]  : any  = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker]  : any  = useState<boolean>(false);
    const [selectedFile, setSelectedFile]  : any  = useState<string | null>(null); // Store the selected file as photo url. for now i did it with objectURL only for photo because it is not connected with any cloud
    const [isModalOpen, setIsModalOpen]  : any  = useState<boolean>(false);
    const [modalImage, setModalImage]  : any  = useState<string | null>(null);

    const toggleEmojiPicker = () => setShowEmojiPicker(prev => !prev);

    const handleEmojiClick = (emojiObject: any) => {
        setText(prev => prev + emojiObject.emoji);
    };

    const handleMessageChange = (e:  any ) => {
        setMessageCollection(e.target.value);
    };

    const handleFileChange = (e:  any ) => {
        if (e.target.files) {
            setSelectedFile(URL.createObjectURL(e.target.files[0]));
                setImg({
                  file : e.target.files[0],
                  url : URL.createObjectURL(e.target.files[0])
                })
        }
    };

    const handleSubmit = (e : any ) => {
        e.preventDefault();
        const message = {
            message: text,
            file: selectedFile
        };

        setDemoMessageCollection(prev => [...prev, message]);
        // Clear inputs after submission
        setMessageCollection("");
        setSelectedFile(null);
    };

    const handleImageClick = (imgUrl:  any ) => {
        setModalImage(imgUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);


    // emoji box responsive
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);


    let [chat,setChat]  : any  = useState(false);
    let [text, setText]  : any  = useState("");
    let [img, setImg]  : any  = useState({
      file : null,
      url : ""
    });
  
    let endRef  : any  = useRef(null);

    useEffect(()=>{
        endRef?.current?.scrollIntoView({behavior: "smooth"})
      }, []);

    useEffect(()=>{
        let unSub = onSnapshot(doc(db, "chats", data?.chatId), (res)=>{
          setChat(res?.data());
        });
    
        return() =>{
          unSub();
        }
      }, [data]);



      
  let handleSend = async (e  : any ) =>{
    e.preventDefault();
    if (text === "" && !img) return;
    let imgUrl = null;
    try{
        if(img.file){
            imgUrl = await upload(img.file);
        }
        {
            imgUrl 
            ?
            await updateDoc(doc(db, "chats", data?.chatId), {
                messages : arrayUnion({
                  senderId : currentUser.id,
                  text,
                  createdAt : new Date(),
                  img : imgUrl
                })
              })
            :
            await updateDoc(doc(db, "chats", data?.chatId), {
                messages : arrayUnion({
                  senderId : currentUser.id,
                  text,
                  createdAt : new Date(),
                })
              });

        }
      
      let userIDs = [currentUser.id, data?.receiverId];

      userIDs.forEach(async (id)=>{
        
        let userChatRef = doc(db, "usersChats", id);
        let userChatsSnapShot : any = await getDoc(userChatRef);
        
        if(userChatsSnapShot.exists()){
          let userChatsData  : any  = userChatsSnapShot.data();
          
          let chatIndex = userChatsData.chats.findIndex(c => c.chatId === data?.chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          
          await updateDoc(userChatRef, {
            chats :userChatsData?.chats
          })
          
        }
      })


    }
    catch(e){
    //   console.log(e);
    };

    setImg({
      file : null,
      url : ""
    });
    setSelectedFile(null);

    setText("");
  }


  return (
      <div className="w-full h-full relative">
          {/* Header */}
          <div className="w-full flex justify-between bg-[#EDEDED] p-3 rounded-md mx-2">
              <div className="flex items-center mx-2">
                  <img
                      className="w-10 h-10 object-cover object-top rounded-full border shadow"
                      src={data?.user?.data?.avatar}
                      alt=""
                  />
                  <div className="px-2 mx-2">
                      <p className="text-[17px] text-[#989BA1] font-semibold tracking-wide capitalize">
                          
                      {data?.user?.data?.businessName.length > 0 ? data?.user?.data?.businessName  : data?.user?.data?.username}
                      </p>
                      <p className="text-[13px] text-[#989BA1] font-semibold tracking-wide capitalize">
                        {data?.projectTitle.slice(0,45)}...
                      </p>
                  </div>
              </div>
              <button>
                  <BsThreeDotsVertical className="size-[20px] text-[#989BA1]" />
              </button>
          </div>

          {/* Chat box with messages */}
          <div className="w-full h-[540px] justify-between  bg-[#EDEDED] p-3 mt-3 rounded-md relative border-4 border-red-400">
              <div className="w-full h-full overflow-x-hidden overflow-y-scroll custom-scroll-of-message pb-12">
                

                  {/* Display Demo Messages */}

                  {chat?.messages?.map((messageData: any, i: number) => (
                    <>
                    {
                        messageData.senderId === currentUser.id 
                        ?
                        <div key={i} className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:w-[350px] flex md:flex-row-reverse items-start ms-auto gap-5 py-2 max-md:mx-auto">
                        <div>
                            {messageData?.text && (
                                <div className="flex-grow flex flex-col justify-start bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden" >
                                    <p className="text-[15px] px-5 ">
                                           {messageData?.text}
                                      </p>
                                </div>
                            )}
                            {messageData?.img && (
                                <div
                                    className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                                    onClick={() => handleImageClick(messageData.img)}
                                >
                                    <img className="w-full h-auto" src={messageData.img} alt="work alat" />
                                </div>
                            )}
                            <p className="text-[#989BA1] text-[12px] pt-1 text-end">{moment(new Date(messageData?.createdAt?.seconds * 1000 + messageData?.createdAt?.nanoseconds / 1000000)).format('h:mm A')}</p>
                        </div>
                        
                    </div>
                        :
                        <div className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:flex-row md:w-[350px] flex items-start gap-5 py-2 max-md:mx-auto">
                      <div>
                      {messageData?.text && (                       
                        <div className="flex-grow flex flex-col bg-white ring-[2px] shadow ring-[#1D75DD]/50 rounded-md p-2 h-full overflow-hidden">
                        <p className="text-[15px] px-5">{messageData?.text}</p>
                        </div>
                      )}
                          {messageData?.img && (
                                <div
                                    className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                                    onClick={() => handleImageClick(messageData.img)}
                                >
                                    <img className="w-full h-auto" src={messageData.img} alt="work alat" />
                                </div>
                            )}
                          <p className="text-[#989BA1] text-[12px] pt-1">{moment(new Date(messageData?.createdAt?.seconds * 1000 + messageData?.createdAt?.nanoseconds / 1000000)).format('h:mm A')}</p>
                      </div>
                  </div>
                    }
                    
                    </>
                     
                  ))}
                  {/* <div ref={endRef}></div> */}


                  {demoMessageCollection.map((messageData: any, i: number) => (
                      <div key={i} className="2xl:w-[700px] xl:w-[550px] lg:w-[400px] w-11/12 flex-col md:w-[350px] flex md:flex-row-reverse items-start ms-auto gap-5 py-2 max-md:mx-auto">
                          <img
                              className="w-10 h-10 rounded-full border shadow object-cover object-top flex-shrink-0"
                              src="https://st2.depositphotos.com/1010683/6767/i/450/depositphotos_67675279-stock-photo-asian-female-customer-services-operator.jpg"
                              alt="work alat"
                          />
                          <div>
                              {messageData?.message && (
                                  <div className="flex-grow flex flex-col bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden">
                                      <p className="text-[15px] px-5">{messageData?.message}</p>
                                  </div>
                              )}
                              {messageData?.file && (
                                  <div
                                      className="w-[200px] mt-1 bg-[#C3F0FB] shadow rounded-md p-2 h-full overflow-hidden cursor-pointer"
                                      onClick={() => handleImageClick(messageData.file)}
                                  >
                                      <img className="w-full h-auto" src={messageData.file} alt="work alat" />
                                  </div>
                              )}
                              <p className="text-[#989BA1] text-[12px] pt-1 text-end">12:25 pm</p>
                          </div>
                      </div>
                  ))}

                  
              </div>

              <div>
                  {/* Input Section (Inside Chat Box) */}
                  <div className="absolute bottom-2 left-0 right-0 px-3">
                      <form>
                        
                          <div className="bg-white w-full flex max-sm:justify-between items-center p-1 rounded-md shadow-md border border-gray-300 box-border overflow-hidden">
                              <input
                                  value={text}
                                  onChange={(e)=>{setText(e.target.value)}}
                                  type="text"
                                  name="messageTxt"
                                  className="sm:w-auto w-[160px] py-1 px-3 sm:flex-grow rounded-none border-none outline-none bg-transparent"
                                  placeholder={!data?.activeChat ? "Chat is disabled with the user." :  "Write message here"}
                              />

                              <div className="flex items-center">
                                  {/* File Attachment Preview */}
                                  {selectedFile && (
                                      <div className="w-[50px] h-[50px] overflow-hidden mx-1">
                                          <img src={selectedFile} className="w-full h-full object-cover" alt="Preview" />
                                      </div>
                                  )}

                                  {/* File attachment */}
                                  <label htmlFor="photo" className="mx-1 cursor-pointer">
                                      <ImAttachment className="text-gray-500 w-4 h-4" />
                                      <input
                                          id="photo"
                                          className="hidden"
                                          type="file"
                                          onChange={handleFileChange}
                                      />
                                  </label>

                                  {/* Emoji Picker */}
                                  <div>
                                      <div onClick={toggleEmojiPicker} className="p-1 me-1 cursor-pointer">
                                          <HiOutlineFaceSmile className="size-[20px] text-black/50" />
                                      </div>
                                      {showEmojiPicker && (
                                          <div className="absolute bottom-12 right-1 z-50">
                                              <EmojiPicker width={
                                                  (screenWidth && screenWidth < 450) ? "250px" : "360px"
                                              } onEmojiClick={handleEmojiClick} />
                                          </div>
                                      )}
                                  </div>

                                  {/* Submit Button */}
                                  <button
                                      type="submit"
                                      onClick={handleSend}
                                      disabled={!data?.activeChat}
                                    //   className="bg-[#07242B] p-2 rounded flex items-center justify-center text-white hover:bg-[#0A2F36] transition-all"
                                    className={`p-2 rounded flex items-center justify-center transition-all ${
                                        !data?.activeChat
                                            ? 'bg-gray-400 cursor-not-allowed'  // Gray background and restricted cursor when disabled
                                            : 'bg-[#07242B] hover:bg-[#0A2F36] text-white'  // Original styling when enabled
                                    }`}
                                  >
                                      <FiSend className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>




                  {/* Fullscreen Image Modal */}
                  {isModalOpen && modalImage && (
                      <div
                          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                          onClick={closeModal}
                      >
                          <img src={modalImage} className="max-w-full max-h-full" alt="Full-size preview" />
                      </div>
                  )}
              </div>
          </div>
      </div>
  )
}
