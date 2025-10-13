import { useQuery} from "@tanstack/react-query";
import { useChatStore } from "../store/chatStore";
import { supabase } from "../supabaseClient";

interface Message {
    id: number;
    content: string;
    user_id: string;
    created_at: string;
    room_id: number;
}

async function fetchMessages(roomId: number): Promise<Message[]> {
    const { data, error } = 
    await supabase.from("messages").select("*").eq("room_id", roomId).order("created_at", {ascending: true});
    if (error) throw Error(error.message);
    return data as Message[];

}

function ChatMessages() {
    const {currentRoom} = useChatStore()
    const {data: messages, error, isLoading,} = useQuery<Message[], Error>({
        queryKey: ["messages", currentRoom?.id],
        queryFn: () =>
            currentRoom?.id === null ? Promise.resolve([]) : fetchMessages(currentRoom!.id),enabled: currentRoom?.id !== null,
    });
    if (isLoading) return <p className="loader-text"> Loading messages...</p>
    if (error)
        return (
          <p className="loader-text"> Error loading messages: {error.message} </p>
        );

        console.log(messages);
    return <div></div>;
}

export default ChatMessages;