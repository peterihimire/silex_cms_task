# SILEX CMS TASK

## Table of contents

- [General info](#general-info)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)
- [Test](#test)
- [Postman Doc](#postman-documentation)

---

## General Info

This is a Node.JS RestAPI task application powered by NodeJS, Express and MongoDB. The API will serve as the backend for a user management system.When a user is authenticated, an authentication JWToken is added to the header cookies automatically, which has a maxAge of 15 minutes.

Authenticated JWToken is added in the header cookie for security reasons, which easily implies that, the server will send the cookie to the the browser, and the browser will take the responsibility to add the cookie JWToken for each request made to the server.

This secures the JWToken and prevents Cross Site Scripting (XSS) attack. Because JavaScript cannot access it.

<!-- ![Node API Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692715763/Screenshot_2023-08-22_at_3.37.22_PM_stqqyc.png) -->

---

## Dependencies

- "bcryptjs": "^2.4.3",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "jsonwebtoken": "^9.0.1",
- "postgresql": "^5.7.0",
- "sequelize": "^7.4.3",
- "jest": "^29.6.3",
- "nodemon": "^3.0.1",
- "supertest": "^6.3.3"

---

## Setup

Clone this repo to your desktop with $`git clone https://github.com/peterihimire/backend-task-js`

Change directory into the folder $`cd backend-task-js`

Create a .env file $`touch .env`

Copy these to your `.env file` and feel free to customize according to your need

```txt
 PORT=8040
 JWT_KEY=evilsecret123@
 CORS_ORIGIN=http://localhost:3000
 DB_HOST=mongodb://localhost:27017/
 DB_NAME=backend_test
```

---

## Usage

After you've cloned this repo to your desktop, added your .env file and wired up your mongodb connection string to the .env file, go to its root directory and run $`npm install` to install its dependencies.

Once the dependencies are installed, you can run $`npm run dev` to start the application.

On your console you should see, meaning you will be able to access the API on localhost:8040

```javascript
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server is running on http://0.0.0.0:8040
MongoDB database connected...
```

To test the API endpoints you can use postman or insomnia, you can add to your global environment variable for the base url: `http://127.0.0.1:8040/api/backend_task/v1` and name it whatever you wish, mine is `{{BTAPI}}`. Save it and proceed to test the api.

- **Test Endpoint:** Use this endpoint to test if the API is working , for success and fail you will get the following responses

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692796574/Screenshot_2023-08-23_at_2.08.49_PM_vu5nws.png)

  ```js
  {
   "status": "success",
   "msg": "Welcome, Test API was initiated successfully!"
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Could not find this route, make sure the URL is correct !"
  }
  ```

- **Register Endpoint:** Users can register in the management system application with their username and password which are required fields. Success and fail responses are below

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692796574/Screenshot_2023-08-23_at_2.06.15_PM_b6whkn.png)

  ```js
  {
    "status": "success",
    "msg": "Account created!",
    "data": {
        "username": "eromz",
        "_id": "64e67b3efd3fc255a0f14c51",
        "createdAt": "2023-08-23T21:33:50.269Z",
        "updatedAt": "2023-08-23T21:33:50.269Z"
    }
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Account already exist, login instead ."
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Username missing required field."
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Password missing required field."
  }
  ```

- **Login Endpoint:** Registered users can authenticate with their username and password, JWT sent from the server is saved in the header cookie. Success and fail will show below responses.

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692796574/Screenshot_2023-08-23_at_2.06.48_PM_lewlpb.png)

  ```js
  {
    "status": "success",
    "msg": "You are logged in!",
    "data": {
        "_id": "64e526a69b9f5b604e1865d9",
        "username": "anslem"
    }
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Account does not exist , please signup for an account ."
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Wrong password or username!"
  }
  ```

- **Dashboard Endpoint:** This is a protected route only authenticated and authorized users can access it. You will need to be authenticated and secondly provide your `"userId": "604fad56ofkldsf900903ikank78"` for authorization. With the help of the JWT attached to the cookie header implicitly, every request sent to server will be authenticated until it expires or manually cleared when logged out.

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692796575/Screenshot_2023-08-23_at_2.08.05_PM_f2uk5s.png)

  ```js
  {
    "status": "success",
    "msg": "Dashboard info.",
    "data": "Welcome to your dashboard, anslem"
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "You are not authenticated!"
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "You are not authorized to perform this operation!"
  }
  ```

- **Logout Endpoint:** Clears the cookie in the browser header and un-authenticates the user.

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1692796574/Screenshot_2023-08-23_at_2.07.38_PM_k2pqrg.png)

  ```js
    {
      "status": "success",
      "msg": "You are logged out!"
    }
  ```

---

## Test

Unit test with `Jest` was integrated, to test the app, run $`npm run test`

![Unit test Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692788229/Screenshot_2023-08-23_at_11.56.46_AM_hohpej.png)

<!-- ## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license. -->

---

## Postman Documentation

Click this [link](https://documenter.getpostman.com/view/12340633/2s9Y5VSiGa) to access the postman documentation of this Backend API task.
