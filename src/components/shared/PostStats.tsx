import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/query";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import Loader from "./Loader";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const { data: currentUser } = useGetCurrentUser();
    const likesList = post?.likes?.map((user: Models.Document) => user.$id) || [];

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isLoading: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isLoading: isDeletingSaved } = useDeleteSavedPost();
    
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if (post && currentUser) {
            const savedPostRecord = currentUser.save.find((record: Models.Document) => record.post.$id === post.$id);
            setIsSaved(!!savedPostRecord);
        }
    }, [post, currentUser]);
  
    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();
  
        let newLikes = [...likes];
  
        const hasLiked = newLikes.includes(userId);
  
        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
            toast({ title: "Post Unliked" });
        } else {
            newLikes.push(userId);
            toast({ title: "Post Liked" });
        }
  
        setLikes(newLikes);
        likePost({ postId: post?.$id || '', likesArray: newLikes });
    };

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (currentUser && post) {
            const savedPostRecord = currentUser.save.find((record: Models.Document) => record.post.$id === post.$id);

            if (isSaved) {
                setIsSaved(false); 
                toast({ title: "Post removed from saved" });
                if (savedPostRecord) {
                    deleteSavedPost(savedPostRecord.$id);
                }
            } else {
                setIsSaved(true);
                toast({ title: "Post saved" });
                savePost({ userId: userId, postId: post.$id || '' });
            }
        }
    };
 
    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img 
                    src={
                        checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"
                    }
                    alt="like" 
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSavingPost || isDeletingSaved ? <Loader /> :
                    <img 
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="like" 
                        width={20}
                        height={20}
                        onClick={handleSavePost}
                        className="cursor-pointer"
                    />
                }
            </div>
        </div>
    );
};

export default PostStats;
