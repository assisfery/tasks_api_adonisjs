# Tasks API in AdonisJS
This is a project made in AdonisJS to manage Task.

## Features

#### Auth
- Sign Up
- Login
- Get Logged User info

#### Tasks Management
- Create Task
- Get a Task by ID
- Update a Task
- Delete a Task
- Get all Tasks

## Setup
Clone the repository
```
git clone https://github.com/assisfery/sword_health_tasks_api_adonisjs.git
```

Create .env
```
cp .env.example .env
```

Run with docker
```
docker compose up
```

Access the api in
http://127.0.0.1:3333

Access the adminer in
http://127.0.0.1:8888

Access the kafdrop in
http://127.0.0.1:9000


## Tests

#### Postman
You can use postman collection to test the API manually,
just import the file **sword_health_tasks_api.postman_collection.json**

#### Japa
Run the follow command to execute tests
```
node ace test
```

Run the test from outside the docker container
```
docker exec -it -u 0 adonis_app sh -c "node ace test"
```

## Listen Events
```
docker exec -it -u 0 adonis_app sh -c "node ace listen:events"
```