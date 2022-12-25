# Monitoring Service

monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Installition

**docker compose is required**

1.  first thing is to clone the repo into your device via

```bash
git clone https://github.com/islamghany/monitoring-service.git
```

2. go the repo directory and build up the project via

```bash
docker compose up --build
```

now it well take few seconds to download up all images needed for the applications.

## Usage

to inter act with the APIs via the OpenAPI Dashboard go to [http://localhost:8080/v1/api-docs](http://localhost:8080/v1/api-docs)
