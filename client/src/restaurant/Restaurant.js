import { Col, Container, Row, Card, Button, Carousel, Form } from "react-bootstrap";
import Navbar from "../FrontPage/navbar"
import Nav_info from "./Nav"
import '../css/restaurant.css';
import dine from './images/dine.jpg'
import dine4 from './images/dine4.jpg'
import dine3 from './images/dine3.jpg'
import Star from '../components/StarRating'
//import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

const Restaurant = () => {
    const params = useParams();
    console.log(params);
    const id=params.id;
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        fetch(`/post/${id}`).then(res => {
            return res.json();
        }).then(jsonResponse => setInitialState(jsonResponse));
    }, []);
    console.log(initialState);
    return (<div className="restaurant">
        <div data-aos="fade-right" className="fade">
            <Navbar/>
            <div className="overview" id="overview">
                    <h1>{initialState.name}</h1>
                    <h3>{initialState.name}</h3>
                    <div className="address">
                    
                <Carousel>
                    <Carousel.Item>
                         

                    </Carousel.Item>    
                </Carousel>
            
                    </div>
                    
            </div> 
            
            
        </div>
        <Link to={`/reservation/${initialState._id}`}>Reservation</Link>
hello 
      <h1>{initialState.name}</h1>
      <h2>{initialState.cuisine}</h2>
        <h3>{initialState.location}</h3>
        <h4>{initialState.rating}</h4>
        


    </div>);
}

export default Restaurant;