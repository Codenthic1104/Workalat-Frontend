"use client"
import Membership from "@/components/Membership/Membership";
import AuthNavbar from "@/components/navbar/auth_navbar";


import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import VerifyUser from "../middleware/VerifyUser";
import Cookies from 'js-cookie';
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";


export default function MemberShipPage() {
    let [loading, setLoading] : any = useState(true);
    let [loading2, setLoading2]  : any = useState(false);
    let {purchaseMembership }  : any = useUserContext();

    let params  : any = useParams();
    let router  : any = useRouter();
    // Alert
    const { generateSnackbar }  : any = useSnackbar();

    const membershipPlan = [
        {
          id: 1,
          title: "5 FREE leads per month",
          desc: "As an Alat Pro member, you will be able to bid for 5 free projects each month.",
        },
        {
          id: 2,
          title: "Get your profile to stand out",
          desc: "Alat Pro benefits from optimisation by our team, ensuring your profile stands out and ranks higher in SEO search results.",
        },
        {
          id: 3,
          title: "Get seen by more customers",
          desc: "Alat Pros are boosted in our seller directory (when applicable).",
        },
        {
          id: 4,
          title: "Get priority Customer Support",
          desc: "Skip the email queue and get your queries handled fast.",
        },
        {
          id: 5,
          title: "Get Easy Buyer Connections",
          desc: "Your contact details will be prominently displayed on your public profile, making it effortless for potential customers to reach out directly.",
        },
        {
          id: 6,
          title: "Get Exclusive Alat Pro discounts",
          desc: "Regularly enjoy exclusive discounts on your credit packs.",
        },
      ];

      async function handlePurchaseMembership(){
        try{
            let token  : any = Cookies.get("token");
            let ver  : any = await VerifyUser(token, "professional");
            if(ver?.status === "success" || ver?.userType === "professional"){
                let res  : any = await purchaseMembership({professionalId : ver.userId});
                if(res?.status !== 400 || res?.data?.status === "success"){
                    window.open(res?.data?.session?.url, "_blank");
                }
                else{
                    generateSnackbar(res.response?.data?.message || "Some error occurr, Please try again", "error");
                }
            }
            else{
                router.push("/professional/login")
            }
        }
        catch(e){
            generateSnackbar("Some error occurr, Please try again", "error");
        }
      }
    return (
        <>
          {
            loading2 ? (
                <div className="w-[100%] h-screen flex justify-center items-center">
                <div className="loader m-auto" />
                </div>
            )
            :( 
                <>
                
                    <div>
                        <AuthNavbar />
                        <div className="bg-white relative pb-12">
                {/* Left Image */}
                <img
                    className="absolute z-0 left-0 top-[40px] w-[600px]"
                    src="/CIRCLES.png"
                    alt="workalat"
                />
                {/* Right Image */}
                <img
                    className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]"
                    src="/CIRCLES.png"
                    alt="workalat"
                />

                {/* Content */}
                <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                    <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-end sm:justify-center items-center w-full border-b border-dark border-opacity-30">
                    <Link
                        href="/client/dashboard"
                        className="flex gap-2 absolute left-0 font-bold"
                    >
                        <Image
                        src={arrowRightSm}
                        alt="Back to dashboard"
                        className="rotate-180"
                        />
                        <span>
                        Back <span className="hidden md:inline-flex">to dashboard</span>
                        </span>
                    </Link>
                    <Typography gutterBottom className="md:text-3xl font-bold text-center">
                        Upgrade to Alat Pro
                    </Typography>
                    </Box>

                    <h3 className="text-center font-semibold text-lg py-5">
                    Jumpstart your business growth with these exclusive tools and
                    benefits.
                    </h3>

                    <div className="w-full border border-black/30 rounded-md p-4">
                    <div className="py-2 border-b border-black/30">
                        <h1 className="text-2xl font-bold">Alat Pro</h1>
                        <p className="text-md">
                        <strong className="text-xl">Just £24.99</strong>/month (ex VAT) -
                        cancel anytime
                        </p>
                    </div>

                    <ul className="md:columns-2 columns-1">
                        {membershipPlan?.map((data: any, i: number) => (
                        <li className="flex items-start py-2" key={i}>
                            <div className="w-4 mt-1">
                            <GoDotFill className="size-4 text-secondary" />
                            </div>
                            <div className="px-1 w-auto">
                            <h4 className="text-lg font-semibold">{data?.title}</h4>
                            <p className="text-md text-[#909090]">{data?.desc}</p>
                            </div>
                        </li>
                        ))}
                    </ul>

                    <div className="pb-3 pt-5 flex justify-center">
                        <button
                        onClick={handlePurchaseMembership}
                        className="flex items-center justify-normal px-6 py-2 text-black bg-secondary border-2 border-secondary rounded-md gap-2 uppercase font-semibold"
                        >
                        Join now <FaArrowRight className="size-4" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                    </div>
                </>
            )
        }
        
    </>
    )
}
 