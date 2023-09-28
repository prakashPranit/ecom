"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BillboardCoulmn } from './columns'
import { Button } from '@/components/ui/button'

interface CellActionProps{
    data:BillboardCoulmn
}
import React, { useState } from 'react'
import { Copy, Delete, Edit, MoreHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/alert-modal'


const CellAction:React.FC<CellActionProps> = ({data}) => {
    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("Billboard id copied")
       }

       const router = useRouter()
       const params= useParams()
       
       const[open,setOpen] = useState(false)
       const [loading,setLoading] = useState(false)

       const onDelete = async () => {
 
        try{
            setLoading(true)
            const response = await axios.delete(`/api/stores/${params.storeId}/billboards/${data.id}`)
            router.refresh()
            toast.success("Billboard deleted successfully")
            
            console.log("response",response)
 
        }catch(err){
            toast.error("oops error: ,Make sure to delete  categories using this billboard" + err)
         console.log("huhs",err)
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

  return (
    <><AlertModal isOpen={open} onClose={()=> setOpen(false) } onConfirm={onDelete} loading={loading} />
    {/* To prevent infinte renederings */}
    {!open&&(<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className='h-8 w-8 p-0'>
                <span className='sr-only'> Open Menu</span>
                <MoreHorizontal className='h-4 w-4'></MoreHorizontal>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}  >
                <Edit className='mr-2 h-4 w-4'/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={()=>onCopy(data.id)}>
                <Copy className='mr-2 h-4 w-4'/>
               Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem  onClick={()=>{setOpen(true)}}>
                <Delete className='mr-2 h-4 w-4'/>
               Delete
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>)}
     
    </>
   
  )
}

export default CellAction