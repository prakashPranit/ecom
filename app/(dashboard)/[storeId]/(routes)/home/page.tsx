import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import OverView from './components/overview'

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if (!store) {
        redirect("/")
    }

    return (
        <div className='flex-col'><div className='flex-1 space-y-4 p-8 pt-6'>
            <OverView initialData={store} ></OverView>
        </div>

        </div>
    )
}

export default SettingsPage
