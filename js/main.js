$(document).ready(init);
var currentSection= null;

function init()
{
    currentSection= $('#login');
    $('#btn_inicio').click(onClickAccion);
    $('#btn_reportar').click(onClickReportar);
    //$('#btn_tipo_ayuda').click(onClickTipoAyuda);
    $('#btn_centros_ayuda').click(onClickCentroAyuda); $('#btn_lista_desastres').click(onClickListDesastre);
    /*$('#btn_info_desastres').click(onClickInfoDesastre);*/
}

function onClickAccion()
{
    goToSection('accion');
      
}

function onClickReportar(){    
    goToSection('reportar-desastre');
    
    var toTipoAyuda = $('#m-buscar');
    toTipoAyuda.hide();
    $('#pac-input').hide();
    //initMap(); 
    initAutocomplete();
    onClickTipoAyuda(); 
    
}

function onClickTipoAyuda()
{    
    var btnBuscarAyuda = $("#btn_tipo_ayuda");       btnBuscarAyuda.click(showDivBuscarAyuda);
}
function showDivBuscarAyuda(event){
        event.preventDefault();
        var toBuscarAyuda = $('#d-info');
        var toTipoAyuda = $('#m-buscar');
        toBuscarAyuda.hide();            
        toTipoAyuda.show();
        $('#pac-input').show();                
    }
 $('#bombero').on('click',function(){search('bombero cerca de ong paz peru arequipa');});
 $('#hospital').on('click',function(){search('hospital cerca de ong paz peru arequipa');});
$('#comisaria').on('click',function(){search('comisaria cerca de ong paz peru arequipa');});
    function search(place){
            
             $('#pac-input').val('');
             $('#pac-input').val(place).focus().trigger({
                 type:'keypress',which:13,                
             });

        }

function onClickCentroAyuda()
{
    goToSection('lista-desastres');
}
function onClickListDesastre()
{
    goToSection('info-desastres');
}

function goToSection(_id)
{
    currentSection.removeClass('visible');
    var nextSection = $('#'+_id);
    nextSection.addClass('visible'); 
    currentSection=nextSection;    
}
 
function initAutocomplete() {
    getLocation();
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }    
}

function showPosition(position) {
            var myLatLng = {lat:position.coords.latitude,lon:position.coords.longitude};
            var map = new google.maps.Map(document.getElementById('map'), {
            
            center: {lat: myLatLng.lat, lng: myLatLng.lon},
            zoom: 16,
            mapTypeId: 'roadmap',
            disableDefaultUI: true
        }) ;
        var marker1 = new google.maps.Marker({        
        map: map,
        position: {lat: myLatLng.lat, lng: myLatLng.lon},
        title: 'Hello World!',
        //icon:"img/car.png"
    });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
         var delimitadorSurOeste = {lat:-18.088474,lng:-70.409693};
         var delimitadorNorEste = {lat:-0.1998849,lng:-75.2585993};
          var bounds = new google.maps.LatLngBounds(delimitadorSurOeste,delimitadorNorEste);
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            var request = {
                location: {lat:-16.4571456,lng:-71.5657791},
                radius: '500',
                types: ['store'],
                zoom:16
              };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location,
                request:request
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
}