var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse:true}
    }
});

bicicletaSchema.statics.createInstance= function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString= (()=>{
    return'code: '+ this.code + '| modelo: '+this.color; 
});

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({},cb);
};

bicicletaSchema.statics.add = function(bici,cb){
    this.create(bici,cb);
};

bicicletaSchema.statics.findByCode = function(code,cb){
    return this.findOne({code: code},cb);
};

bicicletaSchema.statics.removeByCode = function(code,cb){
    return this.deleteOne({code: code},cb);
};


bicicletaSchema.statics.updateByCode = function(code,bike,cb){
    return this.findOneAndUpdate({code: code}, bike,{new:true, useFindAndModify:false},cb);
};


module.exports = mongoose.model('bicicletas', bicicletaSchema);