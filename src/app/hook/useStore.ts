import { useEffect, useState } from 'react'
import {
    type HistoryEntry,
    type TLRecord,
    type TLStoreWithStatus,
    createTLStore,
    defaultShapeUtils,
    throttle,
    getUserPreferences,
    setUserPreferences,
    defaultUserPreferences,
    createPresenceStateDerivation,
    InstancePresenceRecordType,
    computed,
    react,
    type StoreSnapshot,
    type TLInstancePresence
} from '@tldraw/tldraw'

import { type JsonObject } from '@prisma/client/runtime/library'
import { type Socket, io } from "socket.io-client";


export function useStore({ userId, userName, roomId, server }:{userId:string, userName:string,roomId:string,server:string} ) {

    const [store] = useState(() => {
        const store = createTLStore({
            shapeUtils: [...defaultShapeUtils],
        })
        return store
    })

    const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
        status: 'loading',
    })

    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        const socket = io(server, {
            query: { roomId, userId },
        })

        setSocket(socket)
        return () => {
            socket?.disconnect()
        }
    }, [server, roomId, userId])


    useEffect(() => {

        if (!socket) return

        setUserPreferences({ id: userId, name: userName });

        const userPreferences = computed<{
            id: string;
            color: string;
            name: string;
        }>("userPreferences", () => {
            const user = getUserPreferences();
            return {
                id: user.id,
                color: user.color ?? defaultUserPreferences.color,
                name: user.name ?? defaultUserPreferences.name,
            };
        });

        const presenceId = InstancePresenceRecordType.createId(userId)
        const presenceDerivation = createPresenceStateDerivation(userPreferences, presenceId)(store)



        react('when presence changes', () => {
            const presence = presenceDerivation.get();
            const presenceArray: TLInstancePresence[] = []
            requestAnimationFrame(() => {
                if (!presence) return
                presenceArray.push(presence)
                throttle(() => {

                    presenceArray.forEach((presence) => {
                        socket.emit('presence', { roomId, userId, presence })
                    })
                    socket.emit('test', { roomId, userId })
                    presenceArray.length = 0
                }, 50)()

            })
        })

        socket.on('presence', (data: JsonObject) => {

            store.mergeRemoteChanges(() => {
                store.put([data.presence as unknown as TLRecord])
            })
        }
        )

        setStoreWithStatus({ status: 'loading' })

        const handleConnect = () => {
            socket.emit('join-room', { roomId, userId });

            setStoreWithStatus({
                status: 'synced-remote',
                connectionStatus: 'online',
                store,
            })

            socket.on('update', handleUpdate)
        }

        const handleUpdate = (data: JsonObject) => {
            try {
                if (data.clientId === socket.id) return

                store.mergeRemoteChanges(() => {
                    const { changes: { added, updated, removed } } = data.update as unknown as HistoryEntry<TLRecord>
                    for (const record of Object.values(added)) {
                        store.put([record])
                    }
                    for (const [, to] of Object.values(updated)) {
                        store.put([to])
                    }
                    for (const record of Object.values(removed)) {
                        store.remove([record.id])
                    }
                })

            } catch (e) {
                console.error(e)
            }
        }

        socket.on('connect', handleConnect)
        socket.on('disconnect', () => {
            setStoreWithStatus({
                status: 'synced-remote',
                connectionStatus: 'offline',
                store,
            })
        })

        const pendingChanges: HistoryEntry<TLRecord>[] = []
        const sendChanges = throttle(() => {
            if (pendingChanges.length === 0) return
            pendingChanges.forEach((change) => {
                socket.emit('update', { clientId: socket.id, type: 'update', update: change, roomId });
            })

            pendingChanges.length = 0
        }, 50)

        store.listen((event) => {
            if (event.source !== 'user') return
            pendingChanges.push(event)
            sendChanges()
        }, {
            source: 'user',
            scope: 'document',
        })

        return () => {
            socket.off('connect', handleConnect)
            socket.off('disconnect')
            socket.off('update', handleUpdate)
            socket.off('presence')
        }
    }, [socket, store])

    return storeWithStatus
}