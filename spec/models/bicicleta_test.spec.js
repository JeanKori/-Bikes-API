var Bicicleta = require('../../models/bikes');

beforeEach( ()=> { Bicicleta.allBicis = []; });//metodo que proporciona jasmine--indica la ejecucion antes de cada test

// Listado de bicicleta
describe('Listado_Bicicletas',()=>{
    it('Listado vacio en inicio',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

// Agregar Nueva Bicicleta
describe('Agregar_Bicicleta',()=>{
    it('Agregacion de una',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);//En un comienzo no se ha agregado registro

        //ejemplo-metodo de Agregacion
        var bike = new Bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
        Bicicleta.add(bike);

        expect(Bicicleta.allBicis.length).toBe(1);//Luego de la agregacion se espera 1 registro
        expect(Bicicleta.allBicis[0]).toBe(bike);//comparamos que la nueva agregacion corresponda con el registro indicado en el metodo de agregacion  
    });
});

// Buscar una bicicleta
describe('Buscar_Bicicleta',()=>{
    it('busqueda por identificador',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);//En un comienzo no hay registro

        //Agregamos para comprobar la busqueda
        var bike1 = new Bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
        var bike2 = new Bicicleta('2','orange','montañera',[12.14258, -86.2291117]);
        Bicicleta.add(bike1);
        Bicicleta.add(bike2);

        var searchBike = Bicicleta.findByID(2);//Variable que guarda el elemento que definimos para la busqueda

        // comprobamos que la busqueda especifica corresponda con los atributos del elemento correspondiente 
        expect(searchBike.id).toBe(bike2.id);
        expect(searchBike.color).toBe(bike2.color);
        expect(searchBike.modelo).toBe(bike2.modelo);  
    });
});
