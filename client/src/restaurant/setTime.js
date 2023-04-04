import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import dinoLogo from "../auth/images/dinoLogo.png";
import bg from "../auth/images/bg4.jpg";
import "../css/table.css";
import "../css/profile.css";
import jwt from "jsonwebtoken";;
const SetTime = () => {
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const handleSubmit2 = async (event) => {
    //console.log(reserveStatus);
    event.preventDefault();

    const newTime = {
      openTime: openTime,
      closeTime: closeTime,
    };
    console.log(newTime);
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    console.log(decoded);
    const resID = decoded.id;
    try {
      const response = await axios.patch(`post/${resID}`, { newTime: newTime });

      console.log(response);
      if (response.status == 200) {
        alert("Time successfully changed");
      } else {
        alert("Time not changed due to connectivity prob");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // return ( <div>
  //     <h1>Set Time</h1>
  //     <form>
  //             <label>Open Time
  //                 <input type="time" name="openTime" onChange={e => { setOpenTime(e.target.value) }} />
  //             </label>
  //             <label>Close Time
  //                 <input type="time" name="closeTime" onChange={e => { setCloseTime(e.target.value) }} />
  //             </label>
  //             <input type="submit" value="Set Open Close Time" onClick={handleSubmit2} />
  //         </form>
  // </div> );
  return (
    <div className="background">
      {/* <Navbar2 /> */}
      <img className="bg2" src={bg} />
      <a href="/" className="navlogo">
        {/* <div data-aos="fade-right" className="fade"> */}
        <img className="dinologo" src={dinoLogo} />
        {/* </div> */}
      </a>

      <div className="links2">
      <a href="/dash">Reservation History</a>
        <a href="/setRestaurantOffer">Set Offer</a>
        <a href="/editResProfile">Edit Profile</a>

        {/* <a href="/Profile">Profile</a> */}
        {/* <a href="/"onClick={handleLogout}>logout</a> */}
      </div>

      <div className="profile3">
        {/* <div data-aos="zoom-in-up" className="fade"> */}
        <div className="justify-content-md-center">
          <Form id="time">
            <h2 className="text-center">Set Time</h2>
            <Form.Group className="mb-3" >
              <Form.Label>Opening time</Form.Label>
              <Form.Control
                type="time"
                name="openTime"
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
                placeholder="Opening name"
                id="time"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Closing Time</Form.Label>
              <Form.Control
                type="time"
                name="closeTime"
                onChange={(e) => {
                  setCloseTime(e.target.value);
                }}
                placeholder="Offer Count"
                id="time"
              />
            </Form.Group>
            <Button
              id="offer"
              variant="primary"
              type="submit"
              value="Set Open Close Time"
              onClick={handleSubmit2}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SetTime;
