import React, { useState } from "react";
import GetUserInfo from "../component/Utility/GetUser";

const Profile = () => {
    const [user, setUser] = useState();
    const userid = window.localStorage.getItem("user_id");
    GetUserInfo(userid, setUser)
    return (
        <>
            {user ? (
                <h1 className='text-danger'>Hello {user.userName}</h1>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    )
};

export default Profile;