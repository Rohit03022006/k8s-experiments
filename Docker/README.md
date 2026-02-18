# Node.js Dockerfile Templates

This directory contains two example Dockerfiles for Node.js applications:

- **BasicDockerfileNode**: Simple, single-stage build for development or small apps.
- **MultiStageDockerfileNode**: Multi-stage build for production, optimized image size.

---

## BasicDockerfileNode

### Build Image
```
docker build -f BasicDockerfileNode -t my-node-app-basic .
```

### Run Container
```
docker run -d -p 3000:3000 --name my-node-app-basic my-node-app-basic
```

---

## MultiStageDockerfileNode

### Build Image
```
docker build -f MultiStageDockerfileNode -t my-node-app-multi .
```

### Run Container
```
docker run -d -p 3000:3000 --name my-node-app-multi my-node-app-multi
```

---


---

## Docker Compose

You can use the provided `docker-compose.yml` to build and run both services together:

### Start Both Services
```
docker compose up --build
```

### Stop Services
```
docker compose down
```

### Service Ports
- `node-basic`: http://localhost:3000
- `node-multi`: http://localhost:3001 (maps container 3000 to host 3001)

### Persistent Data
- The `node-multi` service uses a named volume for `/app/data`.

---
## Notes
- Change the port in the Dockerfile, Compose file, and run command if your app uses a different port.
- For persistent data/logs in the multi-stage image, mount a volume to `/app/data`.
- Make sure your app's entry point is `server.js` or update the `CMD` as needed.

---
This is a template. Adjust names and commands for your project and find the base image on https://hub.docker.com/ .
