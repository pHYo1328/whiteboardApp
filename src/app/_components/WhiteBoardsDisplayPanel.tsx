import { api } from "@/trpc/server";
import { Whiteboard } from "@prisma/client";
import { WhiteBoardModel } from "./WhiteBoardModel";
import { CreateButton } from "./CreateButton";
import { unstable_noStore as noStore } from "next/cache";

export const WhiteBoardsDisplayPanel = async () => {
    noStore();
    const whiteboards: Whiteboard[] = await api.whiteboard.getAll.query();
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4">
                {whiteboards.map((whiteboard: Whiteboard) => (
                    <div key={whiteboard.id}>
                        <WhiteBoardModel whiteboard={whiteboard} />
                    </div>
                ))}
            </div>
            <div className="fixed bottom-5 right-5">
                <CreateButton />
            </div>
        </div>
    );
}
