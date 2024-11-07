# GAMESHELF
![Screenshot 2024-11-05 at 4 34 07 PM](https://github.com/user-attachments/assets/57ee4750-187f-4d98-ba19-6dcaf44d2cee)

Discover, track, and share your gaming journey with a community of passionate gamers.

## Contents
- [Deployed Site](#deployed-site)
- [Core Functionality](#core-functionality)
- [Technologies](#technologies)
- [API Usage](#api-usage)
- [Prerequisites](#prerequisites)
    -  [Installation](#installation)
    - [Running the App](#running-the-app)
- [Drawing Board](#drawing-board)
- [Contributing](#contributing)
- [Stretch Goals](#stretch-goals)

## Deployed Site

[Render](https://server-g79j.onrender.com/)

## Core Functionality:
[Back to Contents](#contents)

 A platform where users can browse games and catalog their game collections, rate and review games, and create a custom favorites list.


This project is built with the PERN stack.

User are able to browse/search games, see game details and user reviews, and, upon login, can add games to their lists of favorites, write and delete their game reviews, view their “shelf” of games pulled from their favorites list, and view/change their basic profile information.

![ezgif com-optimize (3)](https://github.com/user-attachments/assets/00a710fd-dd72-4519-bcfe-9943fcc1ee7e)

## Technologies
[Back to Contents](#contents)

- **Frontend**: React Vite, PrimeReact
- **Backend**: Node.js, Express
- **Database**: PostgresSQL
- **Testing**: Vitest, React Testing Library (RTL), Jest

#### Once you have successfully setup this template and initial database, the view will look like this:
![Screenshot 2024-11-05 at 4 36 53 PM](https://github.com/user-attachments/assets/dc795788-8857-4dc1-af90-0ac85680e533)

## API Usage
[Back to Contents](#contents)

GAMESHELF uses the RAWG to populate the video game data. You can sign up for free for an account to get an API key and view API documentation here: https://rawg.io/apidocs

An account is necessary to get an API key and run this app.

## Prerequisites
[Back to Contents](#contents)

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Installation
[Back to Contents](#contents)

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
[Back to Contents](#contents)

To run the program in your localhost browser, navigate to your server folder (`cd server`) and run the command `node server.js` to run your server. 
The client should now be running on `http://localhost:5173`.
Then navigate to your client folder (`cd client`) and run the command `npm run dev` and click on the link to view the application in browser.
The server should now be running on `http://localhost:8080`.

## Drawing Board
[Back to Contents](#contents)

[Trello Board](https://trello.com/b/f2VPN0c5/final-project)
<img width="1150" alt="Screenshot 2024-11-05 at 4 42 17 PM" src="https://github.com/user-attachments/assets/a4f5cdf0-e34a-47fb-bb62-104f14292882">

[Final Pitch](https://docs.google.com/document/d/1xMmtRzRhjoH2pkkFkWiGTJZL1-cVEZhOD7-FdGdTioU/edit?tab=t.0)

## Contributing
[Back to Contents](#contents)

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.

## Stretch Goals
[Back to Contents](#contents)

- AI-based game recommendations
- Multiple lists to add games to (“Favorites,” “Wishlist,” “Currently Playing”)
- Can add other users as “friends” and view their profiles
- Game specific discussion boards or communities
- User authentication
- User badges/achievements
- Mobile app
