# Deploy-to-ACR.ps1
# Script para construir y desplegar una imagen Docker a Azure Container Registry

# Variables a configurar
$ACR_NAME = "controlApp" # Reemplaza con el nombre de tu ACR
$IMAGE_NAME = "heroes-api"
$IMAGE_TAG = "latest"

# Iniciar sesión en Azure (si no estás ya autenticado)
Write-Host "Iniciando sesión en Azure..." -ForegroundColor Cyan
az login

# Iniciar sesión en ACR
Write-Host "Iniciando sesión en Container Registry $ACR_NAME..." -ForegroundColor Cyan
az acr login --name $ACR_NAME

# Construir la imagen Docker
Write-Host "Construyendo imagen Docker ${IMAGE_NAME}:${IMAGE_TAG}..." -ForegroundColor Cyan
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

# Etiquetar la imagen para ACR
Write-Host "Etiquetando imagen para ACR..." -ForegroundColor Cyan
docker tag "${IMAGE_NAME}:${IMAGE_TAG}" "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}"

# Subir la imagen a ACR
Write-Host "Subiendo imagen a ACR..." -ForegroundColor Cyan
docker push "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}"

Write-Host "¡Imagen subida exitosamente a ACR!" -ForegroundColor Green
Write-Host "URL de la imagen: ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}" -ForegroundColor Yellow
