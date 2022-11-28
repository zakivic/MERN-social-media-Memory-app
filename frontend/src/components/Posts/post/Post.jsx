import { 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent, 
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Tooltip
 } from '@mui/material';

 import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
 import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
 import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
 import OpenInFullIcon from '@mui/icons-material/OpenInFull';

 import { useSelector, useDispatch } from 'react-redux'
 import moment from 'moment';

 import { toggle, setId } from '../../../features/toggle/toggleSlice';
 import { 
  useDeletePostMutation, 
  useLikePostMutation 
} from '../../../features/posts/postsSlice';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { 
  erroToggle, 
  setMessage, 
  setSeverity 
} from '../../../features/error/errorSlice';
import { toggleDrawer } from '../../../features/comments/commentsDrawerSlice';

const dummyImage = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
const Post = ({post, page}) => {
    const {open, id} = useSelector((state) => state.toggleManager.value);
    const dispatch = useDispatch();
    const [deletePost] = useDeletePostMutation();
    const [likePost] = useLikePostMutation();
    const user = useSelector(selectCurrentUser);


    const handleDelete = async (id) => {
      //try-catch
      await deletePost(id).unwrap();
        dispatch(setSeverity('success'));
        dispatch(setMessage('Memory deleted successfully!'));
        dispatch(erroToggle());
    }

    const handleLike = async (id, userId) => {
      //try-catch
      if (user) {
        await likePost({id, userId, page}).unwrap();
      } else {
        dispatch(setSeverity('warning'));
        dispatch(setMessage('You have to log In to like a memory!'));
        dispatch(erroToggle());
      }
      
    }
    

    let postActionsContent = (<></>);
    if (user) {
      if (user._id === post?.creator) {
        postActionsContent = (<>
          <IconButton onClick={()=> handleDelete(post._id)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
          <IconButton onClick={() => {
            dispatch(setId(post._id));
            dispatch(toggle());
            }}>
            <EditOutlinedIcon />
          </IconButton>
        </>);
      }
    }
  return (
    <Card 
      elevation={8}
      sx={{ 
        margin: {xs: 1}, 
        width: {xs: "95%"}, 
        }}
    >
      <CardHeader
        avatar={
          <Avatar>
            {user?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <Tooltip title='Open'>
            <IconButton
              onClick={() => dispatch(toggleDrawer(post))}
              aria-label="details">
              <OpenInFullIcon />
            </IconButton>
          </Tooltip>
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        height="20%"
        image={post.selectedFile || dummyImage}
        alt={post.title}
      />
      <CardContent color='white'>
        <Typography variant="body2" color="text.secondary">
        {post.message.split(' ').splice(0, 5).join(' ')}...
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          onClick={()=> handleLike(post._id, user._id)}
          aria-label="like memory"
          disabled={!user}
        >
          
          <ThumbUpAltRoundedIcon
            color={post.likes.includes(user?._id) ? 'info' : 'action'}
          />
          <Typography>
             &nbsp;{post.likes.length}
          </Typography>
        </IconButton>
        {postActionsContent}
      </CardActions>
    </Card>

  )
}

export default Post