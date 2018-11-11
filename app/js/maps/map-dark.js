// ------------------------------------------------
// Project Name: Mixio Coming Soon Template
// Project Description: Mixio - awesome coming soon template to kick-start your project
// Tags: mixio, coming soon, under construction, template, coming soon page, html5, css3
// Version: 1.0.0
// Build Date: July 2018
// Last Update: July 2018
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: http://mixdesign.club
// File name: map-dark.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. Google Map Parameters
//  2. Google Map Custom Marker Icon
//  3. Style Of The Map
//  4. Google Map Options
//  5. Inizialize The Map
//  6. Custom Marker
//  7. Custom zoom-in/zoom-out Buttons
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {
  // Insert Your Google Maps Parameters
  var latitude = 40.719193,
    longitude = -74.041071,
    map_zoom = 14;

  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var libMarkerURL = ( is_internetExplorer11 ) ? 'img/location/wedding-light.png' : 'img/location/wedding-light.svg';
  var resMarkerURL = ( is_internetExplorer11 ) ? 'img/location/hotel-light.png' : 'img/location/hotel-light.svg';

  var features = [
              {
                position: new google.maps.LatLng(40.719193, -74.041071),
                type: 'info',
                icon: resMarkerURL,
                title: 'Residence Inn Jersey City',
              }, {
                position: new google.maps.LatLng(40.709093, -74.040020),
                type: 'info',
                icon: libMarkerURL,
                title: 'Liberty House Restaurant',
              },
            ];

  // Google Map Custom Marker Icon
  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = ( is_internetExplorer11 ) ? 'img/location/location-light.png' : 'img/location/location-light.svg';


    var main_color = '#160c37',
      saturation_value= 1,
      brightness_value= 5;

      // Style Of The Map
      var style= [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ];

      // Google Map Options
      var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            gestureHandling: 'cooperative',
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style,
        }



      // Inizialize The Map
      var map = new google.maps.Map(document.getElementById('google-container'), map_options);

      // Custom Marker
      features.forEach(function(feature) {
        var marker = new google.maps.Marker({
            // position: new google.maps.LatLng(latitude, longitude),
            position: feature.position,
            map: map,
            visible: true,
            // icon: marker_url,
            icon: feature.icon,
            title: feature.title,
            label: feature.label,
        });
      });

      // Custom zoom-in/zoom-out Buttons
      function CustomZoomControl(controlDiv, map) {

          var controlUIzoomIn= document.getElementById('zoom-in'),
            controlUIzoomOut= document.getElementById('zoom-out');
          controlDiv.appendChild(controlUIzoomIn);
          controlDiv.appendChild(controlUIzoomOut);

        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });
      }

      var zoomControlDiv = document.createElement('div');
      var zoomControl = new CustomZoomControl(zoomControlDiv, map);

        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(zoomControlDiv);

});
