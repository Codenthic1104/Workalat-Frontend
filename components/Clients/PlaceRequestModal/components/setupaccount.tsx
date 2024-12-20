"use client";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
import Cookies from 'js-cookie';

interface SetupAccountProps {
  handleNext: () => void;
  handlePrev: () => void;
}


export default function SetupAccount({
  handleNext,
  handlePrev,
}:

SetupAccountProps) {

  let [userDetails, setUserDetails] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
  });
  const {userData,clientDetailsAdd, sendEmailOtpClient ,tempUserData, setTempUserData}  : any = useUserContext();
  const { generateSnackbar }  : any = useSnackbar();
  let [loading, setLoading] = useState(false);

  function handleInput(e){
    let name= e.target.name;
    let value = e.target.value;

    setUserDetails({
     ...userDetails,
      [name]: value
    });

  }

        
  const { projectData, setProjectData } : any  = useUserContext();




  const handleSubmit = async (e: any ) => {
    try{
      e.preventDefault();

      if(userDetails.password !== userDetails.confirmPassword){
        return ("Password do not match.")
      }
      setLoading(true);
      let res : any  = await sendEmailOtpClient({
        email : userDetails.email,
      })

     

    //   let clientId : any  = userData.clientId || Cookies.get("userId") ;
    // let res : any  = await clientDetailsAdd({
    //   clientId : clientId,
    //   email : userDetails.email,
    //   name : userDetails.name,
    //   pass : userDetails.password,
    //   confirmPass : userDetails.confirmPassword,
    //   userType : "client",
    // });

    if(res?.status !== 400 || res?.status === "success"){
      setTempUserData({
        ...tempUserData,
        emailVerificationId : res?.data?.data[0]?.verificationId,
        userEmail : res?.data?.data[0]?.email,
        userName : userDetails.name,
        userPassword : userDetails.password,
        userConfirmPassword : userDetails.confirmPassword,
        userType : "client",
      });
        // Cookies.set("userId", res.data?.data[0]?.userId ,{ secure: true, sameSite: 'None', expires: 10 });
        // Cookies.set("userEmail", res.data?.data[0]?.email ,{ secure: true, sameSite: 'None', expires: 10 });
        // Cookies.set("userType", "client",{ secure: true, sameSite: 'None', expires: 10 });
        
      generateSnackbar( "OTP Sent, Please verify your Email.", "success");
      setLoading(false);
      handleNext();
    }
    else{ 
      setLoading(false);
      if(res?.response?.data?.message?.includes("connect ETIMEDOUT 74.125.206.109:587")){
       return generateSnackbar("Please Try Again.", "error");
      }
      generateSnackbar( res?.response?.data?.message || "Some error Occur, please Try Again.", "error");
    }
    }
    catch(e){
      generateSnackbar("Some error Occur, please Try Again.", "error");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const handleConfirmShowPasswordToggle = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center max-w-[450px] -mt-8">
        Let&apos;s setup your account
      </h1>
      <form
        className="flex flex-col gap-4 px-4 md:px-8 w-full [&_label]:font-semibold"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <label>Your name</label>
          <OutlinedInput
            fullWidth
            required
            id="outlined-adornment-amount"
            placeholder="Please enter your name"
            className="border-b-4 border-b-secondary"
            name="name"
            value={userDetails.name}
            onChange={handleInput}
          />
        </FormControl>
        <FormControl>
          <label>Enter your email</label>
          <OutlinedInput
            fullWidth
            required
            type="email"
            id="outlined-adornment-amount"
            placeholder="Enter your email"
            className="border-b-4 border-b-secondary"
            name="email"
            value={userDetails.email}
            onChange={handleInput}
          />
        </FormControl>
        <FormControl>
          <label>Choose your password</label>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            margin="normal"
            name="password"
            value={userDetails.password}
            onChange={handleInput}
            className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-3"
            InputProps={{
              placeholder: "•••••••••••",
              className: "border-b-4 border-b-secondary",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordToggle}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <label>Re-enter password</label>
          <TextField
            fullWidth
            type={confirmShowPassword ? "text" : "password"}
            margin="normal"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleInput}
            className="border-main border-opacity-15 shadow-lg [&:has(Mui-focused)]:!border-secondary [&_*]:p-0 [&>*]:!p-3 [&>*]:!py-3 border-b-4 border-b-secondary"
            InputProps={{
              placeholder: "•••••••••••",
              className: "border-b-4 border-b-secondary",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleConfirmShowPasswordToggle}>
                    {confirmShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Box className="flex justify-between items-center flex-wrap gap-y-2">
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            className="flex gap-2"
            onClick={handlePrev}
          >
            <FaArrowLeft />
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            type="submit"
            className="flex gap-2 "
          >
            Confirm
            <FaArrowRight />
          </Button>
        </Box>
      </form>
      <Modal open={loading}>
        <Box className="flex justify-center items-center w-full h-full">
          <Box className="bg-white p-6 rounded-md shadow-md text-center">
            <img src="/images/loader.gif" alt="Loading..." className="w-40 mx-auto" />
            <h1 className="font-bold text-xl mt-4">Sending OTP...</h1>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
