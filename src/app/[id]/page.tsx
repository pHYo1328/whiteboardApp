import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth"
import TLDrawComponent from "../_components/TLDrawComponent"

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <TLDrawComponent roomId={params.id} userId={session!.user.id} />
    </div>
  )
}