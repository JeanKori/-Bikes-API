# Bicycle Network

Proyecto desarrollado con [Node JS](https://nodejs.org/es/) version 12.18.2.

Descarga e instalación
___________________________________________
Para comenzar a usar el proyecto, elija una de las siguientes opciones para comenzar:

•	Clonar el repositorio: git clone https://github.com/JeanKori/-Bikes-API.git

•	Descargar directamente desde GitHub como Zip
___________________________________________

Uso básico 

•	Después de la descarga, simplemente ejecute el comando: "npm install" para la instalacion de los paquetes del proyecto y sus dependencias 

•	Para levantar el servidor web ejecute: "npm run devstart"


•	Luego para lanzar una vista previa en vivo en su navegador predeterminado dirigirse a:

      http://localhost:3000/bicynet 
      
Para esta parte encontrara que el sitio lo redirigira hacia el login, debido al middleware implementado que no permitira pasar al index sin haberse logueado.

Especificamente para el envio de email, a manera de prueba se esta utilizando SMTP falso a traves del servicio de "Ethereal" (https://ethereal.email/) ya que se esta implementado "Nodemailer", por lo cual resulta practico. Se recomienda tener una cuenta de Ethereal para probar la aplicacion en este punto, una vez que tenga su cuenta, modifique el archivo "mailer.js" en la carpeta "mailer" ubicando las credenciales de su cuenta Ethereal donde se indica; Posteriromente podra utilizar la aplicacion y vera los procesos como verificacion de cuenta, generacion de token para recuperacion de contraseña.

Si la configuracion del archivo "mailer.js" es exitosa, podra realizar la evaluacion hasta este punto de manera exitosa, a traves del frontend sin ningun inconveniente.
      
___________________________________________

Prueba API

Para facilitar el uso de los endpoint en Postman, se adjuntan las rutas y verbo http correspondiente:

Bicicletas

    •	Listado => GET => http://localhost:3000/api/bicicletas

    •	Nuevo Registro => POST => http://localhost:3000/api/bicicleta/create

    •	Actualización => PUT => http://localhost:3000/api/bicicleta/update

    •	Eliminación => DELETE => http://localhost:3000/api/bicicleta/delete
        
Usuarios

    •	Listado => GET => http://localhost:3000/api/users/
    
    •	Nuevo Registro => POST => http://localhost:3000/api/users/create
    
    •	Nueva Reservacion => POST => http://localhost:3000/api/users/reservar
  
___________________________________________

Test con Jasmine

Para verificar todos los test unitarios de la carpeta spec:

    •	ejecutar => npm test
    
Para una ejecucion independiente de la pruebas, realizar:
    
    •	API bicileta => ejecutar => npx jasmine spec/API/bicicleta_api_test.spec.js
    
    •	models bicileta => ejecutar => npx jasmine spec/models/bicicleta_test.spec.js
    
    •	models usuario= ejecutar => npx jasmine spec/models/user_test.spec.js

___________________________________________
 
 Repositorio
 
 URL del repositorio en Github https://github.com/JeanKori/-Bikes-API.git
