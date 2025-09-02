import { createContext,useState,useContext } from "react";
import MySnackBar from "../components/MySnackBar";

const ToastContext=createContext({});

export const ToastProvider=({children})=>{    
  const [open, setOpen] = useState(false);
  const [messageType, setMessageType] = useState();

  function showHideToast(messageType){
      console.log(messageType)
      setMessageType(messageType)
      setOpen(true);
      setTimeout(()=>{
        setOpen(false);
      },1000)
  }

  return (
      <ToastContext.Provider value={{ showHideToast }}>
          <MySnackBar open={open} textType={messageType}/>
          {children}
      </ToastContext.Provider>
  )
}
export const useToast=()=>{
  return useContext(ToastContext)
}