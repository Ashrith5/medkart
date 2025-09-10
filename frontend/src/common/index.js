

const backendDomain=process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"

const SummaryApi = {
    signup:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    sendOtp:{
        url:`${backendDomain}/api/send-otp`,
        method:"post"

    },
    signin:{
        url:`${backendDomain}/api/signin`,
        method:"post"
    },
    verifyotp:{
        url:`${backendDomain}/api/verify-otp`,
        method:"post"
    },
    loginSendOtp:{
        url:`${backendDomain}/api/login-otp`,
        method:"post"
    }
}

export default SummaryApi