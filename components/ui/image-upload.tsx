"use client"

import { CldUploadWidget } from 'next-cloudinary';
interface ImageUploadProps {
    disabled:boolean;
    onChange:Function;
    onRemove:Function;
    value:string[];
}
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

const ImageUpload:React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted,setIsMounted]= useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    const onUpload = (result:any) => {
        onChange(result.info.secure_url)
    }

  return (
    <div>
        <div className='mb-4 flex items-center gap-4'>
         {value.map((url)=>(
            <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
               <div className='z-10 absolute top-2 right-2'> 
               <Button type='button' onClick={(url)=>onRemove(url)}>
                <Trash className='h-4 w-4'></Trash>
                </Button> 
                 </div>
                 <Image fill className='object-cover' alt='image' src={url}>
             
                 </Image>
            </div>
         ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="awikkmqb">
            {
              ({open})=>{
                const onClick = ()=>{
                    open()
                }
                return (
                    <Button type='button' onClick={onClick} disabled={disabled}> <ImagePlus className='h-4 w-4 mr-2'></ImagePlus>Upload</Button>)
              }  
            }
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload