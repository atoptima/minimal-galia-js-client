# Minimal Galia Client in Javascript

This is a minimal implementation of a client written in Javascript for Galia.

It is intended to showcase how one can receive the results from async optimizations
sent to Galia.

It implements both the webhook and the websocket interfaces.

## How to run:

1. Make sure you have `nodejs` installed on your machine: https://nodejs.org/en/download/
2. Make sure you have `yarn` installed on your machine: https://classic.yarnpkg.com/en/docs/install
3. Edit the `.env` file with the correct values for your specific environment
    - `GALIA_HOST`: Galia host
    - `GALIA_PORT`: Galia port
    - `MY_HOST`: Host of this (client) application
    - `MY_PORT`: Port of this (client) application
    - `APPLICATION_ID`: Identifier of the Galia application you want to access
    - `ACCESS_TOKEN`: Bearer access token (get this by loging in to Galia)
4. Go to root folder of the Minimal Client
5. Install the dependencies: `yarn install`
6. Launch the server: `node index.js`
