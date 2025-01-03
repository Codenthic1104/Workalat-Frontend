"use client"
import axios from "axios";

async function VerifyUser (token: any , userType : string){
    // console.log(token);
    try{
        if(token?.length>0 || !token ){
            const verifyToken : any = await axios.post('/verify', {
              type : userType,
              token : token 
            });
            console.log(verifyToken);
            if(verifyToken?.status !== 400 || verifyToken?.data?.status === "success"){
                let data = {
                    status : verifyToken?.data.status,
                    message : verifyToken?.data?.msg || "User verified successfully",
                    userId : verifyToken?.data?.userId,
                    userPoints : verifyToken?.data?.userPoints || null,
                    userType : verifyToken?.data?.userType,
                    userEmail : verifyToken?.data?.data[0]?.email,
                    userName : verifyToken?.data?.data[0]?.fullName,
                    userPicture : verifyToken?.data?.data[0]?.pictureLink,
                    registerAs : verifyToken?.data?.data[0]?.registerAs,
                    isEmailVerify : verifyToken?.data?.data[0].isEmailVerify,
                    isPhoneVerify : verifyToken?.data?.data[0].isPhoneVerify,
                    isTwoFactAuth : verifyToken?.data?.data[0].isTwoFactAuth,
                    isRegistrationComplete : verifyToken?.data?.data[0].isRegsitrationComplete,
                    statusCode : verifyToken?.status,
                    country : verifyToken?.data?.data[0].country
                }
                return(data);
            }
            else{
                let data = {
                    status : "fail",
                    message : "Some error occur, please login again",
                    userId : null,
                    userType : null,
                    userEmail : null,
                    userName : null,
                    userPicture : null,
                    registerAs : null,
                    isEmailVerify : null,
                    isPhoneVerify : null,
                    isTwoFactAuth : null,
                    isRegistrationComplete : null,
                    statusCode : verifyToken?.status,
                    country : null,
                }
                return(data);
            }

        }
        else{
            let data = {
                status : "fail",
                message : "Some Error Occur, please login again",
                userId : null,
                userType : null,
                userEmail : null,
                userName : null,
                userPicture : null,
                registerAs : null,
                isEmailVerify : null,
                isPhoneVerify : null,
                isTwoFactAuth : null,
                isRegistrationComplete : null,
                statusCode : 400
            }
            return(data);

        }
    }
    catch(e : any){
        // console.log( "Error ", e);
        let data = {
            status : "fail",
            message :  "Some Error Occur, please login again",
            userId : null,
            userType : null,
            userEmail : null,
            userName : null,
            userPicture : null,
            registerAs : null,
            isEmailVerify : null,
            isPhoneVerify : null,
            isTwoFactAuth : null,
            isRegistrationComplete : null,
        }
        return(data);
    }
}

export default VerifyUser;