# Google OAuth 2.0 Playground

A simple application utilizing the npm google-auth-library to create/login a user and refresh access tokens.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

The main purpose of this project is to leverage the Google OAuth 2.0 system to create, refresh and verify tokens.
These tokens are fetched from the Google servers via API calls and then encapsulated in our own JWT which is then stored on the client.
Simple UI functionality has been added to test users access and refresh tokens.
Console logging on the client has been used to show success and failure, please note this in case of using this package in production env.

## Features

- **Login with Google:** Login to the application using a Google account, please note that this account will need to be added as a test account.
- **Check JWT token:** Fetches the _accessToken_ from localStorage and sends to API to be verified. Client side console logs will indicate success or failure.
- **Refresh Google access token:** Fetches the 'accessToken' from localStorage and sends to API to be verified. Once verified and decoded, the Google refresh token is extracted from the payload to then be sent to Google API for new tokens. If refresh token in valid and access from user has not been revoked, this API will receive the refreshed tokens. These tokens are then encapsulated in a JWT again and sent to front end to replace existing client side localStorage JWT. If this process fails, user will be logged out and all localStorage cleared.
- **Logout:** Clear all localStorage and UI state.
- **Logged in:** Show the state of React useState hook which is tracks the status of users authentication.
- **Welcome, user!:** Show the given name extracted from Google API call.

## Getting Started

1. Clone Github repository:
    ```bash
    git clone https://github.com/Cmbrlnd/google-oauth-playground.git
    ```

2. Install server dependencies
    ```bash
    cd server
    npm i
    ```

3. Install client dependencies
    ```bash
    cd client
    npm i
    ```

4. Setup environment variables for server:
    a. Create _.env_ file in the server directory.  
    b. Copy the data from _.env-sample_ and paste into the _.env_ file.  
    c. Replace the placeholder values with your values.  

    _Note:_ You will need to register an application @ [Google Cloud Console](https://console.cloud.google.com/) to retrieve your CLIENT_ID and CLIENT_SECRET.

5. Run server
    ```bash
    cd server
    npm run dev
    ```

6. Run client
    ```bash
    cd client
    npm run dev
    ```

7. Visit the local http endpoint shown in the client console.

**Happy testing!** :smile:

## Usage

- Login to application using a Google test account (this will need to be set in your registered application in [Google Cloud Console](https://console.cloud.google.com/))
- Click on the Check JWT Token button and watch the client console, this button utilizes a middleware function to check that the user is authenticated.
    - If JWT is verified successfully you will see a _successMsg_ in console.
    - If JWT is not verified successfully you will see an _error_ in console.
    - You can force an error by modifying the _accessToken_ stored in _localStorage_, you can do this in the _Application_ tab.
- Click on the _Refresh Google access token_ button and watch the client console, this button refreshes the Google access token
    - If the Google access token is verified successfully you will see a _success_ message in the console.
    - If the Google access token is not verified successfully you will see an _error_ in the console.
    - You can force an error on the refresh button in 2 ways.
        1. Tamper with the _accessToken_ stored in _localStorage_.
        2. Visit [Google Account](https://myaccount.google.com/) and login with the test account your are using to login to the application, navigate to the Third-party apps and service section. Select your registered application used in this application and delete the access to the application.

## License

This project is licensed under the MIT License.

MIT License
-----------

Copyright (c) 2023 Jesse Cumberland

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

I would like to express my gratitude to the following:

- **Google OAuth 2.0 API:** We would like to thank Google for providing the powerful authentication and authorization services that enable our application's seamless integration with Google services.

- **google-auth-library:** We acknowledge the creators and maintainers of the google-auth-library, a crucial component of our project. This package simplified user login, retrieval of access tokens and refreshing of those tokens.

Your contributions to the open-source community are greatly appreciated.

[Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

[google-auth-library](https://www.npmjs.com/package/google-auth-library)