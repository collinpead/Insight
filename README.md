# Insight

This website compiles live player counts from the game distribution platform [Steam](https://store.steampowered.com/charts/mostplayed) and live viewer counts from the streaming website [Twitch](https://www.twitch.tv/). These numbers are displayed and compared in order to help analyze the correlation between the popularity of certain games with their total viewership on livestreaming platforms.

## Home Page

![Screenshot](./img/home_page.png)

## Game Page

![Screenshot](./img/game_page.png)

## Notes on Excluded Files

In order to make requests from the database, queries.js requires a .env file with values for DB_HOST, DATABASE, DB_USER, DB_PASS, and DB_PORT.

## Available Scripts

In the project directory, you can run:

### `npm run start-server`

Runs the app's Node.js web server to interact with the postgresql backend.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `docker-compose build`

Builds the app and server for containerized deployment.

### `docker-compose up`

Runs the app and server in containers in production mode.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.