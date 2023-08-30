# Backend de Reserva de Turnos - Clínica

Este es el backend para una aplicación de reserva de turnos en una clínica médica. Permite gestionar pacientes, médicos, turnos y especialidades médicas. La aplicación utiliza tecnologías como JavaScript, JWT (JSON Web Tokens), Bcrypt, Express, Node.js y MongoDB Atlas para el almacenamiento de datos.

## Requisitos Previos

- Node.js: Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde [https://nodejs.org/](https://nodejs.org/).

## Instalación

1. Clona este repositorio o descarga el código fuente.

2. Navega a la carpeta del proyecto usando la terminal.

3. Ejecuta el siguiente comando para instalar las dependencias:

   npm install

##Crea un archivo .env en la raíz del proyecto para configurar las variables de entorno necesarias. Aquí hay un ejemplo de cómo podría verse:

PORT=3000

DB_URI=URL_de_conexión_a_MongoDB_Atlas

JWT_SECRET=Tu_Clave_Secreta_para_JWT

##Inicia el servidor con el siguiente comando:

    npm start

##Modo de Uso

Una vez que el servidor esté en funcionamiento, puedes utilizar herramientas como Postman, cURL o aplicaciones front-end para interactuar con los endpoints de la API.
Autenticación con JWT

El backend utiliza JSON Web Tokens (JWT) para la autenticación de usuarios. Cuando los usuarios se registran o inician sesión, se les proporciona un token JWT que deben incluir en los encabezados de las solicitudes para acceder a rutas protegidas.

Algunos ejemplos de rutas que requieren autenticación:

    GET /pacientes: Obtener la lista de pacientes.
    POST /pacientes: Crear un nuevo paciente.
    GET /medicos: Obtener la lista de médicos.
    POST /medicos: Crear un nuevo médico.
    POST /turnos: Crear un nuevo turno.

Asegúrate de consultar la documentación de la API para obtener una lista completa de los endpoints y sus respectivas instrucciones de uso.

##Notas Finales

Este proyecto es una simulación y no está destinado a un uso en producción. La información proporcionada es ficticia y se utiliza únicamente con fines educativos y de demostración. Si deseas implementar esta aplicación en un entorno real, asegúrate de considerar las mejores prácticas de desarrollo.

Autores: [Luis Chrestia / Velldo Germán]

Si tienes alguna pregunta o necesitas ayuda, no dudes en crear un issue en este repositorio. ¡Gracias por tu interés en este proyecto!
