import {
    Avatar,
    AvatarGroup,
    Box,
    ImageList,
    ImageListItem,
    Typography,
  } from "@mui/material";

  import avatar_1 from '../../images/avatar-1.jpg';
  import avatar_2 from '../../images/avatar-2.jpg';
  import avatar_3 from '../../images/avatar-3.jpg';
  import avatar_6 from '../../images/avatar-6.jpg';
  import avatar_7 from '../../images/avatar-7.jpg';
  import breakfast from '../../images/breakfast.jpg';
  import camera from '../../images/camera.jpg';
  import burgers from '../../images/burgers.jpg';
  
  const Rightbar = () => {
    return (
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed" width={300}>
          <Typography variant="h6" fontWeight={100}>
            Online Friends
          </Typography>
          <AvatarGroup max={7}>
            <Avatar
              alt="Remy Sharp"
              src={avatar_1}
            />
            <Avatar
              alt="Travis Howard"
              src={avatar_2}
            />
            <Avatar
              alt="Cindy Baker"
              src={avatar_3}
            />
            <Avatar alt="Agnes Walker" src="" />
            <Avatar
              alt="Trevor Henderson"
              src={avatar_6}
            />
            <Avatar
              alt="Trevor Henderson"
              src={avatar_2}
            />
            <Avatar
              alt="Trevor Henderson"
              src={avatar_7}
            />
            <Avatar
              alt="Trevor Henderson"
              src={avatar_1}
            />
            <Avatar
              alt="Trevor Henderson"
            />
          </AvatarGroup>
          <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
            Latest Photos
          </Typography>
          <ImageList cols={3} rowHeight={100} gap={5}>
            <ImageListItem>
              <img
                src={breakfast}
                alt="breakfast"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={burgers}
                alt="burgers"
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={camera}
                alt="camera"
              />
            </ImageListItem>
          </ImageList>
        </Box>
      </Box>
    );
  };
  
  export default Rightbar;