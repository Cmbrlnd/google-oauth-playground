# Google OAuth 2.0 Playground

A simple application utilizing the npm google-auth-library to create/login a user & refresh access tokens.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

The main purpose of this project is to leverage the Google OAuth 2.0 system to create, refresh and verify tokens.
These tokens are fetched from the Google servers via API calls & then encapsulated in our own JWT which is then stored on the client.
Simple UI functionality has been added to test users access and refresh tokens.
Console logging on the client has been used to show success and failure, please note this in case of using this package in production env.

## Features

List the key features of your project. This section should provide a quick summary of what users can expect from your project.

- Login with Google: Login to the application using a Google account, please note that this account will need to be added as a test account.
- Check JWT token: Fetches the _accessToken_ from localStorage and sends to API to be verified. Client side console logs will indicate success or failure.
- Refresh Google access token: Fetches the 'accessToken' from localStorage and sends to API to be verified. Once verified and decoded, the Google refresh token is extracted from the payload to then be sent to Google API for new tokens. If refresh token in valid and access from user has not been revoked, this API will receive the refreshed tokens. These tokens are then encapsulated in a JWT again and sent to front end to replace existing client side localStorage JWT. If this process fails, user will be logged out and all localStorage cleared.
- Logout: Clear all localStorage and UI state.
- Logged in: Show the state of React useState hook which is tracks the status of users authentication.
- Welcome, user!: Show the given name extracted from Google API call.

## Getting Started

Explain how to get started with your project. Provide step-by-step instructions for setting up the development environment, installing dependencies, and running the project.

### Prerequisites

List any software, tools, or dependencies that users need to have installed before they can use your project.