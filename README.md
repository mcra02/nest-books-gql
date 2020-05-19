<p align="center">
    <img src="https://miro.medium.com/max/400/1*nP2C50GK4_-ly_R_mq3juQ.png" width="120" alt="Maicol" />
   <img src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png" width="120" alt="Maicol" />    
</p>

<h1 align="center">
  EXAMPLE NEST GRAPHQL BOOKS
</h1>

## Description

Simple example developed by [Maicol](https://github.com/mcra02/) implementing a CRUD of books, authors and users using the following features:

- **NodeJs** 12.x+
- **Nest** 7.0
- **GraphQl**
- **JWT**

## Installation

1. Clone Repository

   ```bash
   $ git clone https://github.com/mcra02/nest-books-gql.git
   ```

2. Check the prisma/.env file and change the credentials of the connection url to mysql if necessary (**postgresql://USER:PASSWORD@HOST:PORT/DATABASE**).

   You should create a database named **BOOKSTORE**.

3. Install dependencies

   ```bash
   $ yarn install
   ```

4. Save migrations

   ```bash
   $ npx prisma migrate save --experimental
   ```

5. Run migrations

   ```bash
   $ npx prisma migrate up --experimental
   ```

6. Run generated prisma client

   ```bash
   $ npx prisma generate
   ```

7. Run service (dev)

   ```bash
   $ yarn run watch:dev
   ```

8. Open http://localhost:3000/graphql

# Author

#### [Maicol C Rodrigo](https://www.facebook.com/MaicolCRodrigo)
