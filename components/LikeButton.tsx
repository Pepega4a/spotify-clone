"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface LikeButtonProps {
    songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        }

        fetchData();
    }, [songId, user?.id, supabaseClient]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);

            if (error) {
                toast.error("Failed to unlike song");
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({ user_id: user.id, song_id: songId });

            if (error) {
                toast.error("Failed to like song");
            } else {
                setIsLiked(true);
                toast.success("Song liked!");
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="hover:opacity-75 transition"
        >
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    )
}

export default LikeButton;