#!/bin/bash
# switch_env.sh
# Permite alternar entre la configuración "blue" y "green" usando enlaces simbólicos.

if [ "$#" -ne 1 ]; then
    echo "Error: Se requiere el nombre del ambiente (blue o green)."
    exit 1
fi

COLOR=$1

# 1. Validación de entrada
if [ "$COLOR" != "blue" ] && [ "$COLOR" != "green" ]; then
    echo "Error: Color '$COLOR' inválido. Usa 'blue' o 'green'."
    exit 1
fi

echo "[Link Switcher] Iniciando transición hacia: $COLOR..."

# 2. Actualización del Enlace (Symlink forzado)
ln -sf /etc/nginx/environments/nginx_${COLOR}.conf /etc/nginx/conf.d/default.conf

# 3. Validación y Recarga
if nginx -t; then
    echo "[Link Switcher] Configuración exitosa. Ejecutando reload..."
    nginx -s reload
    echo "[Link Switcher] Tráfico enrutado con éxito a $COLOR."
else
    echo "Error: La configuración de Nginx no pasó la prueba de sintaxis."
    exit 1
fi
