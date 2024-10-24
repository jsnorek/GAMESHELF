# GAMESHELF

## One Sentence Pitch:
Discover, track, and share your gaming journey with a community of passionate gamers.


## Core Functionality:
 A platform where users can browse games and catalog their game collections, rate and review games, and create custom lists (e.g., “Favorites,” “Wishlist,” “Currently Playing”).


This project will be built with the PERN stack.

User will be able to browse games and upon login can search through games, adding them to their lists of favorites, write and view game reviews, view their “shelf” of games pulled from their lists, and change their basic profile information.

## Technologies
- **Frontend**: React Vite, PrimeReact
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:

## API Usage
GAMESHELF uses the RAWG to populate the video game data. You can sign up for free for an account to get an API key and view API documentation here: https://rawg.io/apidocs

An account is necessary to get an API key and run this app.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- **Node.js** [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Installation
Follow these steps to run the app locally:
1. **Clone the repository**:
    ```bash
    git clone git@github.com:jsnorek/GAMESHELF.git
    ```
2. To clean your folder from the owner's git, run the command `rm -rf .git` inside the folder <NAMENEWDIRECTORY>. Then re-initialize as the owner with `git init`.
3. **Install dependencies**:
    Navigate to both the server and client directories and install dependencies:
    ```bash
    # In the server directory 
    cd server
    npm install
    
    # In the client directory
    cd client
    npm install
    ```
4. To setup the database:
* In a different terminal window go to the psql terminal with the comand `psql` and create a newdatabase with `createdb gameshelf`
* Use the provided db.sql file to set up your database schema with the command `psql -d blogs -f path/to/db.sql`
* Inside your server directory create a `.env` file and copy there the values that are in `.envexample` making sure to change them to your own information. Be sure to update the OPENAI_API_KEY in this file to your API key.

## Running the App
To run the program in your localhost browser, navigate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.
Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8080`.

## Timeline

[Trello Board] (https://trello.com/b/f2VPN0c5/final-project)

[Final Pitch] (https://docs.google.com/document/d/1xMmtRzRhjoH2pkkFkWiGTJZL1-cVEZhOD7-FdGdTioU/edit?tab=t.0)

## Contributing
If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals
- AI-based game recommendations
- Multiple lists to add games to (“Favorites,” “Wishlist,” “Currently Playing”)
- Can add other users as “friends” and view their profiles
- Game specific discussion boards or communities
- User authentication
- User badges/achievements
- Mobile app
