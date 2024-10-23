import toast from "react-hot-toast"

const toastMessage =(message,success)=>{
    if(success === true){
        return toast.success(message,{
            position:"top-center",
            duration:1000
        })
    }else{
        return toast.error(message,{
            position:"top-center",
            duration:1000
        })
    }
}

export default toastMessage