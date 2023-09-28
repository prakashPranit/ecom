import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"

export async function GET(req: Request, {params}:{params:{storeId:string,billboardId:string}}){
  try {
      const {userId} = auth()
  
      if(!userId){
        return new NextResponse("Unathorized",{status:401})
      }
    

      if(!params.billboardId)
        return new NextResponse("Billboard id is required",{status:400})
      
     
    
      const store = await prismadb.billboard.findUnique({
      where:{
        id:params.billboardId,
      }
      })
    
      return NextResponse.json(store)
      
  } catch (error) {
      console.error("billboardGet",error)
      return new NextResponse("Internal Server Error",{status:500})
  }
}





export async function PATCH(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
try{
  const {userId} = auth()
  const body = await req.json()
  const { label,imageUrl } = body
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

  const billboard = await prismadb.billboard.updateMany({
    where:{
      id:params.billboardId
    },
    data:{
        label,
        imageUrl:imageUrl
    }
  })

  return NextResponse.json(billboard)

}catch(err){
    console.log("[Billboard Patch]",err)
    return new NextResponse("Internal Error",{status:500})
}
}

export async function DELETE(req: Request, {params}:{params:{storeId:string,billboardId:string}}){
  try {
      const {userId} = auth()
  
      if(!userId){
        return new NextResponse("Unathorized",{status:401})
      }
    

      if(!params.billboardId)
        return new NextResponse("Billboard id is required",{status:400})
      
        const storebyUserId = await prismadb.store.findFirst({
          where:{
              id:params.storeId,
              userId:userId
          }
        })
    
        if(!storebyUserId){
          return new NextResponse("Unathorized Forbidden",{status:403})
        } 
    
      const store = await prismadb.billboard.deleteMany({
      where:{
        id:params.billboardId,
      }
      })
    
      return NextResponse.json(store)
      
  } catch (error) {
      console.error("billboardDelete",error)
      return new NextResponse("Internal Server Error",{status:500})
  }
}