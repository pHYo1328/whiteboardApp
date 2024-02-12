import type { Socket } from 'socket.io';

import * as EventsData from "./constants";

function broadcastEvent(socket: Socket, roomId: string, eventName: string, data: unknown) {
    socket.to(roomId).emit(eventName, data);
}


async function handleJoinRoom(data: EventsData.joinRoomEventData, socket: Socket) {
    const { roomId, userId } = data;
    try {
        await socket.join(roomId);
        console.log(`user ${userId} joined room ${roomId} with socket ID ${socket.id}`);

    } catch (error) {
        console.error(`Error joining room: ${error}`);
    }
}

async function handleSendPresence(data: EventsData.sendPresenceEventData, socket: Socket) {
    try {
        const { roomId, userId, presence } = data;
        const emitData = { userId, presence };
        broadcastEvent(socket, roomId, EventsData.EVENTS.SEND_PRESENCE, emitData);
    }
    catch (error) {
        console.error(`Error sending presence: ${error}`);
    }
}

async function handleUpdatePresence(data: EventsData.updatePresenceEventData, socket: Socket){
    try{
        const { roomId, userId, update } = data;
        const emitData = {type: 'update',update,userId};
        broadcastEvent(socket, roomId, EventsData.EVENTS.UPDATE_DATA, emitData);
    }
    catch(error){
        
    }
}




function registerEventHandlers(socket: Socket) {
    socket.on(EventsData.EVENTS.JOIN_ROOM, (data) => handleJoinRoom(data, socket));
    socket.on(EventsData.EVENTS.SEND_PRESENCE, (data) => handleSendPresence(data, socket));
    socket.on(EventsData.EVENTS.UPDATE_DATA, (data) => handleUpdatePresence(data, socket));
    // Register more events
}

export default registerEventHandlers;
