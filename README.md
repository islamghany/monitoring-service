# Monitoring Service

monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Installition

**docker compose is required**

first thing is to clone the repo into your device via

```bash
git clone https://github.com/islamghany/monitoring-service.git
```

open the `.env` file inside monitoring-service directory then add your gmail account and your the app password.

to get your app password look at this [article](https://miracleio.me/snippets/use-gmail-with-nodemailer/)

go to the repo directory and build up the project via

```bash
docker compose up --build
```

now it well take few seconds to download up all images needed for the applications.

## Usage

to interact with the APIs via the OpenAPI Dashboard go to [http://localhost:8080/v1/api-docs](http://localhost:8080/v1/api-docs)
