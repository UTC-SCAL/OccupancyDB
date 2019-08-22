# CUIP Dashboard

## Overview

The CUIP Dashboard is a unified, open dashboard for visualizing all data from the CUIP lab (not solely the MLK Smart Corridor Testbed data). The project within this repo fully handles authentication (<u>with permission levels</u>).

The dashboard's front-end utilizes a customized version of the [Semantic-UI Themekit](https://semantic-ui.com/). Customizations made mostly revolve around mobile compatibility, Leaflet full-screen OpenStreetMaps compatibility, and dark mode implementations for those elements in which the `inverted` class does not invert to darkness.

## Dependencies

This project's front-end is written in the standard HTML/CSS/JavaScript trio using JQuery, but is hosted via ExpressJS. Therefore, the entire application requires NodeJS and NPM to be installed on your system, as well as a MongoDB server to be available. Depending on the scale of the user-base, this MongoDB server can be run on something as low-powered as an Intel NUC.

**List of NPM dependencies:**

- `bcrypt-nodejs`
- `body-parser`
- `ejs`
- `express`
- `express-session`
- `jquery`
- `mongoose`
- `passport`
- `passport-cookie`
- `passport-local`

## Running / Deploying

After cloning the repository, you will need to install all of the packages. You can do this by `cd`ing into the unzipped directory, and then running `npm install`. You can then run the server using the `node app.js` command, but it for auto-reloading of the server when making changes we use `nodemon` - **this is highly suggested**. Install via `npm install -g nodemon` - then run using the `nodemon app.js` command. This means that every time a change is made, the server will update - this includes HTML + CSS changes (without having to log back in), and NodeJS and Vanilla JS  files (requires logging back in after changes).
