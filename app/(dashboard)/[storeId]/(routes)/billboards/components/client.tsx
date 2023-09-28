"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter ,useParams} from 'next/navigation'
import React from 'react'
import { BillboardCoulmn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'


interface BillboardClientProps{
  data:BillboardCoulmn[]
}
const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {
     const router = useRouter()
     const params = useParams()


  return (<>
    <div className='flex items-center justify-between mb-2'>
    <Heading title={`Billboards(${data.length})`} description='Manage billboards of your store'></Heading>
    <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)} ><Plus className='mr-2 h-4 w-4'></Plus> Add new</Button>
    </div>
    <Separator/>
    <div className='mt-8'>
    <DataTable  searchKey='label' columns={columns}  data={data}/>
    </div>
    
  </>
  
  )
}

export default BillboardClient