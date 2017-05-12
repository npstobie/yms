var formatted_data;
var urlParams;

var sfv_arr = [34.200457, -118.483315, 12];
var westside_arr = [34.054663, -118.445893, 12];
var hollywood_arr = [34.097861, -118.346186, 13];
var all_arr = [34.172871, -118.437706, 11];
var los_angeles_arr = [34.100419, -118.249198, 12];

var lat_long = all_arr;

var area_sentences = {
  los_angeles: ' in LA',
  sfv: ' in the San Fernando Valley',
  hollywood: ' in Hollywood',
  westside: ' on the Westside'
}


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
    zoom: lat_long[2],
    scrollwheel: false,
    center: new google.maps.LatLng(lat_long[0], lat_long[1])
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

  // createMarkers(listings);

  var markers = {};
  var content_strings = [];
  var info_windows = {};
  
  function createEventListener(id){
    google.maps.event.addListener(markers[id], 'click', function() {
      if (prev_info_window) {
         prev_info_window.close();
      }
      prev_info_window = info_windows[id];
      info_windows[id].open(map, markers[id]);
    });
  }

  for (var i=0; i<listings.length; i++) {
    markers[listings[i].listing_id] = new google.maps.Marker({
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

    info_windows[listings[i].listing_id] = new google.maps.InfoWindow({ content: content_strings[i] });

    createEventListener(listings[i].listing_id)
  }
}

function reGet() {
  $.get("/listing_data")
    .done(function(data){
      if (data.RentLinx === undefined){
        window.location = '/home'
      }
      formatted_data = formatListingData(data);
      urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('loc')) {
        sortByArea(urlParams.get('loc'))
        var str = urlParams.get('loc') + '_arr'
        lat_long = eval(str);
      } else {
        showAll()
      }
      createListingItems(formatted_data);
      google.maps.event.addDomListener(window, 'load', function(){initialize(formatted_data)});
    })
    .fail(function(err){
      window.location = '/home'
    })
}

$.get("/listing_data")
  .done(function(data){
    if (data.RentLinx === undefined){
      reGet();
    }
    formatted_data = formatListingData(data);
    urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('loc')) {
      sortByArea(urlParams.get('loc'))
      var str = urlParams.get('loc') + '_arr'
      lat_long = eval(str);
    } else {
      showAll()
    }
    createListingItems(formatted_data);
    google.maps.event.addDomListener(window, 'load', function(){initialize(formatted_data)});
  })
  .fail(function(err){
    window.location = '/home'
  })

// to any person who ever has to touch this block of code... I sincerely apologize
function createListingItems(listings) {
  var listing_blocks = {};
  for (var i=0; i<listings.length; i++) {
    var block = '<div class="col-lg-6 col-md-6"><div class="property shadow-hover"><a class="property-img"><div class="img-fade"></div><div class="property-tag button status">For Rent</div><div class="property-price">';
    if (listings[i].rent){
      block += ('$' + listings[i].rent.toString());
    }
    block +=  ' <span>Per Month</span></div><div class="property-color-bar"></div><img class="prop-img" src="'
    if (listings[i].photo) {
      block += listings[i].photo
    } else {
      block += 'images/img-error.jpg'
    }
    block += '" /></a><div class="property-content"><div class="property-title"><h4><a>'
    if (listings[i].title) {
      block += listings[i].title;
    } else {
      block += 'Beautiful Home'
    }
    block += '</a></h4><p class="property-address"><i class="fa fa-map-marker icon"></i>'
    
    if (listings[i].street_address) {
      block += listings[i].street_address;
    } else {
      block += 'Visit Listing for Address'
    }
    block += '</p></div><table class="property-details"><tr><td class="<listing-btns></listing-btns>"><i class="fa fa-bed"></i> '
    if (listings[i].beds) {
      block += listings[i].beds
    } else {
      block += 'N/A'
    }
    block += '</td><td class="<listing-btns></listing-btns>"><i class="fa fa-tint"></i> '
    if (listings[i].full_baths || listings[i].half_baths) {
      num = parseInt(listings[i].full_baths) + parseInt(listings[i].half_baths)
      block += num
    } else {
      block += 'N/A'
    }
    block += '</td><td class="<listing-btns></listing-btns>"><i class="fa fa-expand"></i> '
    if (listings[i].square_feet) {
      block += (listings[i].square_feet + ' Sq Ft')
    } else {
      block += 'N/A'
    }
    block += '</td></tr></table></div><div class="property-footer listing-btns"><a href="'
    block += listings[i].description_link
    block += '" class="button small pad-btn">View Details</a><a href="'
    block += listings[i].application_link
    block += '" class="button small pad-btn">Apply Now</a><div class="clear"></div></div></div></div>'

    listing_blocks[listings[i].listing_id] = block;
  }
  appendProperties(listing_blocks);
  $(".prop-img").on("error", function(){
    $(this).attr('src', 'images/img-error.jpg');
  });
  
  if (listings.length === 0) {
    $('#property-list').innerHTML += "<h4>We could not find any properties " + area_sentences[urlParams.get('loc')] + ". <a href='/listings-map'>Click Here</a> to see all of our available listings.</h4>"
  }
}

