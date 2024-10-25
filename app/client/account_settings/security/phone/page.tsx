"use client";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "react-phone-number-input/style.css";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";

import OTPModal from "./otp_modal";

import arrowRight from "@/public/icons/arrow_right.svg";



import { useUserContext } from '@/context/user_context';
import VerifyUser from '@/app/middleware/VerifyUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSnackbar } from "@/context/snackbar_context";


const PhonePage = () => {
  const [otpModal, setOtpModal] = useState(false);
  const [value, setValue] = useState<string | undefined>();

  let [userData, setUserData] = useState({});
  let { getPhoneNo,phoneVerifyPage } = useUserContext();
  

  // loading
  const [loading2, setLoading2] = useState(true);
  let [phoneNo, setPhoneNo] = useState("");
  let [phoneCountry, setPhoneCountry] = useState("");

  // router
  const router = useRouter();
  
  // Alert
  const { generateSnackbar } = useSnackbar();


  const handlePhoneNumberChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setPhoneNo(newValue);
    }
  };


  useEffect(() => {
    async function verify(){
      try{
        setLoading2(true);
        let token = Cookies.get("token");
        let ver = await VerifyUser(token, "client");
        if(ver.status === "success"){
          if(ver.registerAs === "professional"){
            router.push("/professional/dashboard")
          }
          else{
            setUserData(ver);
            let phoneDet = await getPhoneNo({userId : ver.userId, userType : "client"});
            setPhoneNo(phoneDet.data.phoneNo)
            setPhoneCountry(phoneDet?.data?.countryCode)
            setLoading2(false);
          }
        }
        else{
          router.push("/"); 
        }
      }
      catch(e){
        generateSnackbar("Some error occur, please Try Again.", "error");
      }
    };
    verify();
  }, []); 


  async function handleSendOtp(){
    try{
      if(!phoneNo){
        return generateSnackbar("Please Enter Phone Number.", "error");
      }
     let res = await phoneVerifyPage({
        userId : userData?.userId,
        userType : userData?.userType,
        phoneNo : phoneNo
     });
      if(res?.status !== 400  || res?.data?.status === "success"){
        generateSnackbar("OTP sent successfully", "success");
        setOtpModal(true)
      }
      else{
        generateSnackbar(res?.response?.data?.message || "Please Try Again.", "error");
      }
    }
    catch(e){
        generateSnackbar("Some Error Occur, Please Try Again.", "error");
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
              <OTPModal open={otpModal} onClose={() => setOtpModal(false)} userId={userData?.userId} userType={userData?.userType} phoneNo={phoneNo} />
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={7}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Box className="flex flex-col gap-1">
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="GB"
                className="[&_.PhoneInputCountry]:!p-3 [&_.PhoneInputCountry]:bg-gray-200 [&_.PhoneInputCountry]:rounded-md [&_input]:bg-transparent [&_input]:border-b [&_input:hover]:border-dark [&_input]:p-2  [&_input:focus]:outline-secondary"
                value={phoneNo}
                onChange={handlePhoneNumberChange}
              />
              <Box className="flex justify-between items-center">
                <Typography className="text-gray-400 text-xs">
                  We will automatically send OTP. Please confirm your phone
                  number is correct.
                </Typography>
                {/* <Button
                  variant="text"
                  color="primary"
                  className="hover:text-main"
                >
                  Change
                </Button> */}
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={handleSendOtp}
            >
              Send OTP
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
      </Grid>
              </>
            )
      }
      
    </>
  );
};

export default PhonePage;
