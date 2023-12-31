"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/${params.storeId}/home`,
      label: 'Home',
      active: pathName === `/${params.storeId}/home`
    },
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathName === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`
    },

  ]

  return (
    <nav className={cn("flex items-center ml-8 space-x-4 lg:space-x-6", className)} >
      {routes.map((route, index) => (
        <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")} >{route.label}</Link>
      ))}
    </nav>
  )
}
