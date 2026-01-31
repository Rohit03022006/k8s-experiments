# MySQL Deployment on Kubernetes (EC2/EKS)

This repository contains the Kubernetes manifest files required to deploy a persistent, secure MySQL database on an Amazon EC2 instance or EKS cluster.

## Architecture Overview

The deployment follows a standard Kubernetes pattern for stateful applications:
- **Namespace**: Isolated environment (`mysql`).
- **Secret & ConfigMap**: Externally managed credentials and configuration.
- **Persistence**: `PersistentVolume` (PV) and `PersistentVolumeClaim` (PVC) using `hostPath` (for development) or standard storage classes.
- **Deployment**: A single-replica MySQL instance for data consistency.
- **Service**: A `ClusterIP` service for internal communication.

![Workflow](./Workflow.png)

## File Structure

| File | Description |
|------|-------------|
| `namespace.yml` | Defines the `mysql` namespace. |
| `secret.yml` | Stores the `MYSQL_ROOT_PASSWORD` (Base64 encoded). |
| `configmap.yml` | Stores the default database name (`MYSQL_DATABASE`). |
| `persistentVolume.yml` | Defines the physical storage on the node. |
| `pvc.yml` | Requests storage for the MySQL pod. |
| `deployment.yml` | The main MySQL deployment (Image: `mysql:8.0`). |
| `service.yml` | Exposes MySQL on port 3306. |

```bash

tree # Show the file structure in bash

MySql 
├── configmap.yml
├── deployment.yml
├── namespace.yml
├── persistentVolumeClaim.yml
├── persistentVolume.yml
├── README.md
├── secret.yml
├── service.yml
└── Workflow.png

```
## Deployment Steps

Run the following commands in order to set up the infrastructure:

### 1. Create the Namespace
```bash
kubectl apply -f namespace.yml
```

### 2. Configure Credentials & Settings
```bash
# Apply Secret (Root Password) and ConfigMap (Database Name)
kubectl apply -f secret.yml
kubectl apply -f configmap.yml
```

### 3. Setup Persistent Storage
```bash
kubectl apply -f persistentVolume.yml
kubectl apply -f persistentVolumeClaim.yml
```

### 4. Deploy MySQL
```bash
kubectl apply -f deployment.yml
```

### 5. Expose the Service
```bash
kubectl apply -f service.yml
```
## Troubleshooting
```bash
kubectl get pods -n <Namespace> # shows whether pods are running, pending, or crashing.
kubectl describe pod <pod-name> -n <Namespace>  # shows whether pods are running, pending, or crashing.
kubectl logs <pod-name> -n <Namespace> # shows the application logs (e.g., MySQL startup errors).
kubectl exec -it <pod-name> -n <Namespace> -- bash # Enters the container to run manual checks.
```


##  Verification

Check the status of all resources in the `mysql` namespace:

```bash
kubectl get all -n mysql # shows the status of all resources in the `mysql` namespace.
```

Verify that the PersistentVolumeClaim is bound:
```bash
kubectl get pvc -n mysql # shows the status of the PersistentVolumeClaim.
```

```bash
kubectl describe <pod-name> -n <Namespace> # shows the where the pod is stored data.
```

```bash
kubectl exec -it <pod-name> -n <Namespace> -- bash # Enters the container to run manual checks.

cd /mnt/data
ls # shows the data stored in the pod.

```