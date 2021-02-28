## User management
Management user in company. Nodejs project use express frame work and sequencelize to communicate with database.

You can get post man collection in [here](https://github.com/khanhvu94/node-tech-base/tree/master/postman_collection) to test.
CICD setuped to automation deploy app to [heroku server](https://demo-teachbase-01.herokuapp.com/) accoding to process:

![Cicd process](https://github.com/khanhvu94/node-tech-base/blob/master/public/cicd.png?raw=true)

The application's database schema allows for high scalability:
![Database schema](https://github.com/khanhvu94/node-tech-base/blob/master/public/data_str.png?raw=true)

Run project:
```
npm install
npm start
```

APIs support:
>  post: /api/accounts/login

support user login and get access token.
```
request body: {
    "username":"admin",
    "password":"admin"
}
```
>  post: /api/accounts/logout

support logout current use.
```
header: Authorization
```
>  post: /api/accounts/refreshtoken

support user refresh token when access token invalid.
```
request body:{
    "refreshToken": refresh token
}
```
>  get: /api/users

support get list member in the same company of current use. API returns the list of user data by role of use.
```
header: Authorization
query parameter:
    page_index: page index,
    page_size: page size,
    filter: string for filter first name, last name or email
    sort_field: sort field,
    sort_type: sort type ASC or DESC
```
life cycle of a requen:
![](https://github.com/khanhvu94/node-tech-base/blob/master/public/life_cycle_r.png?raw=true)

Data example:
| user name | password | role |
| -------- | -------- | -------- |
| admin     | admin     | director     |
| user     | user     | department lead     |
| user1     | user1    | team lead     |
| user1     | user1     | member     |
