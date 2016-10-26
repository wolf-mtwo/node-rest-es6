#NODE SEED ES6

## Features

- Session
- User ahutentication
- User CRUD
  - Encrypt password
- Database connection
- Node seed

## Rest API

Base URL **"http://localhost:3000/api/v1"**

```
# User
GET /api/v1/users
POST /api/v1/users
GET /api/v1/users/:user_id
PUT /api/v1/users/:user_id
DELETE /api/v1/users/:user_id

# Session
POST /api/v1/login

Header x-access-token: ||token||
POST /api/v1/logout
```

## Running your application with Gulp

We have wrapped Gulp tasks regardless of the build tool running the project is transparent to you.

To use Gulp directly, you need to first install it globally:

It's time to use Gulp tasks:
- *$ gulp serve* to start server on your source files with live reload
- *$ gulp serve:dist* to start server on your optimized application without live reload

## Contributing
We welcome pull requests from the community! Just be sure to read the [contributing]() doc to get started.



## License
[The MIT License](LICENSE.md)
