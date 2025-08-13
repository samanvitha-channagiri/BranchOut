import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { getLinks } from "../../../backend/src/controllers/users.controller";
// TODO:
/*
1. UPDATE FUNCTION
2. WHENEVER i add invalid url to the db (like without http in front), I'm getting internal server error fix that
3. get profile info and display
*/
export const useLinkStore = create((set, get) => ({
  urls: [],
  isLinksLoading: false,
  isAddingNewUrl: false,
  isUpdatingUrl:false,

  getLinks: async () => {
    set({ isLinksLoading: true });

    try {
      const res = await axiosInstance.get("/users/getLinks");
      set({ urls: res.data.urls });
      console.log(get().urls);
    } catch (error) {
      console.log("Error while fetching links :", error.message);
    } finally {
      set({ isLinksLoading: false });
    }
  },
  addNewUrl: async (data) => {
    set({ isAddingNewUrl: true });
    try {
       const res=await axiosInstance.post("/users/addLink",data)
        console.log(res)
        toast.success("New url added successfully")
        const currentUrls=get().urls
         set({urls:[...currentUrls,res.data.data]})
       
       

    } catch (error) {
        toast.error("Adding new url failed")
        console.log("error while adding a new url to the db",error.message)

    }finally{
        set({isAddingNewUrl:false})
    }
  },
  updateLink:async(data)=>{
    try{
      set({isUpdatingUrl:true})
      const res=await axiosInstance.post(`/users/updateLink/${data._id}`,data)
      
     //so here somehow, I should find the updated url, and then update right? I don't need to wait for the result, I'll just parse throught the ids and update it here on frontend with present data I've
 const currentUrls = get().urls;
     const updatedUrls = currentUrls.map((link) =>
        link._id === data._id
          ? { ...link, url: data.url, title: data.title }
          : link
      );
         set({urls:updatedUrls})
   toast.success("New url added successfully")


    }catch(error){
      toast.error("Error while updating the url")

    }finally{
      set({isUpdatingUrl:false})
    }

  },
  deleteLink:async(data)=>{

    // router.delete('/deleteLink/:id',deleteLink)
    try{
        const res=await axiosInstance.delete(`/users/deleteLink/${data._id}`)
        const currentUrls=get().urls
        console.log(res)
        const updatedUrls=currentUrls.filter(link=>link._id!==data._id)
        set({urls:updatedUrls})

    
    if(res.data.success===true){
         toast.success("url deleted successfully")  
    }else{
        toast.error("Could not delete the url")
    }
   
    }catch(error){
        toast.error("error while deleteing the link")
    }
  

  }
}));
