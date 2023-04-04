import { Table } from "react-bootstrap";
import "../css/table.css"
import dinoLogo from './images/dinoLogo.png';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";
import bg from "./images/user.jpg"
import { Link } from 'react-router-dom';
const jwt = require('jsonwebtoken');

const ReservationHistory = () => {
    useEffect(() => {
        Aos.init({ duration: 1500 });
        getTable();
    }, []);
    const [reservation, setReservation] = useState([]);
    const getTable = async () => {
        const token = localStorage.getItem("usertoken");
        const decoded = jwt.decode(token);
        const userID = decoded.id;
        console.log(userID);
        axios.get(`/offer/userreserve/${userID}`)
          .then((res) => {
            console.log(res.data);
            setReservation(res.data);
          })
        
          
      };
    return (
        <div className="history">
            {/* <Navbar2 /> */}
            <img className="bg" src={bg} />
            <a href="/" className='navlogo'>
                <div data-aos="fade-right" className="fade">
                    <img className="dinologo" src={dinoLogo} />
                </div>
            </a>
            
            <div className="links2">
                <a href="/SignUp">Sign Up</a>
                <a href="/Profile">Profile</a>
            </div>
            <div className="profile">
        {/* <div data-aos="zoom-in-up" className="fade"> */}
        <div className="justify-content-md-center">
            <div className="table">
            <h2 className="text-center">Reservation History</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Reservation Name</th>
                        <th>CURRENT STATUS</th>
                        <th>Reservation Person</th>
                        <th>Restaurant Details</th>
                    </tr>
                </thead>
                <tbody>
                    {reservation.map((reservation) => (

                    <tr>
                        <td>{reservation.reservationName} </td>
                        <td>{reservation.reserve_status}</td>
                        <td>{reservation.person}</td>
                        <td><Link to={`/restaurantProfile/${reservation.restaurantID}`}>View Details</Link></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            </div>
            </div>
        </div>
    );
}

export default ReservationHistory;