'use client'
import AuthNavbar from "@/components/navbar/auth_navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import VerificationCode from "./VerificationCode";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user_context";
import Cookies from 'js-cookie';
import { useSnackbar } from "@/context/snackbar_context";
import VerifyUser from "@/app/middleware/VerifyUser";
import { Box, Modal } from "@mui/material";


export default function ForgetPassword() {
    const [isVerification, setIsVerification]  : any  = useState(false);
    const { generateSnackbar }  : any  = useSnackbar();
    const [verified, setVerified]  : any  = useState("");
    const [newPass, setPass]  : any  = useState(false);
    const [password, setPassword]  : any  = useState("");
    const [confirmPassword, setConfirmPassword]  : any  = useState("");
    let [email, setEmail]  : any  = useState("");
    let [userType, setUserType]  : any  = useState("");
    let [userId, setUserId]  : any  = useState("");
    let router  : any  = useRouter();
    let [loading2, setLoading2] : any  =  useState(true);
    let [loading, setLoading] : any  =  useState(false);
    let [message, setMessage] : any = useState("");
    
  const {setTempUserData,  tempUserData , forgotPassword,sendEmailOtp ,verifyOtp,changeForgotPassword} : any  = useUserContext();


    useEffect(() => {
        async function verify(){
          try{
            setLoading2(true);
                let token : any  = Cookies.get("token");
                if(token || token !== undefined){
                    router.push("/")
                }
                else{
                    setLoading2(false);
                }
                // let ver : any  = await VerifyUser(token,"professional");
                // if(ver?.status === "fail"){
                //   setLoading2(false);
                // }
                // else{
                //   if(ver?.registerAs === "professional"){
                //     router.push("/professional/dashboard")
                //   }
                //   else{
                //     router.push("/client/dashboard")
                //   }
                // }
            
          }
          catch(e){
            console.log(e);
          }
        };
        verify();
      }, []);

    const handleSendCode =async  (e: any) => {
       try {
        e.preventDefault();
        // console.log(email);
        setMessage("Sending OTP on your Email...")
        setLoading(true);
        let res : any  = await forgotPassword({email});
        console.log(res);
        if(res?.status !== 400 || res?.data?.status === "success") {
            setUserId(res?.data?.data[0]?.userId);
            setEmail(res?.data?.data[0]?.email)
            setUserType(res?.data?.data[0]?.userType)
            setIsVerification(true);
            setLoading(false);
            generateSnackbar("Please verify your Email.", "success");
        }
        else{
            setLoading(false);
            generateSnackbar(res?.response?.data?.message || "Some Error  Occure, please Try Again.", "error");

        }
       }
       catch (error) {
        generateSnackbar("Some error Occur, please try again", "error");
       }
    }

    const handleVerify = async (e: any) => {
       try{
        setMessage("Verifying OTP...");
        setLoading(true);
        e.preventDefault();
        let otp = verified.join("");
        let res : any  = await verifyOtp({otp, userId,userType : userType, type : "forgot"});

        if(res?.status !== 400 || res?.data?.status === "success"){
            setPass(true);
            setLoading(false);
            generateSnackbar("Please Set New Password.", "success");
        }
        else{
            setLoading(false);
            generateSnackbar(res?.response?.data?.message || "Some Error  Occure, please Try Again.", "error");
        }
       }
       catch(e){
        console.log(e);
       }
    }

    const handleChangePassword = async (e: any) => {
        try{
            e.preventDefault();

            if(password !== confirmPassword){
               return generateSnackbar("Passwords don't match.", "error");
            }
            else{
            setMessage("Changing Password...");
            setLoading(true);
            let res : any  = await changeForgotPassword({userId : userId, password : password});
            if(res?.status !== 400 || res?.data?.status === "success"){
                generateSnackbar("Password Changed Successfully", "success");
                setLoading(false);
                router.push("/login")
            }
            else{
                setLoading(false);
                generateSnackbar(res?.response?.data?.message || "Some Error  Occure, please Try Again.", "error");
            }
            }

        }
        catch(e){
         console.log(e);
        }
     }

     const handleResend = async (e) => {
        try { 
            e.preventDefault();
            console.log(userId)
            if(userId.length > 0) {

                setMessage("Resending OTP...");
                setLoading(true);
                let res : any  = await sendEmailOtp({
                userId: userId,
                userType: userType,
                email: email,
              });
        
              if (res?.status !== 400 || res?.data?.status === "success") {
                setLoading(false);
                return generateSnackbar("OTP resend successfully", "success");
              } else {
                setLoading(false);
                generateSnackbar("Please login again.", "error");
              }
            } 
            else {
                setLoading(false);
              generateSnackbar("No user Data Found, please login again.", "error");
              router.push("/login");
            }
            
        } catch (error) {
            console.log(error);
          generateSnackbar("An error occurred, please try again later.", "error");
        }
      };

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
                    <AuthNavbar />
            <div className="w-full h-[80vh] flex items-center justify-center">
                {
                    !isVerification ?
                        <div className="w-full md:w-[500px] p-4 border rounded-lg shadow-lg">
                            <h1 className="text-center text-3xl font-semibold">Forgot Password</h1>
                            <form onSubmit={handleSendCode} className="w-full pt-5">
                                <div className="py-2">
                                    <label htmlFor="email" className="block text-xl font-semibold">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" placeholder="Email" />
                                </div>
                                <div className="py-2">
                                    <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]">Send reset password instructions</button>
                                </div>
                                <div className="py-2">
                                    <div className="flex justify-center gap-2 pt-5">
                                        <p className="text-[15px] font-semibold">Already Have Account ?</p>
                                        <Link className="text-[15px] font-semibold underline underline-offset-4" href="/login">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        : newPass ?
                            <div className="w-full md:w-[500px] p-4 border rounded-lg shadow-lg">
                                <h1 className="text-center text-3xl font-semibold">Enter New Password</h1>
                                <form className="w-full pt-5">
                                    <div className="py-2">
                                        <label htmlFor="newPass" className="block text-xl font-semibold">Choose a password</label>
                                        <input type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" />
                                    </div>
                                    <div className="py-2">
                                        <label htmlFor="confirm" className="block text-xl font-semibold">Re-enter password</label>
                                        <input type="password" required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} className="w-full outline-none border-none ring-[1px] ring-black/40 shadow-md rounded-md px-3 py-2 bg-white text-black mt-2" />
                                    </div>
                                    <div className="py-2">
                                        <button type="submit" className="w-full py-2 px-3 text-black font-semibold bg-[#FFBE00]" onClick={handleChangePassword}>Confirm</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className="w-full md:w-[550px] p-4 border rounded-lg shadow-lg">
                                <h1 className="text-center text-2xl font-semibold">Enter Security code to reset password</h1>
                                <p className="text-center text-lg pt-2">Insert the security code sent to your email in order to proceed with the password reset.</p>
                                <form onSubmit={handleVerify} className="w-full pt-5">
                                    <div className="py-2 overflow-hidden">
                                        <VerificationCode setVerified={setVerified} />
                                        <div className="flex mx-auto justify-between w-full md:w-9/12 px-6 pt-2">
                                            <p className="text-xs">Didn't receive a code?</p>
                                            <button className="text-xs text-secondary font-semibold items-center" onClick={handleResend}>Request a new code</button>
                                        </div>
                                    </div>
                                    <div className="pb-2 pt-5">
                                        <button type="submit" className="w-full py-2 rounded-md px-3 text-black font-semibold bg-[#FFBE00]">Submit</button>
                                    </div>
                                </form>
                            </div>

                }
                 <Modal open={loading}>
                    <Box className="w-full h-full flex justify-center items-center">
                    <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                        <img src="/images/loader.gif" alt="Loading..." className="w-60" />
                        <h1 className="text-center font-bold text-xl ml-2 capitalize">{message}</h1>
                    </Box>
                    </Box>
                </Modal>

            </div>
                </>
            )
        }
            
           
        </>
    )
}
