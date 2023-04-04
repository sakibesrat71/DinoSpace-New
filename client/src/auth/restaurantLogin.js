import { Form, Button, Container, Row, Col } from "react-bootstrap";
import dinoLogo from "./images/dinoLogo.png";
import "../css/profile.css";
import "../css/auth.css";
import userIcon from "./images/dino.jpg";
import img3 from "./images/bg5.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

// import React from 'react';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// // import dinoLogo from './images/dinoLogo.png';
// // import bg from './images/user.jpg';
// import { Table } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import "../css/table.css";

// const RestaurantLogIn = () => {
//     const [email, setEmail] = useState("");
//     const [password, setpass] = useState("");
//     const handleSubmit= async (event)=>{

//         event.preventDefault();
//         const user ={
//             email,
//             password
//         }

//         try {
//             //CREATE BACKEND
//           const response = await axios.post('/post/login', user);
//           console.log(response);
//           if(response.data.status=="ok" && response.data.role=="restaurant"){
//             alert("login successful");
//             localStorage.setItem('token', response.data.user);
//            window.location.href = "/dash";
//           }
//           else if(response.data.status=="ok" && response.data.role!="restaurant"){
//             alert("wrong password");
//           }
//           else{
//             alert("user does not exist");
//           }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <div>
//             <form>
//                 <label>Email: <input type="email" onChange={e=>setEmail(e.target.value)}/></label>

//                 <label>Pass: <input type="password" onChange={e=>setpass(e.target.value)}/></label>
//                 <input type="submit" value="Submit" onClick={handleSubmit} />

//             </form>
//         </div>
//      );
// }
const RestaurantLogIn = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setpass] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      //CREATE BACKEND
      const response = await axios.post("/post/login", user);
      console.log(response);
      if (response.data.status == "ok" && response.data.role == "restaurant") {
        alert("login successful");
        localStorage.setItem("token", response.data.user);
        window.location.href = "/dash";
      } else if (
        response.data.status == "ok" &&
        response.data.role != "restaurant"
      ) {
        alert("wrong password");
      } else {
        alert("user does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <a href="/UserSignUp">Sign Up</a>
        <a href="/UserSignIn">Sign In</a>
        <a href="/Profile">Profile</a>
      </div>

      <div className="profile2">
        <div data-aos="zoom-in-up" className="fade">
          <div className="justify-content-md-center">
            <Form>
              <div data-aos="fade-up" className="fade">
                <div className="text-center">
                  <img className="user" src={userIcon} />
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    name="email"
                    id="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    onChange={(e) => setpass(e.target.value)}
                    placeholder="Password"
                    name="pass"
                    id="pass"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group> */}
                <div className="mb-3">
                  <a href="#">
                    <p className="hudai">Forgot password?</p>
                  </a>
                </div>
                <Button
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                  variant="primary"
                >
                  Submit
                </Button>
                <br />
                {/* <p className="emnei">Or sign in using</p> */}
                {/* <i class="bi bi-facebook"></i> */}
                {/* <a href="http://localhost:3000/auth/facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a> */}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantLogIn;
