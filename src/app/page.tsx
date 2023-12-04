import { TLDrawComponent } from "@/app/_components/Tldraw";
export default async function Home() {

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <TLDrawComponent />
    </div>
  )
}