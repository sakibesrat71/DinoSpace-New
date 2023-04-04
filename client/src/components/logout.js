import GoogleLogout from "react-google-login";

const clientID = '357684101172-mpk3rivibeg6plt1go396fiapd55e7cl.apps.googleusercontent.com'


function Logout()
{

    const onSuccess = (res) => {
        console.log("Logout Successful! Current User: ", res.profileObj);
    }

    return(
        <div id = "signOutButton">
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;