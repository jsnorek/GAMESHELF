// MyShelf component is responsible for rendering the user's "My Shelf" page, 
// which displays a list of the user's favorite games with their details (e.g., name, Metacritic rating, and image).
// It uses the `fullLoggedInUserData` prop to retrieve the user's favorite games and fetches game details for each game from the server.

import { useEffect, useState } from "react";
import axios from "axios";

function MyShelf({ fullLoggedInUserData }) {
    // State to hold the details of the favorite games once they are fetched
    const [favoriteGamesWithDetails, setFavoriteGamesWithDetails] = useState([]);

    // Extracts the first user object from the fullLoggedInUserData array (if present)
    const userData = fullLoggedInUserData && fullLoggedInUserData.length > 0 ? fullLoggedInUserData[0] : null;

    // useEffect hook is used to fetch details for each favorite game once the user data is available
    useEffect(() => {
        const fetchFavoriteGameDetails = async () => {
            // Ensure user has favorite games to fetch
            if (userData && userData.favorites.length > 0) {
                try {
                    // Fetch game details for each favorite game using axios
                    const favoriteDetails = await Promise.all(
                        userData.favorites.map(async (favorite) => {
                            const response = await axios.get(`http://localhost:8080/game/${favorite.game_id}`);
                            return response.data;
                        })
                    );
                    // Update state with the fetched game details
                    setFavoriteGamesWithDetails(favoriteDetails);
                } catch (error) {
                    console.error('Error fetching favorite game details', error);
                }
            }
        };
        fetchFavoriteGameDetails();
    }, [userData]); // Dependency array includes userData to refetch data when it changes

    // Debugging log to view fetched game details in console
    console.log('these are the favorite games with details',favoriteGamesWithDetails);

    // return (
    //     <div>
    //         <p>This is your MyShelf page</p>
    //         {userData && userData.favorites.length > 0 ? (
    //             <div className="user-favorites-list">
    //                 <ul>
    //                     {userData.favorites.map((favorite, index) => (
    //                         <>
    //                             <li key={index}>
    //                                 <p>Game Id: {favorite.game_id}</p>
    //                             </li>
    //                         </>
    //                     ))}
    //                 </ul>
    //             </div>
    //         ) : (
    //             <div className="user-favorites-list">
    //                 <p>No favorites available</p>
    //             </div>
    //         )
    //         }
    //     </div>
    // )
    return (
        <div>
            <p>This is your MyShelf page</p>
            {favoriteGamesWithDetails.length > 0 ? (
                <div className="user-favorites-list">
                    <ul>
                        {favoriteGamesWithDetails.map((favorite, index) => (
                            <li key={index}>
                                <img src={favorite.background_image} alt={favorite.name} style={{ width: '200px' }}/>
                                <p>Game: {favorite.name || 'Unknown Game'}</p>
                                <p>Metacritic Rating: {favorite.metacritic}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="user-favorites-list">
                    <p>No favorites available</p>
                </div>
            )}
        </div>
    );
}
export default MyShelf;