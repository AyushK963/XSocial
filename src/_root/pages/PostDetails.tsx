import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/query";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');

  const { user } = useUserContext();

  const handleDeletePost = () => {
    // Delete post functionality
  };

  // Render loading spinner if post is pending
  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <img
          src={post?.imageUrl || '/assets/icons/add-post.svg'}
          alt="post"
          className="post_details-img pointer-events-none"
        />
        <div className="post_details-info">
          <div className="flex-between w-full">
            <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
              <img
                src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                alt="creator"
                className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
              />
              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post?.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular">
                    {multiFormatDateString(post?.$createdAt)}
                  </p>
                  -
                  <p className="subtle-semibold lg:small-regular">
                    {post?.location}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex-center">
              {/* Only show edit link if user is the creator */}
              {user.id === post?.creator.$id && (
                <Link to={`/update-post/${post?.$id}`}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
              )}

              {/* Show delete button only if user is the creator */}
              {user.id === post?.creator.$id && (
                <Button onClick={handleDeletePost} variant="ghost" className="ghost_details-delete_btn">
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24} />
                </Button>
              )}
            </div>
          </div>
          <hr className="border w-full border-dark-4/80" />
          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2">
              {/* Map over tags only if post.tags exists */}
              {post?.tags && post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3 lowercase">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            {/* Pass post and user.id to PostStats component */}
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
