var bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

// ejemplo solo para implementacion de arquitectura

bicicleta.prototype.tostring = function(){
    return'id: '+ this.id + "| modelo: "+this.modelo 
}
bicicleta.allBicis= [];
bicicleta.add = function(AddBike){
    bicicleta.allBicis.push(AddBike);
}

bicicleta.findByID = ((BiciID)=>{
    var aBici = bicicleta.allBicis.find(x => x.id == BiciID);
    if(aBici){
        return aBici;
    }
    else
        throw new Error(`No existe una bicicleta identificada con el id: ${BiciID}`);
});

bicicleta.removeByID = ((BiciId) => {
    for (let i = 0; i < bicicleta.allBicis.length; i++) {
        if(bicicleta.allBicis[i].id == BiciId){
            bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
});

var b1 = new bicicleta('1','red','urbana',[12.1404590, -86.2290317]);
var b2 = new bicicleta('2','orange','urbana',[12.14258, -86.2291117]);

// bicicleta.add(b1);
// bicicleta.add(b2);

// End ejemplo

module.exports= bicicleta;