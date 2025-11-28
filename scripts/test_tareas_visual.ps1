# URL base de la API
$baseUrl = "http://localhost:3001/api/tareas"

function Write-Step {
    param([string]$msg)
    Write-Host "`n=== $msg ===`n" -ForegroundColor Cyan
}

function Write-Result {
    param([object]$obj)
    $obj | Format-Table idTarea, titulo, descripcion, fecha, completada -AutoSize
}

# -------------------------------
Write-Step "LISTAR TODAS LAS TAREAS"
$response = curl $baseUrl
$allTasks = $response.Content | ConvertFrom-Json
Write-Result $allTasks

# -------------------------------
Write-Step "CREAR NUEVA TAREA"
$body = @{
    titulo = "Tarea de prueba visual"
    descripcion = "Creada desde PowerShell con estilo visual"
    fecha = "2025-12-01T10:00:00.000Z"
} | ConvertTo-Json

$response = curl -Method POST $baseUrl -Body $body -ContentType "application/json"
$newTask = $response.Content | ConvertFrom-Json
Write-Result $newTask
$newId = $newTask.idTarea
Write-Host "Tarea creada con idTarea = $newId" -ForegroundColor Green

# -------------------------------
Write-Step "OBTENER LA NUEVA TAREA POR ID"
$response = curl "$baseUrl/$newId"
$taskById = $response.Content | ConvertFrom-Json
Write-Result $taskById

# -------------------------------
Write-Step "ACTUALIZAR LA TAREA"
$updateBody = @{
    titulo = "Tarea de prueba actualizada visual"
    completada = $true
} | ConvertTo-Json

$response = curl -Method PUT "$baseUrl/$newId" -Body $updateBody -ContentType "application/json"
$updatedTask = $response.Content | ConvertFrom-Json
Write-Result $updatedTask

# -------------------------------
Write-Step "ELIMINAR LA TAREA"
$response = curl -Method DELETE "$baseUrl/$newId"
$deletedMsg = $response.Content | ConvertFrom-Json
Write-Host $deletedMsg.message -ForegroundColor Yellow

# -------------------------------
Write-Step "LISTAR TODAS LAS TAREAS DESPUÉS DEL BORRADO"
$response = curl $baseUrl
$allTasksAfterDelete = $response.Content | ConvertFrom-Json
Write-Result $allTasksAfterDelete
