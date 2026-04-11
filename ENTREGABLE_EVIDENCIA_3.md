# Reporte Práctica 3: Enrutamiento Dinámico con Envsubst en Host Nativo

## 1. Archivos Desarrollados

Para cumplir con el requerimiento de una sustitución de variables de entorno en tiempo real sobre el servidor `nginx`, se construyó la siguiente infraestructura en el VPS:

### `nginx.conf.template`
Contiene la instrucción de bloque *upstream* indirecta, redirigiendo el peso del proxy a las variables generadas:
```nginx
server {
    listen 80;
    location / {
        proxy_pass http://${APP_TARGET_IP}:${APP_TARGET_PORT};
        add_header X-Deployment-Color "${DEPLOYMENT_COLOR}" always;
    }
}
```

### `the_switch.sh`
Script de Bash que funge como orquestador. Exporta variables para "Verde" y "Azul".
```bash
# Ejemplo del núcleo operativo:
export APP_TARGET_IP="192.168.1.20"
export APP_TARGET_PORT="8080"
export DEPLOYMENT_COLOR="green"

envsubst '${APP_TARGET_IP} ${APP_TARGET_PORT} ${DEPLOYMENT_COLOR}' < nginx.conf.template > /etc/nginx/conf.d/default.conf

if nginx -t; then
    systemctl reload nginx
fi
```

## 2. Evidencias del VPS Host

*AQUÍ PEGAR CAPTURA DEL SCRIPT CREADO EN LA TERMINAL Y SU EJECUCIÓN (mostrando el mensaje "Sintaxis exitosa")*

*AQUÍ PEGAR LA SALIDA DEL CURL DEMOSTRANDO LA CABECERA `X-Deployment-Color: green`*
