import { default as TLDrawComponent } from "@/app/_components/Tldraw";
import { Room } from "./_components/Room";

export default async function Home() {


  return (
    <Room>
        <div style={{ position: 'fixed', inset: 0 }}>
          <TLDrawComponent />
        </div>
    </Room>

  );
}