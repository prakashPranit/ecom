"use client"
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Store } from '@prisma/client'
import * as z from 'zod'






interface SettingsFromProps{
    initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1)
})


 const OverView: React.FC<SettingsFromProps> = ({initialData}) => {
   
  
  return (
    <>
     <div className='flex items-center justify-between'>
        <Heading title="Home" description="Track your sales, and grow your business" />  
      
    </div>
    <Separator/> 
   
    </>
   
  )
}

export default OverView
