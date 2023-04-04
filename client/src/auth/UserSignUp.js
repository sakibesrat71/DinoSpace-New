import bg from "./images/user.jpg";
import user from "./images/user.png";
import "../css/userType.css";
import restaurantImage from "./images/restaurant.png";
import dinoLogo from "./images/dinoLogo.png";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const UserSignUp = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div className="userSignUp">
      <div className="bgImg">
        <img className="bgIMG" src={bg} />
      </div>
      <a href="/" className="navlogo">
        <img className="dinologo" src={dinoLogo} />
      </a>

      <div className="links2">
        <a href="/UserSignUp">Sign Up</a>
        <a href="/UserSignIn">Sign In</a>
        <a href="/Profile">Profile</a>
      </div>
      <div className="iconElements">
        <a href="/SignUpAsRestaurant">
          {/* <div data-aos="fade-up" className="fade"> */}
          <button className="iconR">Restaurant</button>
          {/* </div> */}
        </a>
        <a href="/SignUp">
          {/* <div data-aos="fade-up" className="fade"> */}
          <button className="iconU">Diner</button>
          {/* </div> */}
          {/* <img className="iconU" src={user}/> */}
        </a>
      </div>
    </div>
  );
};

export default UserSignUp;
