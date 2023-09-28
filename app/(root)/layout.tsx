import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function SetupLayout({ children }: {
    children: React.ReactNode
}) {
    const { userId } = auth()
    if (!userId) {
        redirect('/signIn')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }

    return (<>
       <div> {children}</div> </>)
}