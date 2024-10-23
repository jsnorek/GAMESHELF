import { useEffect, useState } from "react";
import axios from "axios";

// Will eventually render the MyShelf page with list of user's favorite games
function MyShelf({ fullLoggedInUserData }) {
    const [favoriteGamesWithDetails, setFavoriteGamesWithDetails] = useState([]);

    const userData = fullLoggedInUserData && fullLoggedInUserData.length > 0 ? fullLoggedInUserData[0] : null;
    
    // Fetch details for each favorite game
    useEffect(() => {
        const fetchFavoriteGameDetails = async () => {
            if (userData && userData.favorites.length > 0) {
                try {
                    const favoriteDetails = await Promise.all(
                        userData.favorites.map(async (favorite) => {
                            const response = await axios.get(`http://localhost:8080/game/${favorite.game_id}`);
                            return response.data;
                        })
                    );
                    setFavoriteGamesWithDetails(favoriteDetails);
                } catch (error) {
                    console.error('Error fetching favorite game details', error);
                }
            }
        };
        fetchFavoriteGameDetails();
    }, [userData]);

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