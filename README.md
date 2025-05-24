# Heroes API

## Description
This project is a RESTful API for managing heroes, multimedia heroes, multimedia groups, and multimedia content. It allows users to perform CRUD (Create, Read, Update, Delete) operations on these entities.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication

## Project Structure
```
heroes-api
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heroes-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in the required values, including your MongoDB connection string and JWT secret.

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints
- **Heroes**
  - `GET /heroes` - Retrieve all heroes
  - `POST /heroes` - Create a new hero
  - `GET /heroes/:id` - Retrieve a hero by ID
  - `PUT /heroes/:id` - Update a hero by ID
  - `DELETE /heroes/:id` - Delete a hero by ID

- **Multimedia Heroes**
  - `GET /multimediaHeroes` - Retrieve all multimedia heroes
  - `POST /multimediaHeroes` - Create a new multimedia hero
  - `GET /multimediaHeroes/:id` - Retrieve a multimedia hero by ID
  - `PUT /multimediaHeroes/:id` - Update a multimedia hero by ID
  - `DELETE /multimediaHeroes/:id` - Delete a multimedia hero by ID

- **Grupo Multimedias**
  - `GET /grupoMultimedias` - Retrieve all multimedia groups
  - `POST /grupoMultimedias` - Create a new multimedia group
  - `GET /grupoMultimedias/:id` - Retrieve a multimedia group by ID
  - `PUT /grupoMultimedias/:id` - Update a multimedia group by ID
  - `DELETE /grupoMultimedias/:id` - Delete a multimedia group by ID

- **Multimedias**
  - `GET /multimedia` - Retrieve all multimedia content
  - `POST /multimedia` - Create new multimedia content
  - `GET /multimedia/:id` - Retrieve multimedia content by ID
  - `PUT /multimedia/:id` - Update multimedia content by ID
  - `DELETE /multimedia/:id` - Delete multimedia content by ID

## Authentication
This API uses JWT for authentication. Users must log in to receive a token, which should be included in the `Authorization` header for protected routes.

## License
This project is licensed under the MIT License.