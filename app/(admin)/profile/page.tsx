"use server"
import { auth } from "@/auth";
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function ProfilePage() {
  const session = await auth();
  if (!session)
    return null // middleware means this should never happen...
  console.log("ProfilePage(): session", session)

  return (
    <div className="container w-96">
      <h1 className="text-2xl my-4">Profile</h1>
      <Input className="w-full my-4" type="text" placeholder={session?.user?.name || ""} readOnly />
      <Input className="w-full my-4" type="email" placeholder={session?.user?.email || ""} readOnly />
      {session?.user?.image &&
        <Image src={session.user.image} alt={session.user.name || "profile"} width={200} height={200} className="mx-auto my-4" />
      }
    </div>
  )
}

