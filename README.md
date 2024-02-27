![My Skills](https://simpleskill.icons.workers.dev/svg?i=react,go,docker,postgresql,typescript)

# Todoni
TodoList is just a list of things you should do and achieve.

### Built With
* React
* Typescript
* GoLang
* postgreSQL
* Docker


# Features of this App

1. [X] Add Home page with list of todos and add button
2. [X] Add Modal to add a new todo with form 
3. [X] Add server functionality in main.go
4. [X] Add Get route to fetch all todo
5. [X] Add Post route to add a new todo
6. [X] Add Patch route to update the status of todo and make it done
7. [X] Add healthcheck route to check the status of server
8. [ ] Beautify home page and add more features
9. [ ] Add unit test to the project
 
## Getting Started
### Installation
```sh
mkdir yourFileName
cd yourFileName
go mod init github.com/AmjadShakhshir/go-todoList
```

### Install Fiber v2
```sh
go get -u github.com/gofiber/fiber/v2
```

### Create client app with Vite
```sh
yarn create vite client -- --template react-ts
```

### Install dependencies
```sh
cd client
yarn add @mantine/hooks @mantine/core swr @primer/octicons-react
```

### Api Documentation

1- This api use is to check the status of the server
```http
GET /healthcheck
```
2- Fetch all todos from db
```http
Get /api/todos
```
3- Add new todo
```http
Post /api/todos
````
4- Change the done status
```http
Patch /api/todos/:id/done
````

## Responses

Api return JSON representation of the resources created or edited.

```javascript
{
  "id"    : string,
  "title" : string,
  "body"  : string
  "done"  : bool,
}
```

### Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |


### Author
Amjad Shakhshir