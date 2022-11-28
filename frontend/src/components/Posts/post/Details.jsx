import { 
  Card, 
  CardContent, 
  CardMedia,  
  Divider, 
  IconButton, 
  InputAdornment, 
  OutlinedInput, 
  Stack, 
  SwipeableDrawer,
  Typography 
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import InfiniteScroll from "react-infinite-scroll-component";
import { 
  selectCurrentDrawerOpen, 
  selectCurrentDrawerPost,
  resetDrawer,
  toggleDrawer
} from "../../../features/comments/commentsDrawerSlice"
import { 
  useGetCommentsQuery,
  useAddCommentMutation
 } from "../../../features/comments/commentsSlice";
import Comment from "./Comment";


const dummyImage = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

const Details = () => {
    const dispatch = useDispatch();
    const [ comment, setComment ] = useState('');
    const open = useSelector(selectCurrentDrawerOpen);
    const post = useSelector(selectCurrentDrawerPost);
    const comments = useGetCommentsQuery(post?.commentsId);
    const [ addComment ] = useAddCommentMutation();
    let commentsContent;

    if (comments.isSuccess) {
      commentsContent = 
      <>
        {comments.data.comments.map((comment) => (
        <Comment key={nanoid()} commentsId={comments.data._id} comment={comment} />
      ))}
      </>
    }else{
      commentsContent = <Typography>no comments...</Typography>
    }


    const commentOnPost = async (e) => {
      e.preventDefault();

      const commentData = {
        id: post?.commentsId,
        cmt: comment
      }

      await addComment(commentData).unwrap();
      // try-catch
      setComment('');
    }

  return (
    <SwipeableDrawer 
    anchor="bottom"
    open={open}
    onOpen={()=> dispatch(toggleDrawer())}
    onClose={() => {
      dispatch(toggleDrawer());
      dispatch(resetDrawer());
      }}
    >
    <Stack direction='column' spacing={2} sx={{m: 5}}>
      <Stack 
        direction='row' 
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">
          {post?.title}
        </Typography>
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Divider />
      <Stack 
        direction={{ xs: "column-reverse", lg: "row" }} 
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        >
        {/* COMMENTS SECTION */}
        <Stack 
          direction='column' 
          width={{ xs: "100%", lg: "70%" }}  
          spacing={2}>
          <Stack 
            width={{ xs: "100%", lg: "90%" }} 
            component='form' 
            onSubmit={commentOnPost} 
            direction='column'
            spacing={2}
          >
            <Typography variant="h6">
              Comments:
            </Typography>
            <OutlinedInput 
            
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)} 
              fullWidth
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type='submit'
                  disabled={comment.length === 0}
                >
                  <SendIcon />
               </IconButton>
              </InputAdornment>
            }
            />
  
          </Stack>
          
          <InfiniteScroll
            dataLength={100}
            height={320}
          >
          {commentsContent}
          </InfiniteScroll>
        </Stack>


        {/* POST DETAILS SECTION */}
        <Card>
          <CardMedia
            component="img"
            height="70%"
            width='50%'
            image={post?.selectedFile || dummyImage}
            alt={post?.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {post?.message}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {post?.tags?.map((tag) => `#${tag} `)}
            </Typography>
          </CardContent>
          
         </Card>

      </Stack>
    </Stack>
      

    </SwipeableDrawer>
  )
}

export default Details