import { 
  Avatar, 
  ButtonGroup, 
  Divider, 
  IconButton, 
  Stack, 
  styled, 
  TextField,
  Box,
  Paper,
  Modal,
  Button,
  Typography
 } from '@mui/material';
import ChipInput from 'material-ui-chip-input';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { toggle, setId } from '../../features/toggle/toggleSlice';
import { 
  useGetPostsQuery, 
  useAddPostMutation, 
  useUpdatePostMutation 
} from '../../features/posts/postsSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { selectCurrentPage } from '../../features/page/pageSlice';

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const initialState = { 
  title: '', 
  message: '', 
  name: '', 
  tags: [], 
  selectedFile: '' 
};

const Form = () => {
  const [newPostData, setNewPostData] = useState(initialState);
  const [imageName, setImageName] = useState('');
  const {open, id} = useSelector((state) => state.toggleManager.value);
  const page = useSelector(selectCurrentPage);
  const currentId = id === "add";
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { post } = useGetPostsQuery(page, {
    selectFromResult: ({ data }) => ({
        post: data?.entities[id]
    }),
  });
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  
 

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setNewPostData(post);
  }, [post]);
 
  

  const handleAddChip = (tag) => {
    setNewPostData({ ...newPostData, tags: [...newPostData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setNewPostData({ ...newPostData, tags: newPostData.tags.filter((tag) => tag !== chipToDelete) });
  };


  

  const handleSubmit = async (e) =>{
      e.preventDefault();
      //TODO: try-catch
      let result;
      if (currentId) {
      
        newPostData.name = user.name;
        result = await addPost(newPostData).unwrap();
        clear();
      } else {
        result = await updatePost(newPostData).unwrap();
      }

      dispatch(toggle());
       
  }

  const clear = () => {
    setNewPostData(initialState);
    setImageName('');
  };

  const convertToBase_64 = (file) => {
    setImageName(trimFileName(file.name));
    const reader = new FileReader();
    reader.readAsDataURL(file);  
    reader.onload = () => {
      setNewPostData({ ...newPostData, selectedFile: reader.result})
    }

  }

  function trimFileName(fileName){
    var delimiter = fileName.lastIndexOf('.'), 
        extension = fileName.substr(delimiter), 
        file = fileName.substr(0, delimiter); 

    var filenameLen = 6; // adjust for the required filename length
    return (file.length > filenameLen ? file.substr(0, filenameLen) + "..." : file) + extension;
}

  return (
    <SytledModal open={open} onClose={()=> {
      dispatch(toggle());
      dispatch(setId(''));
      clear();
    }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Paper elevation={4} sx={{p:2}}>
            <Typography variant='h4'>
              {currentId ? 'Create Memory' : 'Edit Memory'}
            </Typography>

            <Divider sx={{m: '5px 0px'}} />

            {user && 
              <UserBox>
                <Avatar />
                <Typography fontWeight={500} variant="span">
                  {user.name}
                </Typography>
              </UserBox>
            }

            <Stack direction='column' spacing={2}>
            <TextField 
              variant="outlined"
              label="Title"
              name='title' 
              value={newPostData.title} 
              onChange={(e) =>
                setNewPostData({ ...newPostData, title: e.target.value })}
            />

            <TextField 
              variant="outlined"
              label="Message"
              name='message' 
              multiline
              rows={3} 
              value={newPostData.message}
              onChange={(e) => 
                setNewPostData({ ...newPostData, message: e.target.value })}
            />
            
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={newPostData.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />
            
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input 
                type="file"
                hidden
                id="avatar" name="avatar"
                accept="image/*"
                onChange={(e) =>convertToBase_64(e.target.files[0]) }>
              </input>
              <UploadFileIcon />
              <Typography>
                {imageName === '' ? 'Upload Image' : imageName}
              </Typography>
            </IconButton>
            
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
              sx={{mt:"20px"}}
            >
              <Button type="submit">Submit</Button>
              <Button 
                sx={{ width: "100px" }}
                onClick={() => clear()}
                >
                <CancelIcon />
              </Button>
            </ButtonGroup>
            </Stack>
          </Paper>
        </Box>
    </SytledModal>
  )
}

export default Form