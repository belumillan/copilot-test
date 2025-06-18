# Blog API Application

A simple Node.js REST API for managing blog posts, using PostgreSQL, Sequelize ORM, and Liquibase for migrations. The application is containerized with Docker and orchestrated with Docker Compose.

## Application Structure

- **src/**: Application source code
  - **app.js**: Main Express app entry point
  - **controllers/**: Route handler logic
  - **models/**: Sequelize models and DB connection
  - **routes/**: Express route definitions
- **liquibase/**: Liquibase changelog and migration files
- **tests/**: Unit tests for the API
- **Dockerfile**: Docker build instructions for the app
- **docker-compose.yml**: Orchestrates app, database, and Liquibase
- **docker-compose.test.yml**: Compose file for running unit tests
- **package.json**: Node.js dependencies and scripts

## Folder Structure

```
├── src/
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   └── routes/
├── liquibase/
│   └── changelog.xml
├── tests/
│   └── blog.test.js
├── Dockerfile
├── docker-compose.yml
├── docker-compose.test.yml
├── package.json
└── README.md
```

## Technologies Used

- **Node.js** & **Express**: REST API server
- **PostgreSQL**: Database
- **Sequelize**: ORM for Node.js
- **Liquibase**: Database migrations and seed data
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Jest** & **Supertest**: Unit testing

## Common Commands

### Build and Run the Application

```
docker-compose up --build
```
- Starts the PostgreSQL database, runs Liquibase migrations, and launches the API on port 3000.

### Run Unit Tests in Docker

```
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
```
- Runs the test suite in a container with a separate test database.

### Run Unit Tests Locally

```
npm install
npm test
```

### Tear Down Containers and Volumes

```
docker-compose down -v
```

## API Endpoints

- `POST   /api/blogs`           - Create a new blog
- `GET    /api/blogs`           - Get all blogs
- `GET    /api/blogs/:id`       - Get a blog by ID
- `PUT    /api/blogs/:id`       - Update a blog by ID
- `GET    /api/blogs/search/title?title=...` - Search blogs by title

---

For more details, see the source code and comments in each file.
