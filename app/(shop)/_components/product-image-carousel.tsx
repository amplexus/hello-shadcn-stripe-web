"use client"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import products from "@/data/product-pages"

export default function ProductImageCarousel({ product }: { product: typeof products[number] }) {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!mainApi)
      return
    onSelect()
    mainApi.on('select', onSelect)
    mainApi.on('reInit', onSelect)
  }, [mainApi])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return
      mainApi.scrollTo(index)
    },
    [mainApi, thumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return
    setSelectedIndex(mainApi.selectedScrollSnap())
    thumbsApi.scrollTo(mainApi.selectedScrollSnap())
  }, [mainApi, thumbsApi, setSelectedIndex])

  return (
    <>
      {/* main image carousel */}
      <Carousel className="w-full" opts={{ containScroll: 'keepSnaps', dragFree: true }} setApi={setMainApi}> {/* embla__root */}
        <CarouselContent> {/* embla__viewport */}
          {[product.mainImage, ...product.images].map((imgUrl, index) => (
            <CarouselItem key={index}> {/* embla__slide */}
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 w-full">
                    <Image
                      style={{ objectFit: 'contain' }}
                      sizes="800px"
                      width={600} height={600}
                      // fill={true} // additional images disappear with this...
                      src={imgUrl}
                      alt={product.name} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* thumbs carousel */}
      <Carousel className="w-full" opts={{ align: "start", }} setApi={setThumbsApi}> {/* embla__root */}
        <CarouselContent className="w-full flex flex-row"> {/* embla__viewport */}
          {[product.mainImage, ...product.images].map((imgUrl, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4"> {/* embla__slide */}
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0 m-0">
                  <Button onClick={() => onThumbClick(index)} asChild className="w-full h-full bg-white dark:bg-black m-0 p-0 hover:bg-white dark:hover:bg-black">
                    <Image
                      style={{ objectFit: 'contain' }}
                      sizes="100px"
                      width={100} height={100}
                      // fill={true} // additional images disappear with this...
                      src={imgUrl}
                      alt={product.name} />
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

