import { nanoid } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../../features/posts/postsSlice";
import noMemory from '../../images/noMemory.png';
import Post from "./post/Post";

const Page = ({page}) => {
    const posts = useGetPostsQuery(page);

    let postsContent;
      if (posts.isLoading) {
        postsContent = (<div>Is Loading...</div>)
      }else if(posts.isSuccess)

          if (!posts?.data?.entities) {
            postsContent = (
              <img 
                style={{height: '100%', width: '100%', objectFit: 'contain'}} 
                src={noMemory} alt='no one posted a memory'
              />
            );
          } else {
          postsContent = (
          <>
            {posts.data.ids.map((postId) => (
              <Post key={nanoid()} page={page} post={posts.data.entities[postId]}/>
            ))}
          </>
          );
          }

      if (posts.isError) {
        console.log(posts.error);
      }

  return (
    <>
        {postsContent}
    </>
  )
}

export default Page