# MongoDB Deployment on Kubernetes (EC2/EKS)

This repository contains the Kubernetes manifest files required to deploy a persistent, secure MongoDB database on an Amazon EC2 instance or EKS cluster.

## Architecture Overview

The deployment follows a standard Kubernetes pattern for stateful applications:
- **Namespace**: Isolated environment (`mongodb`).
- **Secret & ConfigMap**: Externally managed credentials and configuration.
- **Persistence**: `PersistentVolume` (PV) and `PersistentVolumeClaim` (PVC) using `hostPath` (for development) or standard storage classes.
- **Deployment**: A single-replica MongoDB instance for data consistency.
- **Service**: A `ClusterIP` service for internal communication.

![Workflow](./Workflow.png)

## File Structure

| File | Description |
|------|-------------|
| `namespace.yml` | Defines the `mongodb` namespace. |
| `secret.yml` | Stores the `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` (Base64 encoded). |
| `configmap.yml` | Stores the initial database name (`MONGO_INITDB_DATABASE`). |
| `persistentVolume.yml` | Defines the physical storage on the node. |
| `persistentVolumeClaim.yml` | Requests storage for the MongoDB pod. |
| `deployment.yml` | The main MongoDB deployment (Image: `mongo:latest`). |
| `service.yml` | Exposes MongoDB on port 27017. |

```bash
MongoDb Deployment
├── configmap.yml
├── deployment.yml
├── namespace.yml
├── persistentVolumeClaim.yml
├── persistentVolume.yml
├── README.md
├── secret.yml
└── service.yml
```

## Deployment Steps

Run the following commands in order to set up the infrastructure:

### 1. Create the Namespace
```bash
kubectl apply -f namespace.yml
```

### 2. Configure Credentials & Settings
```bash
# Apply Secret (Root Credentials) and ConfigMap (Database Name)
kubectl apply -f secret.yml
kubectl apply -f configmap.yml
```

### 3. Setup Persistent Storage
```bash
kubectl apply -f persistentVolume.yml
kubectl apply -f persistentVolumeClaim.yml
```

### 4. Deploy MongoDB
```bash
kubectl apply -f deployment.yml
```

### 5. Expose the Service
```bash
kubectl apply -f service.yml
```

## Troubleshooting
```bash
kubectl get pods -n mongodb # shows whether pods are running, pending, or crashing.
kubectl describe pod <pod-name> -n mongodb  # shows detailed status of the pod.
kubectl logs <pod-name> -n mongodb # shows the application logs.
kubectl exec -it <pod-name> -n mongodb -- bash # Enters the container to run manual checks.
```


## Verification

Check the status of all resources in the `mongodb` namespace:

```bash
kubectl get all -n mongodb
```

Verify that the PersistentVolumeClaim is bound:
```bash
kubectl get pvc -n mongodb
```

Check data persistence path in the container:
```bash
kubectl exec -it <pod-name> -n mongodb -- ls /data/db
```
