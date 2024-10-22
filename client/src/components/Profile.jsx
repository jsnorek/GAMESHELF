// Will eventually render the Profile page with list of user's information from the database

function Profile({ fullLoggedInUserData }) {

    return (
        <div>
            <h1>Hello, {fullLoggedInUserData[0].name}</h1>
            <p>Username: {fullLoggedInUserData[0].username}</p>
            <p>Email: {fullLoggedInUserData[0].email}</p>
        </div>
    )
}

export default Profile;