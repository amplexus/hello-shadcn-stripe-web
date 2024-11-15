"use client"
import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function DynamicBreadcrumbs() {

  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  return (
    <div className="container my-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key="home">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join('/')}`
            const linkName = link[0].toUpperCase() + link.slice(1, link.length)
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem >
                  <BreadcrumbLink href={href}>{linkName}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

