import './css/index.css';
import Home from './FrontPage/Home';
import LogIn from './auth/LogIn';
import UserSignIn from './auth/UserSignIn';
import UserSignUp from './auth/UserSignUp';
import Profile from './auth/Profile';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './auth/SignUpcopy';
import Restaurant from './restaurant/Restaurant';
import RegisterRestaurents from './auth/SignupRestaurant.js';
import Reserve from './reservation/Reserve';
import RestaurantDash from './restaurant/restaurantDash'; 
import Reservation from './restaurant/Reservation'; 
import LoginRestaurents from './auth/restaurantLogin';
import Userhistory from './auth/ReservationHistory';

import SetTime from './restaurant/setTime'; 
import SetOffer from './restaurant/setOffer';
import RestaurantProfile from './restaurant/RestaurantProfile'; 
import RestaurantDashboard from './restaurant/RestaurantDashboard.js';
import EditRestaurantProfile from './restaurant/editRestaurantprofile';
import Search from './FrontPage/search';
import UploadMenu from './restaurant/uploadMenu';
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/UserSignIn">
          <UserSignIn />
        </Route>
        <Route path="/UserSignUp">
          <UserSignUp />
        </Route>
        <Route path="/restaurantLogin">
          <LoginRestaurents />
        </Route>
        <Route path="/LogIn">
          <LogIn />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/restaurant/:id">
          <Restaurant />
        </Route>
        <Route path="/SignUpAsRestaurant">
          <RegisterRestaurents />
        </Route>
        <Route path="/reservation/:id">
          <Reserve />
        </Route>
        <Route path="/dash">
          <RestaurantDash />
        </Route>
        <Route path="/restaurantProfile/:id">
          <RestaurantProfile />
        </Route>
        <Route path="/restaurantPanel">
          <RestaurantDashboard />
        </Route>
        <Route path="/setRestaurantTime">
          <SetTime />
        </Route>
        <Route path="/setRestaurantOffer">
          <SetOffer />
        </Route>
        <Route path="/menuUpload">
          <UploadMenu /> 
        </Route>
        <Route path="/editResProfile">
          <EditRestaurantProfile />
        </Route>
        {/* <Route path="/reservation/:id">
          <Reservation />
        </Route> */}
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/userhistory">
          <Userhistory />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
