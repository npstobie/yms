var formatted_listings = [];
// rent, square feet, photo, bed/bath, listing title, address, details link, apply link, latitude, longitude
$.get("/listing_data")
  .done(function(data){
    formatListingData(data);
    console.log(formatted_listings);
  })

function formatListingData(listing_data) {
  var properties = listing_data.RentLinx.Properties[0].Property
  for (var i=0; i<properties.length; i++) {
    for (var x=0; x<properties[i].Unit.length; x++) {
      var listing = {}
      listing.rent = properties[i].Unit[x].Rent[0];
      listing.photo = properties[i].PropertyPhoto[0]['$'].ImageUrl;
      listing.beds = properties[i].Unit[x].Bedrooms[0];
      listing.baths = properties[i].Unit[x].FullBaths[0] + properties[i].Unit[x].HalfBaths[0];
      listing.title = properties[i].Unit[x].Description[0].split('-')[0];
      listing.street_address = properties[i].Unit[x].name[0];
      listing.city = properties[i].City[0];
      listing.zip = properties[i].Zip[0];
      listing.state = properties[i].State[0];
      listing.listing_id = properties[i].Unit[x].ApplicationLink[0]['$'].Url.match(/\=(.*?)\&/)[1];
      listing.application_link = properties[i].Unit[x].ApplicationLink[0]['$'].Url;
      listing.description_link = "https://yale.appfolio.com/listings/detail/" + properties[i].Unit[x].ApplicationLink[0]['$'].Url.match(/\=(.*?)\&/)[1];
      listing.latitude = properties[i].Latitude[0];
      listing.longitude = properties[i].Longitude[0];
      listing.square_feet = properties[i].Unit[x].MaxSquareFeet[0];
      console.log(listing)
      formatted_listings.push(listing);
    }   
  }
}

//intialize the map
function initialize() {
  var mapOptions = {
    zoom: 13,
    scrollwheel: false,
    center: new google.maps.LatLng(39.29000, -76.5000)
  };

var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);


// MARKERS
/****************************************************************/

//add a marker1
var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    icon: 'images/pin.png'
});

//add a marker2
var marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(39.2833, -76.5267),
    map: map,
    icon: 'images/pin.png'
});

//add a marker3
var marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(39.2833, -76.5567),
    map: map,
    icon: 'images/pin.png'
});

//add a marker4
var marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(39.3133, -76.5597),
    map: map,
    icon: 'images/pin.png'
});

//add a marker5
var marker5 = new google.maps.Marker({
    position: new google.maps.LatLng(39.2933, -76.5650),
    map: map,
    icon: 'images/pin.png'
});

//add a marker6
var marker6 = new google.maps.Marker({
    position: new google.maps.LatLng(39.2723, -76.5400),
    map: map,
    icon: 'images/pin.png'
});



// INFO BOXES
/****************************************************************/

//show info box for marker1
var contentString = '<div class="info-box"><img src="images/property-img1.jpg" class="info-box-img" alt="" /><h4>587 Smith Avenue</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ultrices metus' + 
                    ' sit amet [...]</p><a href="property_single.html" class="button small">View Details</a><br/></div>';

var infowindow = new google.maps.InfoWindow({ content: contentString });

google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });


//show info box for marker2
google.maps.event.addListener(marker2, 'click', function() {
    infowindow.open(map,marker2);
  });

//show info box for marker3
google.maps.event.addListener(marker3, 'click', function() {
    infowindow.open(map,marker3);
  });

//show info box for marker4
google.maps.event.addListener(marker4, 'click', function() {
    infowindow.open(map,marker4);
  });

//show info box for marker5
google.maps.event.addListener(marker5, 'click', function() {
    infowindow.open(map,marker5);
  });

//show info box for marker6
google.maps.event.addListener(marker6, 'click', function() {
    infowindow.open(map,marker6);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);