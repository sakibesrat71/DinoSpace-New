import GoogleLogin from "react-google-login";

const clientID = '357684101172-mpk3rivibeg6plt1go396fiapd55e7cl.apps.googleusercontent.com'


function Login()
{

    const onSuccess = (res) => {
        console.log("Login Successful! Current User: ", res.profileObj);
        localStorage.setItem('token2', res.profileObj);
        alert('Login Successful');
        window.location.href = '/';
    }

    const onFailure = (res) => {
        console.log("Login Failed! res:", res);
        alert('Login Failed');
        window.location.href = '/';
    }

    return(
        <div id = "signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login