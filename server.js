var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

parser.on('error', function(err) { console.log('Parser error', err); });


app.use(express.static('html'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.listen(process.env.PORT || 5000, function () {
  console.log('Yale Management Services is Running.')
})


var data = ""
var parsedData = ""

function getListings(){
	https.get('https://www.rentlinx.com/_database/yalemanagementservices_rentlinx.xml', function(res) {
		console.log(res.statusCode)
	  if (res.statusCode >= 200 && res.statusCode < 400) {
	    res.on('data', function(data_) { data += data_.toString(); });
	    res.on('end', function() {
	      parser.parseString(data, function(err, result) {
					parsedData = result
	      });
	    });
	  }
	})
}

getListings();
setInterval(getListings, 1800000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/tenants', function(req, res) {
  res.sendFile(__dirname + '/html/tenants.html');
});

app.get('/owners', function(req, res) {
  res.sendFile(__dirname + '/html/owners.html');
});

app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/html/about.html');
});

app.get('/contact', function(req, res) {
  res.sendFile(__dirname + '/html/contact.html');
});

app.get('/listings-map', function(req, res) {
  res.sendFile(__dirname + '/html/property-listing-map.html');
});

app.get('/get-started', function(req, res) {
  res.sendFile(__dirname + '/html/get-started.html');
});

app.get('/listings-grid', function(req, res) {
  res.sendFile(__dirname + '/html/property-listing-grid.html');
});

app.get('/listing_data', function(req, res){
	res.send(parsedData);
})

app.post('/contact_form', function (req, res) {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail", 
    auth: {
   	  user: "ymscontactform@gmail.com",
   	  pass: "adamkanizo"
    }
  });

 	smtpTransport.sendMail({
	  from: "YMS Website Contact Form <ymscontactform@gmail.com>",
	  to: "Info @ Yale Management Services <npstobie@gmail.com>, Adam Kanizo <nickmeanssuper@gmail.com>", // receiver
	  subject: 'Contact Submission from YMS website: "' + (req.body.subject.length ? req.body.subject : "No Subject") + '"',
	  html: "<strong>Senders Name:</strong> " + req.body.name + "<br>" + "<strong>Senders Email:</strong> " + req.body.email + "<br>" + "<strong>Senders Phone:</strong> " + (req.body.phone.length ? req.body.phone : "No Phone") + "<br><br>" + "<strong>Message:</strong> " + req.body.message
 	}, function(error, response){
      if(error){
        console.log(error);
        res.send(error)
      } else {
        console.log("Message sent: " + response.message);
      	res.send(response);
    	}
 			smtpTransport.close(); 
	});
});

app.post('/get_started_form', function (req, res) {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail", 
    auth: {
   	  user: "ymscontactform@gmail.com",
   	  pass: "adamkanizo"
    }
  });

 	smtpTransport.sendMail({
	  from: "YMS Website Tenant Activation Request <ymscontactform@gmail.com>",
	  to: "Info @ Yale Management Services <npstobie@gmail.com>, Adam Kanizo <nickmeanssuper@gmail.com>", // receiver
	  subject: 'Tenant Activation Link Request from YMS website',
	  html: "<strong>First Name:</strong> " + req.body.first_name + "<br>" + "<strong>Last Name:</strong> " + req.body.last_name + "<br>" + "<strong>Email:</strong> " + req.body.email
 	}, function(error, response){
      if(error){
        console.log(error);
        res.send(error)
      } else {
        console.log("Message sent: " + response.message);
      	res.send(response);
    	}
 			smtpTransport.close(); 
	});
});

app.all('*', function(req, res) {
  res.redirect("/home");
});