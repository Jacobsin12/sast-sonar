#!/bin/bash
# El Mecanismo de Conmutación (The Switch)

if [ "$#" -ne 1 ]; then
    echo "Error: Se requiere el nombre del ambiente (blue o green)."
    exit 1
fi

COLOR=$1

if [ "$COLOR" == "green" ]; then
    export APP_TARGET_IP="192.168.1.20"
    export APP_TARGET_PORT="8080"
    export DEPLOYMENT_COLOR="Green"
elif [ "$COLOR" == "blue" ]; then
    export APP_TARGET_IP="192.168.1.21"
    export APP_TARGET_PORT="8081"
    export DEPLOYMENT_COLOR="Blue"
fi

echo "Cambiando tráfico a ambiente: $COLOR"

# 'envsubst' reemplaza las variables en la plantilla y genera el archivo real de Nginx
envsubst '${APP_TARGET_IP} ${APP_TARGET_PORT} ${DEPLOYMENT_COLOR}' < nginx.conf.template > /etc/nginx/conf.d/default.conf

# Validar la configuración y recargar Nginx
nginx -t && systemctl reload nginx
