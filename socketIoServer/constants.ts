export enum EVENTS {
  JOIN_ROOM = 'join-room',
  SEND_PRESENCE = 'presence',
  UPDATE_DATA = 'update',
  // Add more events here as we needed
}

export interface baseEventData {
  roomId: string;
  userId: string;
}

export interface joinRoomEventData extends baseEventData {
  // Add specific data if needed
}

export interface sendPresenceEventData extends baseEventData {
  presence: unknown;
}

export interface updatePresenceEventData extends baseEventData {
    update: unknown;
}