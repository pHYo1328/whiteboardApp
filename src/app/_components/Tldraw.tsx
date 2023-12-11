"use client"

import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useOthers, useMyPresence } from "../../../liveblocks.config";
import Cursor from './Cursor';
const COLORS = [
    "#E57373",
    "#9575CD",
    "#4FC3F7",
    "#81C784",
    "#FFF176",
    "#FF8A65",
    "#F06292",
    "#7986CB",
];
export default function TLDrawComponent() {
    const others = useOthers();
    const userCount = others.length + 1;
    const [{ cursor }, updateMyPresence] = useMyPresence();
    
    return (

        <main style={{ position: 'fixed', inset: 0 }}
            onPointerMove={(event) => {
                event.preventDefault();
                updateMyPresence({
                    cursor: {
                        x: Math.round(event.clientX),
                        y: Math.round(event.clientY),
                    },
                });
            }}
            onPointerLeave={() =>
                updateMyPresence({
                    cursor: null,
                })
            }
        >
            <div className="self-end m-4">
                <p className='font-bold text-sm'>{userCount} active users</p>
            </div>
            <Tldraw />
            {
                others.map(({ connectionId, presence }) => {
                    if (presence.cursor === null) {
                        return null;
                    }
                    return (
                        <Cursor
                            key={`cursor-${connectionId}`}
                            color={COLORS[connectionId % COLORS.length] ?? "red"}
                            x={presence.cursor.x}
                            y={presence.cursor.y}
                        />
                    );
                })
            }
        </main>
    )
}
