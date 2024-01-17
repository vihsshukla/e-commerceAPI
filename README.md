# e-commerceAPI

This repository contains the nodejs api code for e-commerce application.

## Steps to follow to setup it locally

1. Clone the repository in your system
```git clone <github_url>```

1. Install the required dependecies of this module
```npm install```

1. Set PORT and DATABASE_URL as enviroment variables in your local, below are the commands to set in windows
```$Env:<ENV_NAME>=<'ENV_VALUE'>```

1. Execute the SQL command in your database server given in schema.sql file

1. Execute the command given below to start the server locally
```npm run start```

Once server is started in the Local.
Following calls can be performed followed by http://localhost:portnumber/

1. ```/api/auth/register``` => It accepts username, password and userType as req body and registers the user into database
```
{
  "username":"username",
  "password":"password",
  "userType":"userType"
}
```

1. ```/api/auth/login``` => It accepts username, password in req body and return JWT authentication token
```
{
  "username":"username",
  "password":"password"
}
```

**Using the JWT token as auth token all other api call can be performed**

1. ```/api/buyer/list-of-sellers``` => It returns of sellers available
```
Requires only JWT Auth token as Bearer token
```

1. ```/api/buyer/seller-catalog/:seller_id``` => It returns catalogs of sellers available for given seller_id
```
Requires only JWT Auth token as Bearer token
```

1. ```/api/buyer/create-order/:seller_id``` => It accepts list of products in req body and creates the order
```
Requires JWT Auth token as Bearer token
{
  "products":[18,20,21]
}
```

1. ```/api/seller/orders``` => It returns list of orders for seller
Requires only JWT Auth token as Bearer token

```

1. ```/api/buyer/create-catalog``` => It accepts catalogname and list of products to be created and cretes into fdatabase
```
Requires JWT Auth token as Bearer token
{
  "catalogName":"catalogName",
  "items":[
      {"price":"price","name":"name"}
      ...
    ]
}
```

Currently these are the enpoints supported only.