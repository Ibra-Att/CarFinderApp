# Car Finder Application

A web application that allows users to search car makes and manufacture years, and view available vehicle types and models. Built with .NET Core API and Angular.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/)
- npm 11+
- [Docker & Docker Compose](https://www.docker.com/) (for containerized deployment)

## Project Structure

```
CarFinderApp/
- API/CarFinderAPP-API/       # .NET Core Web API
- Client/CarFinder-UI/        # Angular Frontend
- docker-compose.yml          # Docker orchestration
- README.md
```

## Running Locally (Step by Step)

### 1. Start the Backend API

```bash
cd API/CarFinderAPP-API
dotnet run --launch-profile https
```

The API will be available at:
- http://localhost:5230
- https://localhost:7168
- Swagger UI: https://localhost:7168/swagger/index.html

> **Note:** Without `--launch-profile https`, `dotnet run` defaults to the `http` profile and only binds `http://localhost:5230`. Swagger will be at `http://localhost:5230/swagger/index.html` in that case.

-- or simply just use Visual Studio and run it.

### 2. Start the Angular Frontend

Open a **new terminal**:

```bash
cd Client/CarFinder-UI
npm install
ng serve
```

-The app will be available at http://localhost:4200
-Note: I have also added a loading interceptor for auto loading spinner on any request from api till data fetched.

## Running with Docker

From the project root directory:

### Build and start all containers

```bash
docker-compose up --build (for first time)
docker-compose up -d (any time after build)
```

this will trigger docker-compose.override.yml auto since docker-compose.yml for server not local

The application will be available at:
- **Frontend**: http://localhost:4200
- **API**: http://localhost:5230
-**API with swagger**: http://localhost:5230/swagger/index.html

### Stop the containers

```bash
docker-compose down
```

## API Endpoints

| Endpoint | Description |

| `GET /api/vehicles/makes` | Get all car makes |
| `GET /api/vehicles/makes/{makeId}/vehicle-types` | Get vehicle types for a make |
| `GET /api/vehicles/makes/{makeId}/models?year={year}` | Get models for a make and year |


## Live Demo

- **Frontend**: http://16.171.148.200
- **API Swagger**: http://16.171.148.200:5000/swagger/index.html

## AWS Deployment

The application is hosted on AWS EC2 (t3.micro, Ubuntu 24.04).
Deployed using Docker Compose.