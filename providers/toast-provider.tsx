"use client"
import {Toaster} from "react-hot-toast"
import { useState,useEffect } from "react";

export const ToasterProvier = ()=>{
    const [isMounted,setIsMounted]= useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    return(
        <>
        <Toaster/>
        </>)
   
}