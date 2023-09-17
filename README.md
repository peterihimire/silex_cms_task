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

This is a Node.JS RestAPI task application powered by NodeJS, Express , TypeScript, PostgreSql and Express Session. The API will serve as the backend for a content management system [C.M.S].When a user registers, login to authenticate himself, a session is generated for him in the server and sent to to the browser as cookie. The cookie now has the responsibility to authenticate the user on every request made to the server, until it expires or user logs out manually.

The user session is stored in a redis database, because servers are stateless, hence can't store the user info, using a redis database or other form of database store will help the session data persist.

This session based authentication ensures that users data are safe, and not prone to cross site script [X.X.S] attacks and more.

<!-- ![Node API Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692715763/Screenshot_2023-08-22_at_3.37.22_PM_stqqyc.png) -->

---

## Dependencies

- "bcryptjs": "^2.4.3",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "multer": "^9.0.1",
- "redis": "^9.0.1",
- "postgresql": "^5.7.0",
- "sequelize": "^7.4.3",
- "sequelize-cli": "^7.4.3",
- "nodemon": "^3.0.1",

---

## Setup

Clone this repo to your desktop with $`git clone https://github.com/peterihimire/silex-cms-task`

Change directory into the folder $`cd silex-cms-task`

Create a .env file $`touch .env`

Copy these to your `.env file` and feel free to customize according to your need

```txt
PORT=4040
DB_HOST=localhost
DB_NAME=silex_task_dev
DB_USER=postgres
DB_PASSWORD=testing123
CORS_ORIGIN=http://localhost:3000
REDIS_URL=localhost
REDIS_PORT=6379
SESSION_SECRET=secret$%^134
```

---

## Usage

After you've cloned this repo to your desktop, added your .env file and wired up your postgreSQL database string url, and database configuration, provide your redis connection string and port , provide your session secret and many other informations on needed in the env. Go to its root directory and run $`npm install` to install its dependencies.

Once the dependencies are installed, you can run $`npm run seed` to start the application. This commands runs the migration and seed files to populate the database with some default data to help you view the dashboard without much of a hustle.

To test the API endpoints you can use postman or insomnia, you can add to your global environment variable for the base url: `http://127.0.0.1:4040/api/silex_task/v1` and name it whatever you wish, mine is `{{SAPI}}`. Save it and proceed to test the api.

- **Test Endpoint:** Use this endpoint to test if the API is working , for success and fail you will get the following responses

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1694963431/Screenshot_2023-09-17_at_3.44.56_PM_sfqtao.png)

  ```js
  {
   "status": "success",
   "msg": "Silex Test API was initiated successfully!"
  }
  ```

  ```js
  {
    "status": "fail",
    "msg": "Could not find this route, make sure the URL is correct !"
  }
  ```

- **Register Endpoint:** Users can register in the management system application with their username and password which are required fields. Success and fail responses are below

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1694963431/Screenshot_2023-09-17_at_3.43.51_PM_mmhfbn.png)

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

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1694963431/Screenshot_2023-09-17_at_3.44.29_PM_cfclcx.png)

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

- **Dashboard Endpoint:** This is a protected route only authenticated and authorized users can access it. You will need to be authenticated to access this route. View the [postman doc](https://documenter.getpostman.com/view/12340633/2s9YC7SrQw) to see all the endpoints and examples on how to access and work with them.

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1694963431/Screenshot_2023-09-17_at_3.47.48_PM_za9rd8.png)

  ```js
  {
    "status": "fail",
    "msg": "Session invalid or expired!"
  }
  ```

- **Logout Endpoint:** Clears the cookie in the browser header and un-authenticates the user.

  ![Cookie](https://res.cloudinary.com/dymhdpka1/image/upload/v1694963431/Screenshot_2023-09-17_at_3.45.15_PM_miztmo.png)

  ```js
    {
      "status": "success",
      "msg": "Logout successful!",
    }
  ```

---

<!-- ## Test

Unit test with `Jest` was integrated, to test the app, run $`npm run test`

![Unit test Preview](https://res.cloudinary.com/dymhdpka1/image/upload/v1692788229/Screenshot_2023-08-23_at_11.56.46_AM_hohpej.png)

<!-- ## License

> You can check out the full license [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license. -->

<!-- --- --> -->

## Postman Documentation

Click this [link](https://documenter.getpostman.com/view/12340633/2s9YC7SrQw) to access the postman documentation of this Backend API task.
