
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
    },
    sellerSignup:{
        url:`${backendDomain}/api/admin-signup`,
        method:"post"
    },
    sellerLogin:{
        url:`${backendDomain}/api/admin-login`,
        method:"post"
    },
    // ---------------- ADMIN APIS ----------------
  adminSignupRequestOtp: {
    url: `${backendDomain}/api/admin/signup/request-otp`,
    method: "post",
  },
  adminSignupVerifyOtp: {
    url: `${backendDomain}/api/admin/signup/verify-otp`,
    method: "post",
  },
  adminLoginPassword: {
    url: `${backendDomain}/api/admin/login/password`,
    method: "post",
  },
  adminLoginRequestOtp: {
    url: `${backendDomain}/api/admin/login/request-otp`,
    method: "post",
  },
  adminLoginVerifyOtp: {
    url: `${backendDomain}/api/admin/login/verify-otp`,
    method: "post",
  },
     
}

export default SummaryApi