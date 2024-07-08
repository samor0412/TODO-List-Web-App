# TODO Web Application

A simple web-based task management application, built using modern web technologies.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Built with](#built-with)

## Introduction

The TODO Web Application is a user-friendly task management tool that allows you to create, organize, and track your daily tasks. It provides a clean and intuitive interface to help you stay on top of your responsibilities and enhance your productivity.

## Features

- **Task Creation**: Easily add new tasks with a name, description, status and due date.
- **Task Filtering**: View tasks based on their status (`Not Started`, `In Progress`, `Completed`).
- **Task Search**: Quickly find specific tasks by name.
- **Task Editing**: Update task details, such as name and due date, as needed.
- **Task Deletion**: Remove tasks that are no longer relevant.
- **Task Sorting**: Sort tasks based on name, due date or status.
- **Responsive Design**: Accessible and user-friendly on both desktop and mobile devices.
- **Real-time Collaboration**: Receive updates from others collaborator in real-time  with toast notifications, without the need of refreshing the page.

## Installation




### Method 1: Docker (Recommended)
#### 1. Run the command
```bash
docker compose up
```
#### 2. After DB is up, run db migration script to init DB
```bash
npm install
```
```bash
npm run -w backend migrate:prisma
```
#### 3. Open http://localhost to view the page and http://localhost:3001/openapi to view the API doc


### Method 2: Run in local
#### 1. Install Dependencies
```bash
npm install
```

#### 2. Run Database
 - Method 1:  use docker to host a DB
 ```bash
 docker run -v ./.docker/postgres:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todo-list-web-app postgres 
 ```
 - Method 2: host a DB your self
	- Update the variable `DATABASE_URL` of `.env.development` and `.env.production` in `packages/backend`

#### 3. After DB is up, run db migration script to init DB
```bash
npm run -w backend migrate:prisma
```

#### 4. Generate Prisma Client for backend
```bash
npm run -w backend generate:prisma
```

#### 5. Run backend
```bash
npm run -w backend start:dev
```
Open http://localhost:3001/openapi to view the API doc

#### 6. Run frontend
```bash
npm run -w frontend dev
```
Open http://localhost:5173/ to view the page

## API Documentation

##### Method 1
Run the backend server, access `http://localhost:3000/openapi` (for docker)  and `http://localhost:3001/openapi`(for local).

##### Method 2
Copy [openapi.yaml](https://github.com/samor0412/TODO-List-Web-App/blob/main/doc/openapi.yaml "openapi.yaml") and paste to [Swagger Editor](https://editor.swagger.io/ "Swagger Editor")

## Built with
- React
- NestJS
- TailwindCSS
