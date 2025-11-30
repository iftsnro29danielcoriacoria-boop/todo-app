terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.19.0"
    }
  }
}

provider "docker" {
  host = "npipe:////./pipe/docker_engine"  # Docker Desktop en Windows
}

# Docker image desde GHCR
resource "docker_image" "todo_app" {
  name = "ghcr.io/iftsnro29danielcoriacoria-boop/todo-app:latest"
}

# Docker container que levanta la imagen
resource "docker_container" "todo_app_container" {
  name  = "todo-app-container"
  image = docker_image.todo_app.name

  ports {
    internal = 3001
    external = 3002
  }

  env = [
    "MONGO_URI=${var.mongo_uri}"
  ]
}
