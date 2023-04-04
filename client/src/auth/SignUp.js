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
import LoginButton from "../components/login";
import LogoutButton from "../components/logout";

const SignUp = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords do not match");
    else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users/registration",
          {
            name,
            email,
            password,
          },
          config
        )
        .then(res => {
          console.log(res);
        });

        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        window.location.href = "/";
      } catch (error) {
        setError(error.response.data.message);
      }
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

      <div className="profile">
        <div data-aos="zoom-in-up" className="fade">
          <div className="justify-content-md-center">
            <Form onSubmit={submitHandler}>
              <div data-aos="fade-up" className="fade">
                <div className="text-center">
                  <img className="user" src={userIcon} />
                </div>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="pass"
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    name="rpass"
                    id="rpass"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="mb-3">
                  <a href="#">
                    <p className="hudai">Forgot password?</p>
                  </a>
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <p className="emnei">Or sign in using</p>
                {/* <i class="bi bi-facebook"></i> */}
                <div className="other">
                  {/* <a id="other" href="http://localhost:3000/auth/facebook">
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

                  <a id="other" href="">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg> */}
                    <LoginButton />
                  </a>
                  {/* <a href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-microsoft"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
                    </svg>
                  </a> */}
                </div>
                {/* <div className="App">
                  
                  <div className="google">
                  <LoginButton />
                  </div>
                  <LogoutButton />
                </div> */}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

    //     <Container>
    //         <Row>
    //             <Navbar/>
    //         </Row>
    //         <Row>
    //             <Col md={6} sm={12}>
    //                 <div data-aos="fade-right" className="fade">
    //                     <div className="left">
    //                         <img className="bg" src={img} />
    //                     </div>
    //                 </div>
    //             </Col>
    //             <Col md={6} sm={12}>

    //             </Col>
    //         </Row>
    //     </Container>
  );
};

export default SignUp;
