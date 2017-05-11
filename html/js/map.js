function formatListingData(listing_data) {
  var formatted_listings = [];
  var properties = listing_data.RentLinx.Properties[0].Property
  for (var i=0; i<properties.length; i++) {
    for (var x=0; x<properties[i].Unit.length; x++) {
      var listing = {}
      try {
        listing.rent = properties[i].Unit[x].Rent[0];
      } catch (e) {
        listing.rent = undefined;
      }
      try {
        listing.photo = properties[i].PropertyPhoto[0]['$'].ImageUrl;  
      } catch (e) {
        listing.photo = undefined;
      }
      try {
        listing.beds = properties[i].Unit[x].Bedrooms[0];
      } catch (e) {
        listing.beds = undefined;
      }
      try {
        listing.full_baths = parseInt(properties[i].Unit[x].FullBaths[0]);
      } catch (e) {
        listing.full_baths = undefined;
      }
      try {
        listing.half_baths = parseInt(properties[i].Unit[x].HalfBaths[0]);
      } catch (e) {
        listing.half_baths = undefined;
      }
      try {
        listing.title = properties[i].Unit[x].Description[0].split('-')[0];
      } catch (e) {
        listing.title = undefined;
      }
      try {
        listing.street_address = properties[i].Unit[x].Name[0];
      } catch (e) {
        listing.street_address = undefined;
      }
      try {
        listing.city = properties[i].City[0];
      } catch (e) {
        listing.city = undefined;
      }
      try {
        listing.zip = properties[i].Zip[0];
      } catch (e) {
        listing.zip = undefined;
      }
      try {
        listing.state = properties[i].State[0];
      } catch (e) {
        listing.state = undefined;
      }
      try {
        listing.listing_id = properties[i].Unit[x].ApplicationLink[0]['$'].Url.match(/\=(.*?)\&/)[1];
      } catch (e) {
        listing.listing_id = undefined;
      }
      try {
        listing.application_link = properties[i].Unit[x].ApplicationLink[0]['$'].Url;
      } catch (e) {
        listing.application_link = undefined;
      }
      try {
        listing.description_link = "https://yale.appfolio.com/listings/detail/" + properties[i].Unit[x].ApplicationLink[0]['$'].Url.match(/\=(.*?)\&/)[1];
      } catch (e) {
        listing.description_link = undefined;
      }
      try {
        listing.latitude = properties[i].Latitude[0];
      } catch (e) {
        listing.latitude = undefined;
      }
      try {
        listing.longitude = properties[i].Longitude[0];
      } catch (e) {
        listing.longitude = undefined;
      }
      try {
        listing.square_feet = properties[i].Unit[x].MaxSquareFeet[0];
      } catch (e) {
        listing.square_feet = undefined;
      }
      formatted_listings.push(listing);
    }   
  }
  console.log(formatted_listings);
  return formatted_listings;
}


var prev_info_window = false;
//intialize the map
function initialize(listings) {
  var mapOptions = {
    zoom: 11,
    scrollwheel: false,
    center: new google.maps.LatLng(34.0522, -118.2437)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

  // createMarkers(listings);

  var markers = [];
  var content_strings = [];
  var info_windows = [];
  
  function createEventListener(num){
    google.maps.event.addListener(markers[num], 'click', function() {
      if (prev_info_window) {
         prev_info_window.close();
      }
      prev_info_window = info_windows[num];
      info_windows[num].open(map, markers[num]);
    });
  }

  for (var i=0; i<listings.length; i++) {
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(listings[i].latitude, listings[i].longitude),
      map: map,
      icon: 'images/pin.png'
    })
    content_strings[i] = '<div class="info-box">';

    if (listings[i].photo){
      content_strings[i] += ('<img src="' + listings[i].photo + '" class="info-box-img" alt="Error Retreiving image" />')
      // content_strings[i] += ('<img src="' + listings[i].photo + '" class="info-box-img" onerror="this.style.display=' + "'none'\"" + ' />')
    }
    if (listings[i].street_address) {
      content_strings[i] += ('<h4 class="info-box-title">' + listings[i].street_address + '</h4>')
    } else {
      content_strings[i] += '<h4>Click for Address</h4>'
    }
    listings[i].title ? content_strings[i] += ('<p>' + listings[i].title + '</p>') : content_strings[i] += ('<p>Available Now!</p>')
    content_strings[i] += '<div class="apply-buttons"><a href="' + listings[i].description_link + '" class="button small pop-up-button">View Details</a>' + '<a href="' + listings[i].application_link + '" class="button small pop-up-button">Apply Now</a></div><br/></div>';

    // content_strings[i] = '<div class="info-box"><img src="' + listings[i].photo + '" class="info-box-img" alt="" /><h4>' + listings[i].street_address + '</h4><p>' + (listings[i].title || "Available Now!") + '</p><a href="' + listings[i].description_link + '" class="button small">View Details</a>' + '<a href="' + listings[i].application_link + '" class="button small">View Details</a><br/></div>';

    info_windows[i] = new google.maps.InfoWindow({ content: content_strings[i] });

    createEventListener(i)
  }
}

$.get("/listing_data")
  .done(function(data){
    if (data.RentLinx === undefined){
      debugger
    }
    google.maps.event.addDomListener(window, 'load', function(){initialize(formatListingData(data))});
  })
  .fail(function(a,b){
    debugger
  })


