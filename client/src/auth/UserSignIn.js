import bg from "./images/user.jpg";
import user from "./images/user.png";
import "../css/userType.css";
import restaurantImage from "./images/restaurant.png";
import dinoLogo from "./images/dinoLogo.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const UserSignIn = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div className="userSignIn">
      <div className="bgImg">
        <img className="bgIMG" src={bg} />
      </div>
      <a href="/" className="navlogo">
        <img className="dinologo" src={dinoLogo} />
      </a>

      {/* <div className="links2">
        <a href="/UserSignUp">Sign Up</a>
        <a href="/UserSignIn">Sign In</a>
        <a href="/Profile">Profile</a>
        <a href="/Profile">Logout</a>
      </div> */}

      <div className="iconElements">
        <a href="/restaurantLogin">
          {/* <img className="iconR" src={restaurantImage}/> */}
          {/* <div data-aos="fade-up" className="fade"> */}

          <button variant="primary" size="lg" className="iconR">
            Restaurant
          </button>
          {/* </div> */}
        </a>
        <a href="/LogIn">
          {/* <div data-aos="fade-up" className="fade"> */}

          {/* <img className="iconU" src={user}/> */}
          <button variant="primary" size="lg" className="iconU">
            User
          </button>
          {/* </div> */}
        </a>
      </div>
    </div>
  );
};

export default UserSignIn;
