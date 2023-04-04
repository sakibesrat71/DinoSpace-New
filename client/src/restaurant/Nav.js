import Navbar from 'react-bootstrap/Navbar'
import dinoLogo from './images/dinoLogo.png';
import { Container, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";
const Nav_info = () => {
    return (
        <Navbar sticky="top" bg="light" variant="light">
    <Container>
    <Nav className="me-auto">
            <a href="#overview">Overview</a>
            <a href="#interior">Interior</a>
            <a href="#interior">Menu</a>
            <a href="#menu">Reviews</a>
    </Nav>
    </Container>
  </Navbar>
    );
}

export default Nav_info;