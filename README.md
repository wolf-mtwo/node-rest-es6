# NODE SEED ES6

## Features

- Session
- User ahutentication
- User CRUD
  - Encrypt password
- Database connection
- Node seed

## Rest API

Base URL **"http://localhost:3000/v1"**

```
# User
GET /v1/users _-> queriable_
POST /v1/users
GET /v1/users/:user_id
PUT /v1/users/:user_id
DELETE /v1/users/:user_id

# Articles CRUD demo example
GET /v1/articles _-> queriable_
POST /v1/articles
GET /v1/articles/page/:page/limit/:limit _-> queriable_
GET /v1/articles/:article_id
PUT /v1/articles/:article_id
DELETE /v1/users/:article_id

# Session
POST /v1/login

Header x-access-token: ||token||
POST /v1/logout
```

## Queriable

_Queriable_ verboses are always to retrieve a bulk of data.

```
GET /v1/post
GET /v1/post/page/:page/limit/:limit
```

and here comes the advantage, basic implementation allow to you use _schema_
properties as queriable paramenters. It mean we can do kind of queries.

| id | title | user_id | article_id |
|----|-------|---------|---------|
| 1 | say hi! | u1 | a1 |
| 2 | hello world! | u1 | a2 |

Using given data, query response should look like.

```
GET /v1/post?user_id=u1    // [{ // 1 }, { // 2 }]
GET /v1/post?user_id=u1&article_id=a2    // [{ // 2 }]
GET /v1/post/page/:page/limit/:limit?article_id=a2    // [{ // 2 }]
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
