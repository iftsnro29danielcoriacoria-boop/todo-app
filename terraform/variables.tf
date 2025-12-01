# Archivo: variables.tf

# -----------------------------------------------------------
# Variables de Docker Hub
# -----------------------------------------------------------
variable "docker_username" {
  description = "Tu nombre de usuario de Docker Hub (danielcoria)"
  type        = string
  default     = "danielcoria" # Aseguramos que sea 'danielcoria'
}

# -----------------------------------------------------------
# Variables de la Aplicación
# -----------------------------------------------------------
variable "mongo_uri" {
  description = "URI de conexión a la base de datos MongoDB. Contiene credenciales sensibles."
  type        = string
  # Ya tienes el valor correcto. Se añade 'sensitive = true' para ocultarlo en los logs de plan/apply.
  default     = "mongodb+srv://Fede_22k:fede2014_22k@cluster0.dtk1apu.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=Cluster0"
  sensitive   = true 
}