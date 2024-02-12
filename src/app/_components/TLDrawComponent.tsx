"use client"

import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useStore } from '../hook/useStore';

export default function TLDrawComponent({ roomId, userId }: { roomId: string, userId: string }) {
    const store = useStore({
        userId,
        userName: userId,
        roomId,
        server: process.env.NEXT_PUBLIC_SOCKET_URL!,
    })
    return (

        <main style={{ position: 'fixed', inset: 0 }}>
            <Tldraw store={store} />
        </main>
    )
}
