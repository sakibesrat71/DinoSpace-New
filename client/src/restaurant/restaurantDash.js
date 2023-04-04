import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import dinoLogo from "../auth/images/dinoLogo.png";
import bg from "../auth/images/bg4.jpg";
import "../css/table.css";
import "../css/profile.css";
import jwt from "jsonwebtoken";
import "../css/table.css";
const RestaurantDash = () => {
  const [initialState, setInitialState] = useState([]);
  const [initialState2, setInitialState2] = useState([]);
  const [initialState3, setInitialState3] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [offeringName, setOfferName] = useState("");
  const [offeringCount, setOfferCount] = useState();

  //const [reserveStatus, setInitialStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      console.log(decoded);
      getTable();
      getOffer();
    }
  }, []);
  const getTable = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const resID = decoded.id;
    fetch(`/reserve/${resID}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => setInitialState(jsonResponse));
  };
  const getOffer = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const resID = decoded.id;
    fetch(`/offer/${resID}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => setInitialState2(jsonResponse));
  };

  const handleSubmit = async (reserveID, reserveStatus,option2,person) => {
    console.log(reserveStatus);
    console.log(option2);
    try {
      const response = await axios.patch(`reserve/${reserveID}`, {
        reserveStatus: reserveStatus,
      });
      if(reserveStatus=="REJECT"){
          const response3 = await axios.get(`offer/singleoffer/${option2}`);
          const prevSitCount2 = response3.data[0].remainingSits;
          console.log(prevSitCount2);
          const newsits=prevSitCount2+person; 
          const response2 = await axios.patch(`offer/sitrestuponrejection/${option2}`, {
          newsits: newsits,
        });
      console.log(response2);
      }
      console.log(response);
     // window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
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
    const resID = decoded.id;
    try {
      const response = await axios.patch(`post/${resID}`, { newTime: newTime });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit3 = async (event) => {
    //console.log(reserveStatus);
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const resName = decoded.name;
    const resID = decoded.id;
    const newOffering = {
      restaurantID: resID,
      restaurantName: resName,
      offeringName: offeringName,
      offeringCount: offeringCount,
      remainingSits: offeringCount,
    };
    console.log(newOffering);

    try {
      const response = await axios.post("reserve/sits", newOffering);

      console.log(response);
      if ((response.status = 200)) {
        alert("Offering Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/restaurantLogin";
  };
  const handleSubmit4 = async (optionID, prevSitCount) => {
    console.log(prevSitCount);
    try {
      const response = await axios.patch(`offer/sitreset/${optionID}`, {
        prevSitCount: prevSitCount,
      });
      console.log(response);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* <div className="links2">
            <a href="/Signup">sign Up</a>
            <button onClick={handleLogout}> logout </button>
        </div> */
  }
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
        <a href="/setRestaurantTime">Set Time</a>
        <a href="/setRestaurantOffer">Set Offer</a>
        <a href="/editResProfile">Edit Profile</a>

        {/* <a href="/Profile">Profile</a> */}
        <a href="/"onClick={handleLogout}>logout</a>
      </div>

      <div className="profile5">
        {/* <div data-aos="zoom-in-up" className="fade"> */}
        <div className="justify-content-md-center">
          <div className="table">
            <h2 className="gg">Reservation History</h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Reservation name</th>
                  <th>Reservation date</th>
                  <th>Person Count</th>
                  <th>Offering Enrolled</th>
                  <th>Status Button</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {initialState.map((post) => (
                  <tr key={post._id}>
                    <td> {post.reservationName} </td>
                    <td> {post.date.split("T")[0]}</td>
                    <td> {post.person} </td>
                    <td> {post.optionname} </td>
                    <td>
                      <button
                        onClick={() => {
                          // setInitialStatus("DONE");
                          handleSubmit(post._id, "DONE");
                        }}
                      >
                        Accept
                      </button>
                      <button
                        value="REJECT"
                        onClick={(e) => {
                          //setInitialStatus(e.target.value);
                          handleSubmit(post._id, "REJECT", post.option2, post.person);
                        }}
                      >
                        Reject
                      </button>
                    </td>
                    <td> {post.reserve_status} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDash;
