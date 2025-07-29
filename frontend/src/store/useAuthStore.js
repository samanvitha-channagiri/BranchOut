import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
export const useAuthStore=create((set,get)=>({

    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    
    signup:async(data)=>{
        set({isSigningUp:true})
        try{
            const res=await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Account created successfully")
            console.log(res)
            


        }catch(error){
            toast.error(error.response.data.message)
            console.log("Error from signup",error);
           

        }
    }

}))