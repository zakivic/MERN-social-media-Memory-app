
import { Container, Stack} from '@mui/material';

import Form from '../Form/Form';
import Menu from '../Menu/Menu';
import Details from '../Posts/post/Details';
import Posts from '../Posts/Posts';
import Rightbar from '../Rightbar/Rightbar';
import Sidebar from '../Siderbar/Sidebar';



const Home = () => {

  return (

    <Container>
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="space-between"
        alignItems={{sx: "center"}}
      >
        <Sidebar />
        <Posts />
        <Rightbar />
      </Stack>
      <Details />
      <Form /> 
      <Menu />
    </Container>

  )
}

export default Home
