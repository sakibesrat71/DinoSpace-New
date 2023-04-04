import dinoLogo from './images/dinoLogo.png';

const handleLogoutRestaurant = () => {
    localStorage.clear();
    window.location.href = "/restaurantLogin";
  };
  const handleLogoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

const navbar = () => {
    return (
        <div className="navbar">
            <a href="/" className='home-link'><img className="dinologo" src={dinoLogo} /></a>
            <h1>DinoSpace</h1>
            <div className="links">
            <a href="/UserSignUp">Sign Up</a>
                {localStorage.getItem("usertoken") ? <a href="/" onClick={handleLogoutUser}>Sign Out</a> : <a href="/userSignin">Sign In</a>}
                {localStorage.getItem("usertoken") ? <a href="/Profile" >Profile</a> : <a href="/#">Guest</a>}
            </div>
        </div>
    );
}

export default navbar;
