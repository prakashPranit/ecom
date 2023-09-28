"use client"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
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
import ApiAlert from '@/components/ui/api-alert'
import useOrigin from '@/hooks/use-origin'


interface SettingsFromProps{
    initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1)
})


 const SettingsForm: React.FC<SettingsFromProps> = ({initialData}) => {
const[open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  const params = useParams()
  const origin = useOrigin()
  const router = useRouter()
  
      const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              name: initialData.name,
          }
      })
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
          console.log(values)
          try{
              setLoading(true)
              const response = await axios.patch(`/api/stores/${params.storeId}`,{...values})
              router.refresh()
              toast.success("Store updated successfully")
              window.location.assign(`/${response.data.id}`)
              console.log("response",response)
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
            const response = await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            toast.success("Store deleted successfully")
            
            console.log("response",response)
            router.push("/")
        }catch(err){
            toast.error("oops error: ,Make sure to delete all products and categories" + err)
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
        <Heading title="Settings" description="Manage store preferences" />
        
        <Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}}  > <Trash className='h-4 w-4'/></Button>
       
    </div>
    <Separator/>
    <div className="space-y-4 py-2 pb-4 w-[400px]">
    <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input disabled={loading} placeholder= "E-commerce" {...field}/>
                    </FormControl>
                    <FormMessage></FormMessage>
                </FormItem>
                
            )} />

            <div className="pt-6 space-x-4 items-center justify-end w-full" >
                <Button disabled={loading} variant= "outline" onClick={()=>console.log('cancel')} >Cancel</Button>
                <Button disabled={loading} type="submit">Continue</Button>
            </div>
        </form>
    </Form>
   
    
</div>
<Separator/>
<ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='public'></ApiAlert>
    </>
   
  )
}

export default SettingsForm
