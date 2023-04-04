import { Card, Button, Container, Row, Col } from "react-bootstrap";
import img from "./images/login5.jpg";
import dinoLogo from "./images/dinoLogo.png";
import img2 from "./images/bg2.jpg";
import "../css/profile.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect,useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";


const Profile = () => {
  const [initialState, setInitialState] = useState([]);//just making an empty array solved the bug of not fetching data
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const usertoken = localStorage.getItem("usertoken");
  console.log(usertoken);
    const decodeduser = jwt.decode(usertoken);
  console.log(decodeduser);

    const userID = decodeduser.id;
    useEffect(() => {
      axios
        .get(`/offer/user/${userID}`)
        .then((res) => {
          setInitialState(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
      console.log(initialState);
      const handleLogoutUser = () => {
        localStorage.clear();
        //window.location.href = "/";
      };
  return (
    <div className="background"> 
      {/* <Navbar2 /> */}
      <img className="bg" src={img2} />
      <a href="/" className="navlogo">
        <div data-aos="fade-right" className="fade">
          <img className="dinologo" src={dinoLogo} />
        </div>
      </a>

      <div className="links2">
        <a href="/" onClick={ handleLogoutUser }>Logout </a>
      </div>

      <div className="profile">
        <div data-aos="zoom-in-up" className="fade">
          <Card className="profileCard">
            <div className="cardImg">
              <Card.Img class="rounded-circle" variant="top" src={img} />
            </div>

            <Card.Title className="name">{initialState.name}</Card.Title>

            <Card.Body>
              <div className="mobile">
                <Container>
                  <Row>
                    <Col className="mobile" md={5}>
                      {" "}
                      <Card.Text>Email</Card.Text>
                    </Col>
                    <Col className="mobile" md={5}>
                      {" "}
                      <Card.Text>{initialState.email}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mobile" md={5}>
                      {" "}
                      <Card.Text>Address:</Card.Text>
                    </Col>
                    <Col className="mobile" md={5}>
                      {" "}
                      <Card.Text className="address">
                        272/3, badiuzzaman road, dhaka-cantonment, Dhaka-1206
                      </Card.Text>
                    </Col>
                  </Row>
                </Container>
              </div>
              <br />
              <Button className="info" variant="info">
                <a href="/userhistory">  Reservation History</a> 
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
