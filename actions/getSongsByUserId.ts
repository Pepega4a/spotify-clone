import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types/types";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: () => cookies(),
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.log(userError);
        return [];
    }
    
    const {data, error} = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
};

export default getSongsByUserId;
