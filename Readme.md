## SETUP INSTRUCTION

- Clone the repository
- [Install docker](https://docs.docker.com/engine/install/) with docker-compose-plugin.

### Start the app:

open terminal into the project repository and run the command below

```bash
sudo docker compose build && sudo docker compose up -d
```

### See the logs:

```bash
sudo docker compose logs -f app
```

### Stop the app:

```bash
sudo docker compose down
```

### Api documentation:

[https://sib61.github.io/job-market/](https://sib61.github.io/job-market/)

postman collection is given in the projects postman/collection.json file

### Features:

- Employer registration
- Employer login
- Job create
- Job update
- Job delete
- Search job
- Update job activity
- Get job details
- Apply for a job
- Get all applications of a job
- Get application details of an application
- Real time socket notification when a application is created

### Tech stack:

- NodeJs
- Express
- MongoDb
- Redis
- Socket.IO
- Docker
