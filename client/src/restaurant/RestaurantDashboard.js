import { Container, Col, Row } from "react-bootstrap";
import '../css/dash.css';

const RestaurantPanel = () => {
    return (  
        <div className="restaurantDashboard">
            <Container id="main">
                <Row id="dash">
                <Col id="dash">
                <li>
                <a href="#">Reservation Requests</a>
                </li>
                <li>
                <a href="">Set Offer</a>  
                </li>
                <li>
                <a href="">Set Time</a>
                </li>
                <li>
                <a href="">Upload Menu</a>
                </li>
                </Col>
                <Col id="func">
                    <h1>hsadshiaidasdai</h1>
                </Col>
                </Row>
            </Container>
        </div>
    );
}
 
export default RestaurantPanel;