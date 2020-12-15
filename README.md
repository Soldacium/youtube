# Youtube

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

Simple app to save your favourite videos for later with help of localStorage;


## After download
Run `npm install` to install all necessary packages for this project, and sole any possible vulnerabilities.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Connecting to backend

Go to `backend` folder, make new file named `keys.js` and insert following template:
```
let youtubeKeys = {
    apiKey: "api_key",
}

let vimeoKeys = {
    clientID: "client_id",
    clientSecret: "client_secret",
    accessToken: "access_token"
}

module.exports =  {youtubeKeys, vimeoKeys}
```
then provide your API keys in order to run the app.

Alternatively, you can go straight to `backend/routes` and insert your api key for Youtube API v3 and clientID/client_secret/access_token for Vimeo API in place of `keys.*.*`. 

Backend uses node.js and express.

After providing those, run `npm run startServer` in console to access all app features.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.