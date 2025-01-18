## SETUP INSTRUCTION

- Clone the repository
- [Install docker](https://docs.docker.com/engine/install/) with docker-compose-plugin.

### start the app

open terminal into the project repository and run the command below

```bash
sudo docker compose build && sudo docker compose up -d
```

### see the logs

```bash
sudo docker compose logs -f app
```

### stop the app

```bash
sudo docker compose down
```
