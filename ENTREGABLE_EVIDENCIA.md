# Proyecto: Integración y Despliegue Continuo (CI/CD) - Blue/Green Deployment

**Materia:** [Nombre de la Materia]  
**Docente:** [Nombre del Profesor]  
**Estudiante:** [Tu Nombre]  
**Fecha:** 11 de Abril de 2026

---

## 1. Objetivo
Integrar la lógica de Cambio de Tráfico utilizando una estrategia de despliegue **Blue/Green** dentro de un flujo de Integración y Despliegue Continuo (CI/CD) automatizado en GitHub Actions.

## 2. Requerimientos Implementados

### 2.1. Estado del Entorno (Persistencia)
Se ha implementado el archivo `current_deploy.env` que habita en el servidor de producción. Este archivo guarda en la variable `ACTIVE_ENV` cuál es el color ("blue" o "green") que se encuentra productivo actualmente.

### 2.2. Lógica de Inversión en el Pipeline
Dentro del pipeline definido en `.github/workflows/deploy-blue-green.yml`, nos conectamos por SSH al servidor Google Cloud. En tiempo de ejecución, un script de bash lee el archivo de estado y gracias a una lógica condicional (`if/else`), invierte los identificadores de despliegue antes de inicializar la nueva versión de la aplicación.

### 2.3. Sustitución Automática con `envsubst`
En el servidor se encuentra corriendo un contenedor de Nginx funcionando como Reverse Proxy. El pipeline utiliza `envsubst` sobre la plantilla `nginx.conf.template` para inyectar dinámicamente la variable del contenedor destino y re-generar el archivo de configuración en caliente (`nginx.conf`), ejecutando posteriormente un recargo (`reload`) de Nginx para asegurar un despliegue sin caída de sistema (Zero Downtime).

---

## 3. Demostración Visual (Evidencia)

*(Nota para el estudiante: Reemplaza las siguientes secciones de evidencia con las fotos reales tras aplicar y correr tu pipeline)*

### Evidencia 1: Repositorio y Configuración de Secretos
*[Inserta aquí una captura de pantalla de los secretos de GitHub configurados con las credenciales del servidor Google Cloud]*

### Evidencia 2: Ejecución del Pipeline en GitHub Actions
*[Inserta aquí una captura de pantalla de un workflow ejecutado con éxito mostrando los logs "Desplegando en el ambiente objetivo..."]*

### Evidencia 3: Aplicación Productiva y Comprobación en Servidor
*[Inserta aquí una captura de pantalla que demuestre la aplicación corriendo desde tu IP o un log ejecuntando `$ cat current_deploy.env` en tu servidor GCP tras el despliegue]*

---

## 4. Enlace al Repositorio

Puedes revisar toda la implementación y el código del pipeline aquí:
**Link a mi GitHub**: `[Aquí el link completo a tu proyecto en GitHub]`
