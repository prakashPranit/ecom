"use client"

import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {

    const storeModal = useStoreModal()

    const [loading,setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try{
            setLoading(true)
            const response = await axios.post('/api/stores',values)
            toast.success("Store created successfully")
            window.location.assign(`/${response.data.id}`)
            console.log("response",response)
        }catch(err){
            toast.error("oops error: " + err)
         console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create Store" description="Add new store to manage product and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div className="space-y-4 py-2 pb-4">
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
                            <Button disabled={loading} variant= "outline" onClick={storeModal.onClose} >Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>)
}