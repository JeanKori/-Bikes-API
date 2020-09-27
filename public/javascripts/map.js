
var map = L.map('mapid', {
    center: [12.14301, -86.22379],
    zoom: 13
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map)

//Marcadores
// L.marker([12.14258, -86.22402]).addTo(map);
// L.marker([12.1405460, -86.2291840]).addTo(map);
// L.marker([12.1418754, -86.2246273]).addTo(map);


// Agreagacion de los Marcadores de bicicletas en el MAPA a traves de la API
$.ajax({
    dataType: "json",
    url: "/api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach( (bici) => {
            L.marker(bici.ubicacion, {title: bici.code}).addTo(map);
        });
    }
})