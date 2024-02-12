"use client"
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const DeleteButton = ({ id }: { id: string }) => {
    const router = useRouter();
    const { mutate: deleteWhiteboard } = api.whiteboard.delete.useMutation();
    const deleteButtonHandler = async () => {
        deleteWhiteboard({ id }, {
            onSuccess: () => {
                router.refresh();
            }
        })
    }
    return (
        <>
            <button className="p-2 bg-red-700 text-white rounded-md" onClick={deleteButtonHandler}>Delete</button>
        </>
    );
}