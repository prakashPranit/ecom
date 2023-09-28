import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"


export async function POST(req:Request){
try{
  const {userId} = auth()
  const body = await req.json()
  const { name } = body
  if(!userId){
    return new NextResponse("Unathorized",{status:401})
  }
  if(!name){
    return new NextResponse("Name required",{status:400})
  }

  const store = await prismadb.store.create({
    data:{
        name,
        userId
    }
  })

  return NextResponse.json(store)

}catch(err){
    console.log("[storesPost]",err)
    return new NextResponse("Internal Error",{status:500})
}
}


export async function PATCH(req:Request){
  try{
    const {userId} = auth()
    const body = await req.json()
    const { name,id } = body
    if(!userId){
      return new NextResponse("Unathorized",{status:401})
    }
    if(!name){
      return new NextResponse("Name required",{status:400})
    }
  
    const store = await prismadb.store.update({
    where:{
      id:id
    },
    data:{
      name
    }
    })
  
    return NextResponse.json(store)
  
  }catch(err){
      console.log("[storesPatch]",err)
      return new NextResponse("Internal Error",{status:500})
  }
  }