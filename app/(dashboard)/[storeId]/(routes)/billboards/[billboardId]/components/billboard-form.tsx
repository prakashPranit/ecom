"use client"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Billboard, Store } from '@prisma/client'
import { Plus, Trash } from 'lucide-react'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams,useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/modals/alert-modal'

import useOrigin from '@/hooks/use-origin'
import ImageUpload from '@/components/ui/image-upload'


interface BillboardFromProps{
    initialData: Billboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})


 const BillboardForm: React.FC<BillboardFromProps> = ({initialData}) => {
const[open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  const params = useParams()
  const origin = useOrigin()
  const router = useRouter()

  const title = initialData?"Edit billboard":"Create billboard"
  const description = initialData?"Edit billboard":"Create billboard"
  const toastMessage = initialData?"Billboard Updated":"Billboard Created"
  const action = initialData?"Save Changes":"Create"
  
      const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: initialData ||{
            label:'',
            imageUrl: '',
          }
      })
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
          console.log(values)
          let response
          try{
              setLoading(true)
              if(initialData) {
                response = await axios.patch(`/api/stores/${params.storeId}/billboards/${params.billboardId}`,{...values})

              }else{
                 response = await axios.post(`/api/stores/${params.storeId}/billboards/`,{...values})
              }
              
              router.refresh()
              router.push(`/${params.storeId}/billboards`)
              toast.success(toastMessage)
             
          }catch(err){
              toast.error("oops error: " + err)
           console.log(err)
          }finally{
              setLoading(false)
          }
      }

      const onDelete = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try{
            setLoading(true)
            const response = await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            toast.success("Billboard deleted successfully")
            
            console.log("response",response)
            router.push("/")
        }catch(err){
            toast.error("oops error: ,Make sure to delete  categories using this billboard" + err)
         console.log(err)
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }
  
  return (
    <>
    <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading} />
     <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (<Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}}  > <Trash className='h-4 w-4'/></Button>)}
        
       
    </div>
    <Separator/>
    <div className="space-y-4 py-2 pb-4 w-[400px]">
    <Form  {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="imageUrl" render={({field})=>(
                <FormItem>
                    <FormLabel>Background Image</FormLabel>
                    <FormControl>
                       <ImageUpload 
                       value={field.value?[field.value]:[]}
                       disabled={loading}
                       onChange={((url:string)=>field.onChange(url))}
                       onRemove={()=>field.onChange("")}
                       />
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
                
            )} />
            <div className='mt-4'>
            <FormField control={form.control} name="label" render={({field})=>(
                <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                        <Input disabled={loading} placeholder= "Billboard Label" {...field}/>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
                
            )} />
            </div>
            

            <div className="pt-6 space-x-4 items-center justify-end w-full" >
               
                <Button disabled={loading} type="submit"><Plus className='h-4 w-4  mr-1 font-bold '></Plus>  {action}</Button>
            </div>
        </form>
    </Form>
</div>
<Separator/>

    </>
   
  )
}

export default BillboardForm
