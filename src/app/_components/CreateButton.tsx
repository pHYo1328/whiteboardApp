"use client"
import { useState } from 'react';
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const CreateButton = () => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const { mutate: createWhiteboard } = api.whiteboard.create.useMutation();

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const createButtonHandler = async () => {
        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        createWhiteboard({ title }, {
            onSuccess: () => {
                router.refresh();
                closeDialog(); // Close the dialog on successful creation
            },
            onError: (error) => {
                // Handle error (optional)
                alert("An error occurred: " + error.message);
            }
        });
    };

    return (
        <>
            <button className="fixed bottom-4 right-4 p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg" onClick={openDialog}>Create</button>
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-hidden z-50">
                    <div className="bg-white rounded-lg p-8 m-4 max-w-sm max-h-full text-center overflow-auto shadow-lg z-60">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="input mb-4 px-2 py-1 border rounded w-max"
                        />
                        <div className="flex justify-evenly gap-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={createButtonHandler}>
                                Create Whiteboard
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeDialog}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
