import { Whiteboard } from "@prisma/client";
import { JoinButton } from "./JoinButton";
import { DeleteButton } from "./DeleteButton";

export const WhiteBoardModel = ({ whiteboard }: { whiteboard: Whiteboard }) => {
    return (
        <div className="bg-gray-300 rounded-lg shadow-md p-2 m-2 ">
            <p className="p-3">title : {whiteboard.title}</p>
            <div className="flex flex-row justify-between p-3">
                <DeleteButton id={whiteboard.id} />
                <JoinButton id={whiteboard.id} />
            </div>
        </div>
    );
}