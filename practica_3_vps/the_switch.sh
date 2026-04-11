#!/bin/bash
# The Switch - Script de Conmutación utilizando envsubst nativo

if [ "$#" -ne 1 ]; then
    echo "Error: Debe ingresar 'blue' o 'green'."
    exit 1
fi

COLOR=$1

# 1. Exportar las variables necesarias
if [ "$COLOR" == "green" ]; then
    export APP_TARGET_IP="192.168.1.20"
    export APP_TARGET_PORT="8080"
    export DEPLOYMENT_COLOR="green"
elif [ "$COLOR" == "blue" ]; then
    export APP_TARGET_IP="192.168.1.21" # Puedes simular otra IP aquí
    export APP_TARGET_PORT="8081"
    export DEPLOYMENT_COLOR="blue"
else
    echo "Error: Color no válido."
    exit 1
fi

echo "Generando configuración para ambiente $COLOR (Destino: $APP_TARGET_IP:$APP_TARGET_PORT)..."

# 2. Utilizar el comando envsubst para procesar la plantilla hacia el directorio nativo
envsubst '${APP_TARGET_IP} ${APP_TARGET_PORT} ${DEPLOYMENT_COLOR}' < nginx.conf.template > /etc/nginx/conf.d/default.conf

# 3. Validación Crítica y Recarga
if nginx -t; then
    echo "✔ Validación exitosa. Recargando servicio..."
    systemctl reload nginx
    echo "✔ Despliegue de ambiente $COLOR completado."
else
    echo "✖ Error: sintaxis inválida en archivo generado. Abortando recarga."
    exit 1
fi
