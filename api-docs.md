# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /movies`
- `POST /movies`
- `DELETE /movies/:id`
- `POST /register`
- `POST /login`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /movies

Description:
- Get all movies from database


_Response (200 - OK)_

```json
[
    {
        "id": 5,
        "title": "John Wick 2",
        "rating": 9,
        "createdAt": "2024-05-27T03:30:30.833Z",
        "updatedAt": "2024-05-27T03:30:30.833Z"
    },
    {
        "id": 6,
        "title": "Peter Pan",
        "rating": 8,
        "createdAt": "2024-05-27T03:30:33.784Z",
        "updatedAt": "2024-05-27T03:30:33.784Z"
    }
    ...
]
```

&nbsp;

## 4. DELETE /movies/:id

Description:
- Delete movie by id

Request:


- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "message": "Movie with title John Wick 2 deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```