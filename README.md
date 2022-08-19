
# Stack
* [Typescript]
* [Jasmine]
* [Node.js]
* [Express]
* [PostgreSQL]
#  env
ENV=dev
# port number
PORT=3000


# PostgreSQL database for dev
POSTGRES_HOST=127.0.0.1
DEV_DB=storefront
USER=postgres
PASSWORD=1234

# database for testing
TEST_DB=storefront_test


# JWT
JWT_TOKEN_SECRET=Sog@*Fos2*7
# password encryption
BCRYPT_SALT_ROUNDS=10
BCRYPT_PEPPER=5Ffja@9spfaA#

```
# Clone 
```
$ git clone 
```
# Run on local

```shell
$ cd storefront-backend-project
$ npm install
$ npm start
```

# Initialize PostgreSQL and connect 

```sh
#  PostgreSQL start
$ psql -h localhost -U postgres

#  database create for dev env
$ CREATE DATABASE storefront;

# connect to database
$ \c storefront

# list out all databases
$ \dt
# quit PostgreSQL
$ \q
```

# Migration  for `test` database

```sh
$ npm run test
```


# Migration  for `dev` database

```sh
$ npm run dev
```

# Environment Variables
 are available in the `.env` file.

```sh


# API 

 check the `REQUIREMENTS.md` .


