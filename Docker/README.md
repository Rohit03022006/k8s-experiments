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

## Notes
- Change the port in the Dockerfile and run command if your app uses a different port.
- For persistent data/logs in the multi-stage image, mount a volume to `/app/data`.
- Make sure your app's entry point is `server.js` or update the `CMD` as needed.

---
This is a template. Adjust names and commands for your project and the find the base image on https://hub.docker.com/ .