function createListingGridItems(listings) {
  var listing_blocks = {};
  for (var i=0; i<listings.length; i++) {
    var block = '<div class="col-lg-4 col-md-4"><div class="property shadow-hover"><a class="property-img"><div class="img-fade"></div><div class="property-tag button status">For Rent</div><div class="property-price">';
    if (listings[i].rent){
      block += ('$' + listings[i].rent.toString());
    }
    block +=  ' <span>Per Month</span></div><div class="property-color-bar"></div><img class="prop-img" src="'
    if (listings[i].photo) {
      block += listings[i].photo
    } else {
      block += 'images/img-error.jpg'
    }
    block += '" /></a><div class="property-content"><div class="property-title"><h4><a>'
    if (listings[i].title) {
      block += listings[i].title;
    } else {
      block += 'Beautiful Home'
    }
    block += '</a></h4><p class="property-address"><i class="fa fa-map-marker icon"></i>'
    
    if (listings[i].street_address) {
      block += listings[i].street_address;
    } else {
      block += 'Visit Listing for Address'
    }
    block += '</p></div><table class="property-details"><tr><td class="<listing-btns></listing-btns>"><i class="fa fa-bed"></i> '
    if (listings[i].beds) {
      block += listings[i].beds
    } else {
      block += 'N/A'
    }
    block += '</td><td class="<listing-btns></listing-btns>"><i class="fa fa-tint"></i> '
    if (listings[i].full_baths || listings[i].half_baths) {
      num = parseInt(listings[i].full_baths) + parseInt(listings[i].half_baths)
      block += num
    } else {
      block += 'N/A'
    }
    block += '</td><td class="<listing-btns></listing-btns>"><i class="fa fa-expand"></i> '
    if (listings[i].square_feet) {
      block += (listings[i].square_feet + ' Sq Ft')
    } else {
      block += 'N/A'
    }
    block += '</td></tr></table></div><div class="property-footer listing-btns"><a href="'
    block += listings[i].description_link
    block += '" class="button small pad-btn">View Details</a><a href="'
    block += listings[i].application_link
    block += '" class="button small pad-btn">Apply Now</a><div class="clear"></div></div></div></div>'

    listing_blocks[listings[i].listing_id] = block;
  }
  appendProperties(listing_blocks);
  $(".prop-img").on("error", function(){
    $(this).attr('src', 'images/img-error.jpg');
  });
}

function appendProperties(html){
  var pair = false;
  var full_block = "";
  for (key in html) {
    if (pair) {
      full_block += html[key];
      full_block += '</div>'
      pair = false;
    } else {
      full_block += '<div class="row">'
      full_block += html[key];
      pair = true;
    }
  }
  $('#property-list').innerHTML += full_block;
}

function appendGridProperties(html){
  var pair = 0;
  var full_block = "";
  for (key in html) {
    if (pair === 2) {
      full_block += html[key];
      full_block += '</div>'
      pair = 0;
    } else {
      full_block += '<div class="row">'
      full_block += html[key];
      pair += 1;
    }
  }
  $('#property-list').innerHTML += full_block;
}

var sfv = [91201, 91303, 91306, 91307, 91311, 91316, 91324, 91331, 91335, 91342, 91343, 91344, 91345, 91356, 91364, 91372, 91401, 91402, 91413, 91423, 91501, 91601, 91604, 91608, 91617]

var hollywood = [90028, 90038, 90068, 90069,90046, 90048, 90004, 90029]

var westside = [90405, 90291, 90066, 90404, 90405, 90402, 90401, 90403, 90292, 90064, 90025, 90024, 90049, 90239, 90034, 90067, 90232, 90035, 90212, 90210]

var los_angeles = [90014, 90013, 90071, 90017, 90015, 90012, 90021, 90023, 90058, 90011, 90006, 90005, 90019, 90010, 90004, 90036, 90029, 90012, 90057, 90026, 90063, 9002, 90040, 90031, 90032, 90201, 90270, 90040, 91754, 91830, 90042, 90037, 90062, 90255, 90001, 90003, 90037]

var valid_areas = ['los_angeles', 'sfv', 'hollywood', 'westside']

function sortByArea(area) {
  if (valid_areas.includes(area)) {
    by_zip = [];
    for (var i=0; i<formatted_data.length; i++) {
      if (eval(area).includes(parseInt(formatted_data[i].zip))) {
        by_zip.push(formatted_data[i])
      }
    }
    formatted_data = by_zip;
    var property_count = by_zip.length;
    $("#num-of-properties").text(property_count + " Properties Found" + area_sentences[area])
  }
}

function showAll() {
  var property_count = formatted_data.length
  $("#num-of-properties").text(property_count + " Properties Found")
}
