import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {  Form, Button, Table } from "react-bootstrap";
import dinoLogo from "../auth/images/dinoLogo.png";
import bg from "../auth/images/bg4.jpg";
import "../css/table.css";
import "../css/profile.css";
import jwt from "jsonwebtoken";
import "../css/table.css";
const SetOffer = () => {
  const [offeringName, setOfferName] = useState("");
  const [offeringCount, setOfferCount] = useState();
  const [initialState2, setInitialState2] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      console.log(decoded);
      getOffer();
    }
  }, []);
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

    try {
      const response = await axios.post("reserve/sits", newOffering);

      console.log(response);
      if ((response.status = 200)) {
        alert("Offering Added Successfully");
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit4 = async (optionID, prevSitCount) => {
    console.log(prevSitCount);
    try {
      const response = await axios.patch(`offer/sitreset/${optionID}`, {
        prevSitCount: prevSitCount,
      });
      const response2 = await axios.delete(`offer/reservedel/${optionID}`);
      console.log(response);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };
  //     return (
  //     <div>
  //     <h1>Set Offer</h1>
  //     <form>
  //                 <label>Offering name
  //                     <input type="text" name="offeringName" onChange={e => { setOfferName(e.target.value) }} />
  //                 </label>
  //                 <label>Sit count
  //                     <input type="number" name="offeringCount" onChange={e => { setOfferCount(e.target.value) }} />
  //                 </label>
  //                 <input type="submit" value="Add offerings" onClick={handleSubmit3} />
  //             </form>

  //     <div className="table">
  //             <h1 className="text-center">Your Offering List</h1>
  //             <Table striped bordered hover variant="dark">
  //             <thead>
  //         <tr>
  //             <th>Offering Name</th>
  //             <th>Sit Count</th>
  //             <th>Remaining sits</th>
  //             <th> RESET????</th>
  //         </tr>
  //         </thead>
  //         <tbody>
  //         {initialState2.map(post =>
  //             <tr key={post._id}><td> {post.offeringName} </td>
  //                 <td> {post.offeringCount} </td>
  //                 <td> {post.remainingSits} </td>
  //                 <td> <button onClick={() => {
  //                         //setInitialStatus(e.target.value);
  //                         handleSubmit4(post._id, post.offeringCount);
  //                     }}> RESET </button>
  //                 </td>
  //             </tr>
  //         )}
  //         </tbody>
  //     </Table>
  // </div>
  // </div>

  //      );

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
        <a href="/dash">Reservation History</a>
        <a href="/editResProfile">Edit Profile</a>

        {/* <a href="/Profile">Profile</a> */}
        {/* <a href="/"onClick={handleLogout}>logout</a> */}
      </div>

      <div className="profile3">
        {/* <div data-aos="zoom-in-up" className="fade"> */}
          <div className="justify-content-md-center">
            

            <Form id="offer">
            <h2 className="text-center">Set Offers</h2>
              <Form.Group className="mb-3" controlId="offer">
                <Form.Label id="offer">Offering Name</Form.Label>
                <Form.Control
                  type="text"
                  name="offeringName"
                  onChange={(e) => {
                    setOfferName(e.target.value);
                  }}
                  placeholder="Offering name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="offer">
                <Form.Label id="offer">Offering Count</Form.Label>
                <Form.Control
                  type="number"
                  name="offeringCount"
                  onChange={(e) => {
                    setOfferCount(e.target.value);
                  }}
                  placeholder="Offer Count"
                />
              </Form.Group>
              <Button
                id="offer"
                variant="primary"
                type="submit"
                value="Add offerings"
                onClick={handleSubmit3}
              >
                Add offerings
              </Button>
            </Form>
          </div>
          <br />
          <div className="table">
            <h2 className="text-center">Your Offering List</h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Offering Name</th>
                  <th>Sit Count</th>
                  <th>Remaining sits</th>
                  <th> RESET</th>
                </tr>
              </thead>
              <tbody>
                {initialState2.map((post) => (
                  <tr key={post._id}>
                    <td> {post.offeringName} </td>
                    <td> {post.offeringCount} </td>
                    <td> {post.remainingSits} </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => {
                          //setInitialStatus(e.target.value);
                          handleSubmit4(post._id, post.offeringCount);
                        }}
                      >
                        {" "}
                        RESET{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default SetOffer;
