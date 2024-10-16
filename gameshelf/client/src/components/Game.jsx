import { useEffect, useState } from 'react'
import { DeferredContent } from 'primereact/deferredcontent';    

function Game({ gameData }) {

    const renderGame = (game) => {
        return (
          <div key={game.id} className='game'>
            <img src={game.background_image} alt={game.name} style={{ width: '200px'}} />
            <h3>{game.name}</h3>
            <p>Metacritic Rating: {game.metacritic}</p>
          </div>
        );
      };

      const onGameLoad = () => {
        console.log('Games list is loaded');
      };
      console.log('game data:', gameData);

    return(
        <div className='game-data'>
        {gameData && gameData.results ? (
          <>
          <h2>Games</h2>
          {/* <p>{gameData.results[0].name}</p> */}
            <DeferredContent onLoad={onGameLoad}>
              <div className='game-list'>
                {gameData.results.map((game) => renderGame(game))}
              </div>
            </DeferredContent>
          </>
        ) : (
          <p>Loading games...</p>
        )}  
      </div>
    )
}

export default Game;