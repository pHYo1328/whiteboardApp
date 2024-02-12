"use client"

import { useRouter } from "next/navigation";

export const JoinButton = ({id}:{id: string}) => {
    const router = useRouter();
    const joinButtonHandler = async()=> {
        router.push(`/${id}`);
    }
    return(
        <button className="p-2 bg-blue-700 text-white rounded-md" onClick={joinButtonHandler}>Join</button>
    );
}