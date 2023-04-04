import { Form, Button, Container, Row, Col } from "react-bootstrap";
import dinoLogo from "./images/dinoLogo.png";
import "../css/profile.css";
import "../css/auth.css";
import userIcon from "./images/dino.jpg";
import img3 from "./images/bg2.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

///import {Grid, paper} from '@material-ui/core';
const RegisterRestaurents = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const [name, setRestaurantName] = useState("");
  const [mail, setRestaurantMail] = useState("");
  const [city, setRestaurantCity] = useState("");
  const [street, setRestaurantStreet] = useState("");
  const [house, setRestaurantHouse] = useState("");
  const [location, setRestaurantLocation] = useState("");
  const [UserID, setRestaurantUserID] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [cuisine, setCuisine] = useState([""]);
  const [openingTime, setOpenTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [menu, setMenu] = useState([]);

  const rating = 1;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("lol" + name);
    const address = {
      city: city,
      street: street,
      houseNumber: house,
    };
    if (password == cpassword) {
      const newRestaurent = {
        name,
        address,
        cuisine,
        rating,
        location,
        UserID,
        mail,
        password,
        openingTime,
        closingTime,
      };
      console.log(newRestaurent);
      try {
        const response = await axios.post("/post/", newRestaurent);
        console.log(response);
        if (response.data.message == "email already exists") {
          alert("email already exists");
        }
        // const response= fetch('/post/',{
        //     method:'POST',
        //     mode:'no-cors',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Accept':'application/json'
        //     },
        //     body:JSON.stringify(newRestaurent)
        //   })
        //   .then(response => response.json())
        //     .then(data => console.log(data));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("password not match");
    }
    //console.log(newRestaurent);
  };

  // return(

  //     <div className="restaurant">
  //         hello
  //         <form>
  //     <label>
  //       Name:
  //       <input type="text" onChange={e=>setRestaurantName(e.target.value)}/>
  //     </label>
  //     <label>
  //       Location:
  //       <input type="text" onChange={e=>setRestaurantLocation(e.target.value)}/>
  //     </label>
  //     <label >
  //       mail:
  //       <input id="email" type="email" onChange={e=>{setRestaurantMail(e.target.value);
  //       }}/>
  //     </label>
  //     <label>
  //       Cuisine:
  //       <input type="text" onChange={e=>setCuisine(e.target.value)}/>
  //     </label>
  //     <label>
  //       City:
  //       <input type="text" onChange={e=>setRestaurantCity(e.target.value)}/>
  //     </label>
  //     <label>
  //       Street:
  //       <input type="text" onChange={e=>setRestaurantStreet(e.target.value)}/>
  //     </label>
  //     <label>
  //       HouseNumber:
  //       <input type="text" onChange={e=>setRestaurantHouse(e.target.value)}/>
  //     </label>
  //     <label>
  //       Opening Time:
  //       <input type="time" onChange={e=>setOpenTime(e.target.value)}/>
  //     </label>
  //     <label>
  //       HouseNumber:
  //       <input type="time" onChange={e=>setClosingTime(e.target.value)}/>
  //     </label>
  //     <label>
  //       Password:
  //       <input type="password" id="pass1" onChange={e=>setpassword(e.target.value)}/>
  //     </label>
  //     <label>
  //       Confirm Password:
  //       <input type="password" id="pass2" onChange={e=>setcpassword(e.target.value)}/>
  //     </label>
  //     <input type="submit" value="Submit" onClick={handleSubmit}/>
  //   </form>
  //     </div>

  // );

  return (
    <div className="background">
      {/* <Navbar2 /> */}
      <img className="bg" src={img3} />
      <a href="/" className="navlogo">
        <div data-aos="fade-right" className="fade">
          <img className="dinologo" src={dinoLogo} />
        </div>
      </a>

      <div className="links2">
        <a href="/SignUp">Sign Up</a>
        <a href="/LogIn">Sign In</a>
       
      </div>

      <div className="profile">
        <div data-aos="zoom-in-up" className="fade">
          <div className="justify-content-md-center">
            <Form>
              <div data-aos="fade-up" className="fade">
                <div className="text-center">
                  <img className="user" src={userIcon} />
                </div>
                <Container>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="Rname">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantName(e.target.value)}
                          placeholder="Enter Name"
                          id="Rname"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setRestaurantLocation(e.target.value)
                          }
                          placeholder="Enter Location"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) => {
                            setRestaurantMail(e.target.value);
                          }}
                          placeholder="Enter email"
                          id="email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Cuisine</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setCuisine(e.target.value)}
                          placeholder="Enter Cuisine"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantCity(e.target.value)}
                          placeholder="Enter City"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantStreet(e.target.value)}
                          placeholder="Enter Street No"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>House</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantHouse(e.target.value)}
                          placeholder="Enter House No"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Opening</Form.Label>
                        <Form.Control
                          type="time"
                          onChange={(e) => setOpenTime(e.target.value)}
                          placeholder="Enter Opening Time"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Closing</Form.Label>
                        <Form.Control
                          type="time"
                          onChange={(e) => setClosingTime(e.target.value)}
                          placeholder="Enter Closing Time"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          id="pass1"
                          onChange={(e) => setpassword(e.target.value)}
                          placeholder="Enter Password"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                          type="password"
                          id="pass2"
                          onChange={(e) => setcpassword(e.target.value)}
                          placeholder="Enter Confirm Password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
                <Button
                  id="emnei"
                  variant="primary"
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <br />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterRestaurents;
