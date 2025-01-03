"use client"
import AuthNavbar from "@/components/navbar/auth_navbar";
import Profile from "@/components/Profile/Profile";
import { useUserContext } from "@/context/user_context";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaFacebookF, FaLink, FaStar, FaTwitter, FaWhatsapp } from "react-icons/fa6"
import { GiCheckedShield } from "react-icons/gi"
import { HiMiniCheckBadge } from "react-icons/hi2"
import { IoMdChatboxes, IoMdShare } from "react-icons/io"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Rating, Tooltip, Typography } from "@mui/material"
import DOMPurify from 'dompurify';
import { useSnackbar } from "@/context/snackbar_context";
import moment from "moment"
import axios from "axios";


export default function ProfilePage() {
    let router : any  = useRouter();
    let params : any  = useParams(); 
    let { clientDetails } : any  = useUserContext();
    const [loading2, setLoading2] : any  = useState(true);
    let id = params.id; 
    let [data,setData] : any  = useState({});
    let [isData,setIsData]  : any = useState(false);
    const { generateSnackbar } = useSnackbar();

  

    useEffect(()=>{
        async function getData (){
            try{ 
                let data : any  = await  clientDetails({userId : id});
                if(data?.status !== 400 || data?.data?.status === "success"){
                    setData(data?.data?.data);
                    setIsData(true);
                    setLoading2(false);
                }
                else{
                    setData({});
                    setIsData(false);
                    setLoading2(false);
                }
            }
            catch(e){
                // console.log(e);
                router.push("/error");
            }
        }
        getData();
    },[id])


    let profile = 20;
    (data?.isEmailVerify ? profile +=20 : profile +=0);
    (data?.isPhoneVerify ? profile +=20 : profile +=0);
    (data?.isRegistrationComplete ? profile +=20 : profile +=0);
    (data?.isPaymentVerify ? profile +=20 : profile +=0);
    

    
    const VerifiedCell = ({
        isVerified,
        Icon,
        name,
    }: {
        isVerified: boolean | undefined;
        Icon: ReactNode;
        name: "email" | "payment" | "identity" | "phone";
    }) => {
        return (
            <Tooltip
                arrow
                title={
                    <span className="!font-mono capitalize flex items-center gap-2 !text-sm">
                        {Icon}
                        {name} {isVerified ? "Verified" : "Unverified"}
                        {isVerified ? <DoneIcon className="text-green-600 w-4 h-4 -mt-0.5" /> : <></>}
                        {data.isprofessionalEmailVerify }
                    </span>
                }
                classes={{
                    tooltip: "bg-[rgb(237,237,237)] text-main",
                    arrow: "text-[rgb(237,237,237)]",
                }}
            >
                <Box className={`flex justify-center items-center gap-1 cursor-pointer`}>
                    {Icon}
                </Box>
            </Tooltip>
        );
    };


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        generateSnackbar("Link copied to clipboard!", "success")
        // alert('Link copied to clipboard!');
        setIsOpen(false); // Close the dropdown after copying
    };
    



    const [flag, setFlag] : any = useState("");
    const fetchFlag = async (cnt) => {

        if (!cnt.trim()) {
        return;
        }

        try {
        const response = await axios.get(
            `https://restcountries.com/v3.1/name/${cnt}`
        );

        const country = response.data[0]; // First matching country
        if (country && country.flags && country.flags.png) {
            setFlag(country.flags.png)
        } else {
            setFlag(null)
        }
        } catch (err) {
        setFlag(null)
        }
    };

    return (
        <>
               {loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div> 
            )
            :(
                <>
                {
                    (isData)
                    ?
                    <>  
                              <div className="bg-white relative pb-12">
            {/* Left Image */}
            <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
            {/* Right Image */}
            <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />

            <div className="w-full bg-secondary h-[80px] sm:h-[100px]"></div>
            {/* Content */}
            <div className="relative z-10 pt-6 container mx-auto lg:px-12 2xl:px-36">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 px-2">
                        <div className="flex flex-col md:flex-row gap-5 md:gap-0 w-full">
                            <img className="w-[80px] mx-auto md:mx-0 h-[80px] sm:w-[100px] sm:h-[100px] object-cover object-top -mt-12 shadow rounded" src={data.clientPictureLink} alt="work alat" />

                            <div className="px-3 -mt-4 sm:flex-grow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h4 className="text-sm sm:text-lg font-semibold flex gap-2 items-center capitalize">{data?.clientFullName}
                                            <span className="text-sm font-thin lowercase flex gap-1 items-center">
                                                {
                                                    (data.isClientEmailVerify && data.isClientPhoneNoVerify)
                                                    ?
                                                    <HiMiniCheckBadge className="size-[15px] text-[#29B1FD]" />
                                                    :
                                                    ""
                                                }
                                                 {
                                                    (data.kycStatus === "appproved")
                                                    ?
                                                    <GiCheckedShield className="size-[12px] text-[#F76C10]" />
                                                    :
                                                    ""
                                                }
                                            </span>
                                        </h4>
                                        <div className="flex gap-2">
                                            <div className="flex gap-1 items-center"> 
                                               
                                                <Rating precision={0.1} value={(data.totalRatings / data.totalReviews )} readOnly />
                                                <p className="text-xs">{  data?.totalReviews>0 ? Number((data?.totalRatings / data?.totalReviews )).toFixed(1) : 0}</p>
                                            </div>
                                           
                                        </div>
                                        <div className="flex justify-start">
                                                <div className="flex gap-2 my-1">
                                                {
                                                fetchFlag(data?.clientCountry) !== null &&
                                                <>
                                                <img 
                                                src={flag}
                                                alt=""
                                                className="w-[15px] h-[15px] object-cover rounded-sm"
                                                /> 
                                                </>
                                                }
                                                <span className="text-sm font-medium capitalize">{data?.clientCountry}</span>
                                                </div>
                                        </div>
                                        <p className="text-xs capitalize ps-4">joined on {moment(data.accountCreationDate).format('MMMM D, YYYY')}</p>
                                    </div>

                                    {/* share button */}
                                    <div className="relative">
                                        <button onClick={toggleDropdown} className="flex items-center justify-center w-10 h-10">
                                            <IoMdShare className="text-2xl text-black" />
                                        </button>
                                        {isOpen && (
                                            <div className="absolute mt-2 w-[250px] bg-white shadow-lg rounded-lg py-2 z-10">
                                                <button
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                    onClick={handleCopyLink}
                                                >
                                                    <FaLink className="text-blue-500" />
                                                    Copy Link
                                                </button>
                                                <a
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaFacebookF className="text-blue-600" />
                                                    Share to Facebook
                                                </a>
                                                <a
                                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaTwitter className="text-blue-400" />
                                                    Share to Twitter
                                                </a>
                                                <a
                                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <FaWhatsapp className="text-green-500" />
                                                    Share to WhatsApp
                                                </a>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h4 className="font-semibold pb-3 pt-2">Verifications</h4>
                            <Box className="flex gap-4">
                                {data?.kycStatus && (
                                    <VerifiedCell
                                        isVerified={(data.kycStatus === "approved") ? true : false}
                                        Icon={
                                            <PersonOutlineOutlinedIcon className={(data.kycStatus === "approved") ?"text-[rgba(4,132,47,1)]" : "text-yellow-500"} />
                                        }
                                        name="identity"
                                    />
                                )}
                                {data?.isClientPhoneNoVerify && (
                                    <VerifiedCell
                                        isVerified={data.isClientPhoneNoVerify}
                                        Icon={
                                            <LocalPhoneOutlinedIcon className={(data.isClientPhoneNoVerify) ?"text-[rgba(4,132,47,1)]" : "text-yellow-500"}   />
                                        }
                                        name="phone"
                                    />
                                )}
                                {data?.isClientEmailVerify && (
                                    <VerifiedCell
                                        isVerified={data?.isClientEmailVerify}
                                        Icon={<EmailOutlinedIcon className={(data.isClientEmailVerify) ?"text-[rgba(4,132,47,1)]" : "text-yellow-500"} />}
                                        name="email"
                                    />
                                )}
                                {/* {true && (
                                    <VerifiedCell
                                        isVerified={data?.isPaymentVerify}
                                        Icon={
                                            <CreditCardOutlinedIcon className={(data.isPaymentVerify) ?"text-[rgba(4,132,47,1)]" : "text-yellow-500"}/>
                                        }
                                        name="payment"
                                    />
                                )} */}
                            </Box>

                            {/* <div className="py-2">
                                {
                                    userData?.desc?.map((para, i) => (
                                        <p className="py-2 text-md text-justify" key={i}>{para}</p>
                                    ))
                                }
                            </div> */}
                            <Typography className='py-2 text-md capitalize' variant="body1"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.clientBio) }} />

                            {/* <div className="py-2">
                                <h2 className="text-lg font-semibold pb-3">Expertise</h2>

                                <ul className="list-disc ps-5">
                                    {
                                        userData?.expertise?.map((list, i) => (
                                            <li className="py-1" key={i}>{list}</li>
                                        ))
                                    }
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-2">
                        <h5 className="text-end font-semibold pb-2 -mt-4">Reviews {data?.reviews?.length}</h5>
                        <div className="w-full overflow-y-scroll hiddenScroll h-[800px]">
                           
                        {
                                data?.reviews?.map((review, i) => {
                                    return(
                                        <div key={i} className="w-full py-2 px-4">
                                        <div className="flex justify-between items-center flex-col gap-2 md:flex-row md:gap-0">
                                            <div className="flex">
                                            <img src={review?.giverPictureLink} className="w-16 h-12 flex items-center justify-center bg-secondary" />
                                                <div className="px-3">
                                                    <div className="flex gap-2 items-center">
                                                        <Rating precision={0.1} value={review.giverRating} readOnly />
                                                            <Typography  className='text-sm' color="text.secondary" ml={1}>
                                                            {review.giverRating}
                                                        </Typography>
                                                    </div>
                                                    <div className="flex gap-2 my-1">
                                                    {
                                                    fetchFlag(review?.giverCountry) !== null &&
                                                    <>
                                                    <img 
                                                    src={flag}
                                                    alt=""
                                                    className="w-[15px] h-[15px] object-cover rounded-sm"
                                                    /> 
                                                    </>
                                                    }
                                                    <span className="text-sm font-medium capitalize">{review?.giverCountry}</span>
                                                    </div>
                                                    <p className="font-bold caption-top capitalize">{review?.projectName.slice(0,45)}...</p>
                                                   
                                                    {/* <p className="capitalize">{review?.location}</p> */}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pb-2">
                                                <p className="font-bold text-sm capitalize">{review?.giverName}</p> 
                                                <p className="text-sm">{moment(review?.revieTimeStamp).fromNow()}</p>
                                            </div>
                                        </div>

                                        <p className="capitalize py-[8px]">{review?.giverReview}</p>
                                    </div>
                                    )
                                    
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    </>
                    :
                    "No Data Found"
                }
                </>
            )
        }
        </>
    )
}
