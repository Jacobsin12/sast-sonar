# Reporte: Blue-Green Deployment (Actividad 2)

**Estudiante:** [Tu Nombre]  
**Materia:** [Materia]  
**Fecha:** 11 de Abril de 2026

---

## 1. Implementación Técnica (Symlinks vs envsubst)

En esta práctica, hemos evolucionado nuestra técnica de despliegue pasando de una recarga de Nginx generada en "caliente" (usando la compilación dinámica de `envsubst`), a una arquitectura de alternancia mediante **Enlaces Simbólicos (symlinks)** de archivos de configuración estáticos preexistentes.

### Cuadro Comparativo de Técnicas

| Característica | Técnica 1: Plantillas con `envsubst` | Técnica 2: Symlinks (`ln -sf`) |
| :--- | :--- | :--- |
| **Funcionamiento** | El pipeline lee una plantilla (archivo base lleno de variables `${VAR}`) y en el momento del despliegue inyecta el valor deseado de la variable para generar un archivo final totalmente nuevo `nginx.conf`. | Ambos ambientes (`nginx_blue.conf`, `nginx_green.conf`) ya existen físicamente con todas sus reglas configuradas. Lo único que se hace es que Nginx lee un "acceso directo" (`default.conf`) que el script cambia de destino apuntando a uno de los dos archivos físicos estáticos. |
| **Soporte Estructural** | Ideal cuando la infraestructura es sumamente dinámica, ya que permite reemplazar decenas de variables de servidor (como IPs, nombres de dominio y puertos variables). | Ideal en infraestructuras estructuradas donde el destino "Blue" y el destino "Green" son ambientes perpetuos, conocidos y congelados (Puertos reservados conocidos como 8080 y 8081). |
| **Ventajas Principales** | Código muy limpio en el repositorio (solo exite un archivo de plantilla `template`). | **Cero Riesgos Sintácticos:** Como los archivos ya estaban pre-escritos por un administrador y probados estáticamente, es imposible que se corrompa la sintaxis web por culpa de un mal reemplazo de cadenas de texto de Bash. |
| **Cabeceras Diferenciadas** | Se dificultaba inyectar comportamientos únicos si no estaban contemplados en la plantilla base. O se inyectaba a todo, o a nada. | Los archivos estáticos permiten tener cabeceras personalizadas según el color sin usar variables dinámicas engorrosas (ej. la inyección literal de `X-Deployment-Color "blue"`). |

---

## 2. Puesta en Marcha (El Link Switcher)

Se creó de manera exitosa el script `switch_env.sh` que actúa como el "Orquestador Nginx".

**Código del Enlace Maestro:**
```bash
# Validamos entrada para que solo funcione para blue o green
ln -sf /etc/nginx/environments/nginx_${COLOR}.conf /etc/nginx/conf.d/default.conf

# Se hace la prueba de fallos de syntaxis previo al recargo (Safe-Reload)
if nginx -t; then
    nginx -s reload
fi
```

### Evidencia: Cambio en el Sistema

[ AÑADIR AQUI CAPTURA DEL SERVIDOR EJECUTANDO `ls -l /etc/nginx/conf.d/` DONDE SE VEA EL SYMLINK -> `/etc/nginx/environments/nginx_green.conf` ]

### Evidencia: Recarga Zero-Downtime

[ AÑADIR AQUI CAPTURA DEL PIPELINE DE GITHUB EN VERDE O DE LA PÁGINA WEB RECARGADA ]

### Evidencia: Verificación de Cabeceras HTTP (Opcional para puntos extra)

[ AÑADIR AQUI CAPTURA DE LAS HERRAMIENTAS DE DESARROLLADOR DEL NAVEGADOR (`F12 -> Network`) DONDE SE APRECIE EL RESPONSE HEADER `X-Deployment-Color: green` o `blue` ]
