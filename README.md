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
1. Clone the repository:
```bash
git clone https://github.com/samor0412/TODO-List-Web-App.git
```

2. Go to the folder
```bash
cd TODO-List-Web-App
```


##### Method 1: Docker (Recommended)
1. Run the command
```bash
docker compose up
```
Open http://localhost to view the page and http://localhost:3001/openapi to view the API doc


##### Method 2: Run in local
1. Install Dependencies
```bash
npm install
```

2. Set Database URL (need to run a postgres DB yourself or using docker-compose in Method 1)
```.env
DATABASE_URL=postgresql://<user_name>:<password>@<host>:<port>/todo-list-web-app?schema=public
```

3. Run backend
```bash
npm run -w backend start:dev
```
Open http://localhost:3001/openapi to view the API doc

4. Run frontend
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
