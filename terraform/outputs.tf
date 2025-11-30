output "container_name" {
  value = docker_container.todo_app_container.name
}

output "container_ip" {
  value = docker_container.todo_app_container.ip_address
}
