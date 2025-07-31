import { create } from "zustand";
import {toast} from 'react-hot-toast'
import { axiosInstance } from "../lib/axios";

export const useLinkStore=create((set,get)=>{

    links:[]
    isLinksLoading:false

    getLinks:async()=>{
        set({isLinksLoading:true})

        try{
            const res=await axiosInstance.get('/users/getLinks')

        }catch(error){


        }finally{
            set({isLinksLoading:false})
        }
    }

})