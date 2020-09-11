Descarga e instalación
___________________________________________
Para comenzar a usar el proyecto, elija una de las siguientes opciones para comenzar:

•	Clonar el repositorio: git clone https://github.com/JeanKori/-Bikes-API.git

•	Descargar directamente desde GitHub como Zip
___________________________________________

Uso básico 

•	Después de la descarga, simplemente ejecute el comando: npm install 

•	Y luego para arrancar el proyecto ejecute: npm run devstart


•	Luego para lanzar una vista previa en vivo en su navegador predeterminado dirigirse a:

      http://localhost:3000/bicynet 
      
Para esta primera parte se ha facilitado la navegación atravez de enlaces desde el Frontend.
      
___________________________________________

Prueba API

Para facilitar el uso de los endpoint en Postman, se adjuntan las rutas y verbo http correspondiente:

Bicicletas

    •	Listado = GET: http://localhost:3000/api/bicicletas

    •	Nuevo Registro = POST: http://localhost:3000/api/bicicleta/create

    •	Actualización = PUT: http://localhost:3000/api/bicicleta/update

    •	Eliminación = DELETE: http://localhost:3000/api/bicicleta/delete
        
Usuarios

    •	Listado = GET: http://localhost:3000/api/users/
    
    •	Nuevo Registro = POST: http://localhost:3000/api/users/create
    
    •	Nueva Reservacion = POST: http://localhost:3000/api/users/reservar
  
___________________________________________

Test con Jasmine

Para ejecutar los test unitarios:

    •	Todos los test unitarios= ejecutar: npm test
    
Ejecucion Independiente:
    
    •	API bicileta= ejecutar: npx jasmine spec/API/bicicleta_api_test.spec.js
    
    •	models bicileta= ejecutar: npx jasmine spec/models/bicicleta_test.spec.js
    
    •	models usuario= ejecutar: npx jasmine spec/models/user_test.spec.js

___________________________________________
 
 Repositorio
 
 URL del repositorio en Github https://github.com/JeanKori/-Bikes-API.git
