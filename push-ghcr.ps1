# push-ghcr.ps1
# Script limpio y corregido para subir la imagen Docker a GHCR

# ===========================
# 1. Configuracion
# ===========================
$GH_USER = "iftsnro29danielcoriacoria-boop"
$GH_REPO = "todo-app" 
$LOCAL_IMAGE = "todo-app-app:latest"

# Pedir token seguro
$GH_TOKEN = Read-Host -Prompt "Ingresa tu token personal de GHCR"

# ===========================
# 2. Login a GHCR
# ===========================
Write-Host "Iniciando login en GHCR..."
$GH_TOKEN | docker login ghcr.io -u $GH_USER --password-stdin

if ($LASTEXITCODE -eq 0) {
    Write-Host "Login exitoso"
} else {
    Write-Host "Error en login - Verifique el token y los permisos"
    exit 1
}

# ===========================
# 3. Taggear la imagen para GHCR
# ===========================
# Corregido: Se usan llaves {} para evitar el error de sintaxis del tag
$GHCR_IMAGE = "ghcr.io/$GH_USER/${GH_REPO}:latest" 
Write-Host "Taggeando imagen: $LOCAL_IMAGE -> $GHCR_IMAGE"
docker tag $LOCAL_IMAGE $GHCR_IMAGE

# ===========================
# 4. Push a GHCR
# ===========================
Write-Host "Subiendo imagen a GHCR..."
docker push $GHCR_IMAGE

if ($LASTEXITCODE -eq 0) {
    Write-Host "Imagen subida correctamente a GHCR"
} else {
    Write-Host "Error al subir imagen - Verifique permisos del token"
    exit 1
}