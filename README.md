# Events management app - Backend

## Made using [Nestjs](https://github.com/nestjs/nest)

<a href="https://nestjs.com/">
  <img src="https://nestjs.com/img/logo-small.svg" width="240" height="240">
</a>

## Description

This is the backend for an event mangement web app made in typescript using nestjs to deliver the maximum flexibility and reliability. This part of the app is built on top of MongoDB to store and retrive user's data and events stored inside it.

## Features

### User Authentication

- **Registration**: Users can register with a username, password, and email address.
- **Email Verification**: After registration, a verification email is sent to the user. Only verified users can log in.
- **Login**: Users can log in using their username and password. Only verified users are allowed access.
- **Session Management**: Access is managed through JWT tokens, which are stored locally by the frontend.

## Event Management

- **Create Event**: Users can create new events by specifying the name, description, date, and other details.
- **View Event**: Users can view the details of a specific event using its unique ID.
- **Edit Event**: Users can update the details of existing events.
- **Delete Event**: Users can remove events from the system.

## 3. Security

The system implements some security measures:

- **JWT Protection**: All protected endpoints require a valid JWT token.
- **Password Encryption**: User passwords are encrypted using bcrypt.

## 4. Frontend Integration

The backend is designed to integrate seamlessly with the [frontend developed in React](https://github.com/FranzRome/events-frontend). The RESTful APIs are easily consumable by the frontend to provide a dynamic and interactive user experience.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Author - [Francesco Romeo](https://github.com/FranzRome)

### Support Me

Do you likemy work?
Visit my [ko-fi](https://ko-fi.com/franzrome) page
