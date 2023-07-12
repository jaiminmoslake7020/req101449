# Full Stack Developer Technical Test
Applicant name: Jaimin Pandya (Developing Env Mac and Docker)
## Instructions for Req101449 project Installation


RUN with docker do it one by one  

This command will start all services
`docker-compose up`
If backend was not connected to db please restart
`docker-compose restart jaimin-pandya-req101449_backend_1`
This script will seed initial data
`docker exec jaimin-pandya-req101449_backend_1 npm run docker:db:setup`

OR 

`yarn install`

// install mariadb locally before doing this
These are db config related files, make changes if necessary
packages/server-app/Dockerfil_db
packages/server-app/ormconfig.json
packages/server-app/src/data-source.ts

`npm run setup:db`

`npm run start:server`

`npm run run:web`

### Tech Used
This is a monorepo, it has two packages, one is web and one is server-app.

#### Server Application
Server application is built in node js with express and typescript.  
###### I do not have any experience with python so I used nodeJs.
- 
- mariadb
- TypeOrm
- Sqlite
- Express 
- NodeJs
- Swagger

`npm run start:server`

Swagger Docs available at http://localhost:3000/api/docs

Swagger Docs JSON available at http://localhost:3000/api/docs.json

#### Web Application
Web application is built in react. It has below technologies in it for development purpose.

- Redux
- Eslint
- Craco
- Tailwind
- React router

`npm run run:web`
Web URL at http://localhost:3001

