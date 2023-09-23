import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'


import { ModalProvider } from '@/providers/modal-provider'
import prismadb from '@/lib/prismadb'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'My admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const store = prismadb.store
  return (
    <html lang="en"> <ClerkProvider> 
      <ModalProvider/>
      <body className={inter.className}>{children}</body>
    </ClerkProvider>
  </html>
  
  )
}
