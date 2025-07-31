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
        }finally{
                  set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        console.log("i've entered login function")
         set({isLoggingIn:true})
        try{
            const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("User logged in successfully")
            console.log(res)
        }catch(error){
           
            toast.error(error.response.data.message)
            console.log("Error while logging in :",error.message)

        }finally{
             set({isLoggingIn:false})
        }

    },
    isAuthenticated:async ()=>{
        try{
            console.log(" I am being run")
            const res=await axiosInstance('/auth/check');
            console.log(res)
            set({authUser:res.data});

        }catch(error){
            set({authUser:null})
            
        }finally{
            set({isCheckingAuth:false})

        }
    }

}))