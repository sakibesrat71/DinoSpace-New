import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import dinoLogo from "../auth/images/dinoLogo.png";
import bg from "../auth/images/bg9.jpg";
import "../css/table.css";
import "../css/profile.css";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";

const RestaurantProfile = () => {
  const params = useParams();
  console.log(params);
  const id = params.id;
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch(`/post/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => setInitialState(jsonResponse));
  }, []);
  console.log(initialState);

  //reservation
  const params2 = useParams();
  /// console.log(params);
  const restaurantID = params2.id;
  const [reservationName, setReserveName] = useState("");
  const [date, setReserveDate] = useState("");
  const [person, setReservePerson] = useState(1);
  const [time, setReservetime] = useState(1);
  const [option2, setReserveoption] = useState("");
  const [optionname, setReserveoptionname] = useState("");
  const [initialState3, setInitialState3] = useState([]);
  const [initialState2, setInitialState2] = useState([]);
  const timeComparison = () => {
    if (time >= initialState3.openTime && time <= initialState3.closeTime) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async () => {
    console.log("lol" + restaurantID);
    const newReserve = {
      restaurantID,
      option2,
      optionname,
      reservationName,
      date,
      person,
      reserve_status: "DONE",
      time,
    };
    console.log(newReserve);
    try {
      fetch(`/post/${restaurantID}`)
        .then((res) => {
          return res.json();
        })
        .then((jsonResponse) => setInitialState3(jsonResponse));
      //test run for time validation of reservation
      // if(timeComparison()){
      //     console.log("ok");
      // }
      // else{
      //     console.log("not ok");
      // }
      fetch(`/offer/${restaurantID}`)
        .then((res) => {
          return res.json();
        })
        .then((jsonResponse) => {
          setInitialState2(jsonResponse);
        });
      console.log("INITIALSTATE:" + initialState2);
      let remainingSits = 0;
      let seatfound = false;
      initialState2.forEach((element) => {
        if (element._id == option2) {
          console.log("we are watching" + element.remainingSits);
          remainingSits = element.remainingSits - person;
          console.log("we are watching" + remainingSits);
          if (remainingSits < 0) {
            alert("sorry, there is not enough seats available");
          } else {
            seatfound = true;
            setReserveoptionname(element.offeringName);
            console.log("we are watching offering name" + optionname);
          }
        }
      });

      if (seatfound) {
        const response = await axios.post("/reserve/", newReserve);
        console.log(response);
        const response3 = await axios.patch(`/offer/${option2}`, {
          remainingSits,
        });
      } else {
        alert("sorry, your reservation isnt processed for server issues");
      }
      //this is working but in line 57
      //it is not working as it cannot current accss remainig sit
    } catch (error) {
      console.log(error);
    }
  };
  //making options dropdown
  const [options, setOptions] = useState(null);
  useEffect(() => {
    getoptions();
  }, []);
  async function getoptions() {
    const { data } = await axios.get(`/offer/${restaurantID}`);
    const option = data.map((item) => ({
      value: item._id,
      label: item.offeringName,
    }));
    console.log("we are seening option: " + option);
    setOptions(option);
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
        <a href="/SignUp">Sign Up</a>
        <a href="/LogIn">Sign In</a>
        <a href="/Profile">Profile</a>
      </div>

      <div className="profile">
        {/* <div data-aos="zoom-in-up" className="fade"> */}
        <div className="justify-content-md-center">
        <h1 id="rname">Welcome To {initialState.name}</h1>
        {/* <Container>
            <Row> */}
        <div className="info">
          <h3>Restaurant Info</h3>
          <p id="rname">Cuisine: {initialState.cuisine}</p>
          <p id="rname">Location: {initialState.location}</p>
          <p id="rname">Rating: {initialState.rating}</p>
          <p id="rname">Menu: <a href="#"> Click here to view</a></p>
          <Link to={`/Reservation/${initialState._id}`}><Button id="res">Reserve</Button>
          </Link>
        </div>

        {/* <div id="reserve">
          <Form id="reserve">
            <h3 id="reserve">Reservation</h3>
            <Form.Group className="mb-3" controlId="reserve">
              <Form.Label id="reserve">Reservation Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setReserveName(e.target.value)}
                placeholder="Enter Opening Time"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reserve">
              <Form.Label id="reserve">Reservation Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setReserveDate(e.target.value)}
                placeholder="Enter Opening Time"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reserve">
              <Form.Label id="reserve">Total person</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setReservePerson(e.target.value)}
                placeholder="Enter Opening Time"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reserve">
              <Form.Label id="reserve">Choose option</Form.Label>
              <Select
                options={options}
                onChange={(e) => setReserveoption(e.value)}
                name="subjects"
              />
            </Form.Group>
            <Button
              id="reserve"
              variant="primary"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </div> */}
        {/* </Row>
          </Container> */}

        {/* <Carousel>
          <Carousel.Item>
            <img className="restaurant-interior" src={dine} />
          </Carousel.Item>{" "}
          <Carousel.Item>
            <img className="restaurant-interior" src={dine3} />
          </Carousel.Item>{" "}
          <Carousel.Item>
            <img className="restaurant-interior" src={dine4} />
          </Carousel.Item>
        </Carousel> */}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile; 