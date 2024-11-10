import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@/components/SignInButton"
import { auth } from "@/auth"
import { cn } from "@/lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartColumnDecreasing, SearchIcon, WalletIcon } from "lucide-react"

const SERVICES_LIST = [
  {
    title: "Tailwind CSS",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor.",
    icon: <ChartColumnDecreasing size={36} />
  },
  {
    title: "Next Auth",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <WalletIcon size={36} />,
  },
  {
    title: "Shadcn",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <SearchIcon size={36} />,
  },
]

export default async function Home() {
  return (
    <div>
      <MainHeroSection />
      <CallToActionSection />
      <SecondaryHeroSection />
      <ServicesHeroSection />
    </div>
  )
}

const MainHeroSection = async () => {
  const session = await auth()

  return (
    <section className="bg-muted/10
        py-24 lg:py-24 
        flex flex-col items-center justify-center text-center text-balance gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">Home</h1>
      <div className="text-lg lg:text-3xl max-w-screen-xl">
        Hello {session?.user?.name || "unauthenticated user"}
      </div>
      <div className="">
        {!session && <SignInButton />}

      </div>
    </section>
  )
}

const CallToActionSection = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 px-16 py-16 lg:py-24"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Lorem
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Ipsum Dolor{" "}
            </span>
            Sit Amet Consectetur Adipisicing
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto">Request a Demo</Button>
          <Button variant="outline" className="w-full md:w-auto" > View all features </Button>
        </div>
      </div>
    </section>
  )
}

const SecondaryHeroSection = () => {

  return (
    <section className="bg-mute/50 py-16 lg:py-24">
      <div className="container">
        <div className="max-w-2xl text-center mx-auto">
          <p className="">Lorem, ipsum dolor.</p>
          {/* Title */}
          <div className="mt-5 max-w-2xl">
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Lorem ipsum dolor sit amet.
            </h2>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl">
            <p className="text-xl text-muted-foreground">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut quasi eum itaque id cupiditate sed ipsa voluptas, harum molestias quos?
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <Button className={cn("text-lg p-6 rounded-xl flex gap-2")}>Get started</Button>
            <Button className={cn("text-lg p-6 rounded-xl flex gap-2")} variant={"outline"}>
              Learn more
            </Button>
          </div>
          {/* End Buttons */}
        </div>
      </div>
    </section>
  )
}

const ServicesHeroSection = () => {
  return (
    <section className="bg-muted/50 px-16 py-16 lg:py-24">
      <div className="container grid lg:grid-cols-[1fr,1fr] gap-8 lg:gap-16 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Lorem, Ipsum{" "}
            </span>
            Dolor
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </p>

          <div className="flex flex-col gap-8">
            {SERVICES_LIST.map(({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1730327442005-b5d3d854eb49?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          width={1920}
          height={2879}
          alt="About services"
        />
      </div>
    </section>

  )
}
