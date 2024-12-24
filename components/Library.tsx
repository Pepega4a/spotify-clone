"use client"

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";

import { Song } from "@/types/types";

import MediaItem from "./MediaItem";

interface LibraryProps {
    songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onPlay = useOnPlay(songs)

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (user.email === "percikaza@gmail.com") {
            return uploadModal.onOpen();
        }
        //check subscription

        return toast.error("У вас нет прав для загрузки музыки");
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2    ">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        key={item.id}
                        onClick={(id: string) => onPlay(id)}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;