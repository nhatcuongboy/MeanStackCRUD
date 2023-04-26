Step:

- cd /backend
- run "npm install" to install backend package
- run "mongod" to start MongoDB
- run "npm run start" to start nodemon
- cd /frontend
- run "npm install" to install frontend package
- run "ng serve" to start app

API:

- Register: /register-user (POST)
- Login: /signin (POST)
- Get All User: /users (GET)
- Get Single User: /user-profile/:id (GET)
- Update User: /update-user/:id (PUT)
- Delete User: /delete-user/:id (DELETE)

- Create Equipment: /equipment/create (POST)
- Get All Equipment: /equipment/list (GET)
- Get single Equipment: /equipment/read/:id (GET)
- Get Assignment: /equipment/assignment/:id (GET)
- Update Equipment: /equipment/update/:id (PUT)
- Delete Equipment: /equipment/delete/:id (DELETE)
