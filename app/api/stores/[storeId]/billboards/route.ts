import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth()
        const body = await req.json()
        const { label, imageUrl } = body
        if(!userId){
          return new NextResponse("Unathorized",{status:401})
        }
        if(!label){
          return new NextResponse("Label is required",{status:400})
        }

        if(!imageUrl)
          return new NextResponse("Image url is required",{status:400})
          
        if(!params.storeId)
          return new NextResponse("StoreId is required",{status:400})
    
          const storebyUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId:userId
            }
          })

          if(!storebyUserId){
            return new NextResponse("Unathorized Forbidden",{status:403})
          }
      
        const billboard = await prismadb.billboard.create({

        data:{
          label,
          imageUrl:imageUrl,
          storeId:params.storeId,
        
        }
        })
      
        return NextResponse.json(billboard)
        
    } catch (error) {
        console.error("Billboards Post",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}


export async function GET(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth()
      
    
        if(!params.storeId)
          return new NextResponse("store id is required",{status:400})
    

        const billboard = await prismadb.billboard.findMany({
        where: {storeId:params.storeId}
        })
      
        return NextResponse.json(billboard)
        
    } catch (error) {
        console.error("Billboards Post",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}




export async function DELETE(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth()
    
        if(!userId){
          return new NextResponse("Unathorized",{status:401})
        }
      

        if(!params.storeId)
          return new NextResponse("Store id is required",{status:400})

      
        const store = await prismadb.store.deleteMany({
        where:{
          id:params.storeId,
          userId
        }
        })
      
        return NextResponse.json(store)
        
    } catch (error) {
        console.error("storesDelete",error)
        return new NextResponse("Internal Server Error",{status:500})
    }
}