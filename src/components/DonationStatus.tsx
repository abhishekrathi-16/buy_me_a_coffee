"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DonationStatus(){
    const [shown, setShown] = useState(false);
    const [ showed, setShowed ] = useState(false);
    useEffect(()=>{
        if(location.href.includes('?success=1') && !shown){
            setShown(true)
        }
        if(shown && !showed){
            toast.success('Thanks for your donation!');
            setShowed(true);
        }
    },[shown])
    return(
        <></>
    )
}