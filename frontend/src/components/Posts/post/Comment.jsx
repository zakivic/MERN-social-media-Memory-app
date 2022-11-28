import { 
    Avatar, 
    IconButton, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Modal, 
    Stack, 
    TextField, 
    styled, 
    Paper, 
    ButtonGroup, 
    Button, 
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
    Divider,
    Collapse,
    Tooltip
 } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { 
    useDeleteCommentMutation, 
    useUpdateCommentMutation 
} from "../../../features/comments/commentsSlice";
import { useGetUserQuery } from "../../../features/user/userSlice";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import moment from "moment";

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });


const Comment = ({commentsId, comment}) => {
    const [ deleteComment ] = useDeleteCommentMutation();
    const [ updateComment ] = useUpdateCommentMutation();
    const commentCreator = useGetUserQuery(comment.userId);
    const [ open, setOpen ] = useState(false);
    const [ editComment, setEditComment ] = useState('');
    const user = useSelector(selectCurrentUser);
    const [expanded, setExpanded] = useState(false);

  
    // Comment Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        const deleteData ={
            commentsId : commentsId,
            commentId: comment._id
        }
        await deleteComment(deleteData).unwrap();
    }

    const handleEdit = async () => {
        const editData ={
            commentsId : commentsId,
            commentId: comment._id,
            comment: editComment
        }

        await updateComment(editData).unwrap();
    }

    const handleOpen = () => {
        setEditComment(comment.comment);
        setOpen(true);
    }

    const canManageComment = comment.userId === user?._id;


    const secondaryActions = (
        <>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
        >
        <MenuItem 
            onClick={handleDelete}
            disabled={!canManageComment}
        >
            <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            Delete
        </MenuItem>
        <MenuItem 
            onClick={handleOpen}
            disabled={!canManageComment}
        >
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
        </MenuItem>
      </Menu>
        </>
    );
    // END MENU

    //EXPEMD
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    //END EXPEND

    let name;
    if (commentCreator.isSuccess) {
        name = commentCreator?.data?.name;
    }else if (commentCreator.isError) {
        console.log(commentCreator.error);
    } else {
        
    }

  return (
    <>
        <ListItem 
            alignItems="flex-start"
            secondaryAction={
            <>
                <Tooltip title='Manage'>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMenu ? 'long-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVert />
                    </IconButton>
                </Tooltip>
                {secondaryActions}
            </>
            }
        >
        <ListItemAvatar>
          <Avatar alt={name}>
          {name?.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={'@'+name}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {moment(comment.createdAt).fromNow()}
              </Typography>
              {' — '}
              {!expanded ? (comment.comment.split(' ').splice(0, 5).join(' ')+'...') :
              
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {comment.comment}
              </Collapse>}
              <Tooltip title={expanded ? 'Fold' : 'Expand'}>
                <IconButton onClick={handleExpandClick}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Tooltip>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset"  />
        <SytledModal
            open={open}
            onClose={() => setEditComment('')}
        >
            
            <Paper elevation={4} sx={{p:2}}>
                <Stack direction='row' spacing={1}>
                    <TextField
                    variant="outlined"
                        label="Edit Comment"
                        name='edit'
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    >
                        
                    </TextField>
                    <ButtonGroup>
                        <Button
                         onClick={handleEdit}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </Button>
                    </ButtonGroup>
                 </Stack>
            </Paper>
            
        </SytledModal>
    </>
  )
}

export default Comment