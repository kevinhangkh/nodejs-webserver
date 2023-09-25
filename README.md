# nodejs-webserver

This is a backend application written in NodeJS with a connection with MongoDB.

The authentication is done with Json Web Tokens using accessToken and refreshToken.

It provides the following endpoints:

- `POST /register`
- `POST /login`
- `GET /refresh`
- `GET /logout`
- `GET /users`
- `GET /users/:id`
- `DELETE /users/`
- `GET /employees`
- `POST /employees`
- `PUT /employees`
- `DELET /employees`
- `GET /employees/:id`

## Run

You will need to create a `.env` file in the root directory of the project and add the following:

- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRATION`
- `DATABASE_URI`

Reach out to me for the values

Run `npm run dev` or `bun run dev` to start the app in dev mode.

## Dependencies:

- "bcryptjs": "^2.4.3",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "date-fns": "^2.30.0",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "jsonwebtoken": "^9.0.2",
- "mongoose": "^7.5.2",
- "uuid": "^9.0.1"