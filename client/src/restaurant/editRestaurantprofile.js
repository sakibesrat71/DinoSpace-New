import { Form, Button, Container, Row, Col } from "react-bootstrap";
import dinoLogo from "../auth/images/dinoLogo.png";
import bg from "../auth/images/bg9.jpg";
import "../css/profile.css";
import "../css/auth.css";
//import userIcon from "./images/dino.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import jwt from 'jsonwebtoken';

///import {Grid, paper} from '@material-ui/core';
const EditRestaurantProfile = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt.decode(token);
            console.log(decoded);
        }
        Aos.init({ duration: 1500 });

    }, []);

  const [name, setRestaurantName] = useState("");
  const [mail, setRestaurantMail] = useState("");
  const [city, setRestaurantCity] = useState("");
  const [street, setRestaurantStreet] = useState("");
  const [house, setRestaurantHouse] = useState("");
  const [location, setRestaurantLocation] = useState("");
  const [UserID, setRestaurantUserID] = useState("");
  const [currentpassword, setpassword] = useState("");
  const [newpassword, setcpassword] = useState("");
  const [cuisine, setCuisine] = useState([""]);
  const [openingTime, setOpenTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [menu, setMenu] = useState([]);

  const rating = 1;
  const correct = false;
  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    const resID = decoded.id;
    event.preventDefault();
    const user ={
        email:decoded.email,
        password:currentpassword
    }
    try {
        //CREATE BACKEND
      const response = await axios.post('/post/login', user);
      console.log(response);
      if(response.data.status=="ok" && response.data.role=="restaurant"){
        correct=true;
      }
      else if(response.data.status=="ok" && response.data.role!="restaurant"){
        alert("wrong password");
      }
      else{
        alert("wrong pass");
      }
    } catch (error) {
        console.log(error);
    }
    console.log("lol" + name);
    const address = {
      city: city,
      street: street,
      houseNumber: house,
    };
    if (true) {
      const newRestaurent = {
        name,
        address,
        cuisine,
        rating,
        location,
        UserID,
        newpassword
      };
      console.log(newRestaurent);
      try {
        const resID = decoded.id;
        const response = await axios.patch(`/post/update/${resID}`, newRestaurent);
        console.log(response); 
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
    } 
    
}
    //console.log(newRestaurent);
  

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
      <img className="bg" src={bg} />
      <a href="/" className="navlogo">
        <div data-aos="fade-right" className="fade">
          <img className="dinologo" src={dinoLogo} />
        </div>
      </a>

      <div className="links2">
      <a href="/dash">Reservation History</a>
        <a href="/setRestaurantTime">Set Time</a>
        <a href="/setRestaurantOffer">Set Offer</a>
      </div>

      <div className="profile">
        <div data-aos="zoom-in-up" className="fade">
          <div className="justify-content-md-center">
            <Form>
              <div data-aos="fade-up" className="fade">
                {/* <div className="text-center">
                  <img className="user" src={userIcon} />
                </div> */}
                <Container>
                  <div className="text-center">
                    <h1 id="edit">Update Restaurant Info</h1>
                  </div>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantName(e.target.value)}
                          placeholder="Enter Name"
                          
                        />
                      </Form.Group>
                    </Col>
                  
                    <Col>
                      <Form.Group className="mb-3" >
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
                    {/* <Col>
                      <Form.Group className="mb-3" >
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
                    </Col> */}
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" >
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
                      <Form.Group className="mb-3" >
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setRestaurantStreet(e.target.value)}
                          placeholder="Enter Street No"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" >
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
                      <Form.Group className="mb-3" >
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
                      <Form.Group
                        className="mb-3"
              
                      >
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
                <Button id="emnei" variant="primary" type="submit" value="Submit" onClick={handleSubmit}>
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

export default EditRestaurantProfile;
