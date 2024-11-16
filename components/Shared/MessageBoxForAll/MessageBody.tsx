"use client";


import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import MessageBoxForAll from "./MessageBoxForAll";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSnackbar } from "@/context/snackbar_context";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import VerifyUser from "@/app/middleware/VerifyUser";
import { useUserStore } from "@/context/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/context/firebase";
import { useChatStore } from "@/context/chatStore";
import { useUserContext } from "@/context/user_context";
import moment from "moment";

export default function MessageBody() {
  const [searchQuery, setSearchQuery]: any = useState<string>(""); // To search by name or username
  const [selectedMessage, setSelectedMessage]: any = useState<any>(); // to select message for open and manage active conversation
  const [messageListOpen, setMessageListOpen]: any = useState<boolean>(true);
  const [loading2, setLoading2]: any = useState(true);
  const [loading, setLoading]: any = useState(false);
  const [userData, setUserData]: any = useState({});
  const [chats, setChats]: any = useState([]);
  const [seen, setSeen] = useState(0);
  const [currentUs, setCurrentUs]: any = useState({});
  const [input, setInput]: any = useState(""); // Search input state

  const router: any = useRouter();
  const pathname: any = usePathname();
  const { generateSnackbar }: any = useSnackbar();
  const { currentUser, fetchUserInfo }: any = useUserStore();
  const { chatId, changeChat }: any = useChatStore();
  const { userChatDetilas }: any = useUserContext();

  useEffect(() => {
    async function findUserAndChats() {
      try {
        let token: any = Cookies.get("token");
        let ver: any = await VerifyUser(token, window.location.pathname.split("/")[1]);

        let currentUser: any = await userChatDetilas({
          userId: ver.userId,
          userType: ver.userType === "client" ? "client" : "professional",
        });

        setCurrentUs(currentUser?.data?.data);

        // Set up the snapshot listener for real-time updates
        const unSub: any = onSnapshot(doc(db, "usersChats", currentUser?.data?.data?.id), async (res) => {
          let items: any = res?.data()?.chats;
          let promises
          if (items !== undefined) {

            promises = items?.map(async (item) => {
              let userDocRef: any = await userChatDetilas({
                userId: item?.receiverId,
                userType: ver?.userType === "client" ? "professional" : "client",
              });

              let userDocSnap: any = userDocRef?.data;
              let user = userDocSnap;

              return { ...item, user };
            });
          }
          else {
            promises = []
          }

          let chatData: any = await Promise.all(promises);
          setChats(chatData?.sort((a, b) => b?.updatedAt - a?.updatedAt));
          setLoading2(false);
        });

        // Return the unsubscribe function to be called on unmount
        return unSub;
      } catch (e) {
        // console.log(e);
      }
    }

    // Call the async function inside useEffect
    const unSubFn = findUserAndChats();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      if (findUserAndChats) {
        findUserAndChats(); // This will stop the real-time updates
      }
    };
  }, [pathname]);

  // Recalculate the 'seen' value when 'chats' changes
  useEffect(() => {
    const unseenMessages = chats?.filter((message: any) => !message?.isSeen).length;
    setSeen(unseenMessages || 0);
  }, [chats]);

  // Filter chats based on the search input
  const filteredChats = chats.filter((message: any) =>
    message?.user?.data?.username?.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
          <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex">
            <button
              type="button"
              onClick={() => setMessageListOpen(!messageListOpen)}
              className="m-0 p-0 relative z-[300] md:hidden"
            >
              <AiOutlineMenu className="size-5" />
            </button>
            <div className="w-auto flex-grow md:px-3 pt-2 md:py-2 overflow-hidden relative">
              <div className="flex h-full gap-4 relative">
                <div
                  className={`w-[260px] h-[76vh] custom-scroll-of-message max-md:overflow-scroll md:h-[560px] absolute md:static flex-shrink-0 ${messageListOpen
                      ? "left-0 top-0 bottom-0 max-md:z-[150] visible md:visible md:shadow-none shadow-lg md:bg-transparent bg-white p-2"
                      : "-left-full bottom-0 top-0 invisible md:visible md:shadow-none shadow-lg md:bg-transparent bg-white p-2 max-md:z-[150]"
                    } transition-all duration-300`}
                >
                  <div className="flex w-full py-2 justify-between">
                    <div className="flex gap-2">
                      <p className="text-[14px] text-[#555758] font-semibold">Inbox</p>
                      <label className="bg-[#C3F0FB] text-[#1D75DD] text-[8px] py-1 px-3 rounded-lg">
                        {seen} New
                      </label>
                    </div>

                    <Link href={"/account_settings/notifications"}>
                      <IoSettingsOutline className="size-[18px] text-[#555758]" />
                    </Link>
                  </div>

                  <div className="py-2">
                    <div className="flex items-center bg-[#F2F2F2] rounded-[20px] px-4 py-1 w-full">
                      <AiOutlineSearch className="size-[20px] text-[#909090]" />
                      <input
                        type="search"
                        placeholder="Search by username..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="outline-none bg-transparent ml-2 text-gray-500 placeholder-gray-400 w-full py-1"
                      />
                    </div>
                  </div>
                  {/* Filtered message list */}
                  <div className="md:py-1 h-[76vh] md:h-full">
                    <ul className="h-full  w-[100%] rounded-xl overflow-x-hidden chat-nav flex-shrink-0">
                      {filteredChats && filteredChats?.map((message: any, i: number) => (
                        <li
                          key={i}
                          onClick={() => {
                            setSelectedMessage(message);
                            setMessageListOpen(false);
                          }}
                          className={`w-full  ${selectedMessage?.chatId === message?.chatId
                              ? "bg-[#07242B]"
                              : "bg-[#F2F2F2]"
                            } p-3 mb-[1px] cursor-pointer`}
                        >
                          <div className="flex justify-between gap-3">
                            <div className="flex items-center">
                              <img
                                className="w-8 h-8 object-cover object-top rounded-full border shadow"
                                src={message?.user?.data?.avatar}
                                alt=""
                              />
                              <div className="px-2">
                                <p className="text-[14px] text-[#989BA1] font-semibold tracking-wide capitalize">
                                  {message?.projectTitle?.substring(0, 13)}...
                                </p>
                                <p className="text-[10px] text-[#989BA1] font-semibold tracking-wide capitalize">
                                  {message?.user?.data?.businessName.length > 0 ? message?.user?.data?.businessName : message?.user?.data?.username}
                                </p>
                              </div>
                            </div>
                            <p className="text-[12px] font-semibold text-[#989BA1]">
                              {moment.duration(message?.updatedAt - Date.now()).humanize()}
                            </p>
                          </div>
                          <div className="py-2">
                            <p className="text-[13px] text-[#989BA1] px-3">
                              {message?.lastMessage?.substring(0, 30)}...
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* message box main */}
                {selectedMessage ? (
                  <div className="w-auto flex flex-1 justify-center items-center h-[74vh] md:h-[635px] p-3 mt-3 rounded-md overflow-x-auto overflow-y-scroll custom-scroll-of-message">
                    <MessageBoxForAll data={selectedMessage} currentUser={currentUs} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-gray-500 w-full">
                    Select a message to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
