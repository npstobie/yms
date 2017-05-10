<?php
//If the form is submitted
if(isset($_POST['submitted'])) {

	// require a name from user
    if(trim($_POST['name']) === '') {
        $nameError =  'Forgot your name!'; 
        $hasError = true;
    } else {
        $name = trim($_POST['name']);
    }
	
	// need valid email
    if(trim($_POST['email']) === '')  {
        $emailError = 'Forgot to enter in your e-mail address.';
        $hasError = true;
    } else if (!preg_match("/^[[:alnum:]][a-z0-9_.-]*@[a-z0-9.-]+\.[a-z]{2,4}$/i", trim($_POST['email']))) {
        $emailError = 'You entered an invalid email address.';
        $hasError = true;
    } else {
        $email = trim($_POST['email']);
    }
	
	// get phone
    if(trim($_POST['phone']) === '')  {
        $phone = '';
    } else {
        $phone = trim($_POST['phone']);
    }
	
	// get subject
    if(trim($_POST['subject']) === '')  {
        $subject = 'Submitted message from '.$name;
    } else {
        $subject = trim($_POST['subject']);
    }
	
	// we need at least some content
    if(trim($_POST['message']) === '') {
        $messageError = 'You forgot to enter a message!';
        $hasError = true;
    } else {
        if(function_exists('stripslashes')) {
            $message = stripslashes(trim($_POST['message']));
        } else {
            $message = trim($_POST['message']);
        }
    }
	
	// upon no failure errors let's email now!
    if(!isset($hasError)) {
	
		/*---------------------------------------------------------*/
        /* SET EMAIL YOUR EMAIL ADDRESS HERE                       */
        /*---------------------------------------------------------*/
        $emailTo = 'example@yoursite.com';
        $sendCopy = trim($_POST['sendCopy']);
        $body = "Name: $name \n\nEmail: $email \n\nPhone: $phone \n\nMessage: $message";
        $headers = 'From: ' .' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

        mail($emailTo, $subject, $body, $headers);
        
        // set our boolean completion value to TRUE
        $emailSent = true;
	
	}

}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="Homely - Responsive Real Estate Template">
  <meta name="author" content="Rype Creative [Chris Gipple]">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homely | Contact Us</title>

  <!-- CSS file links -->
  <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
  <link href="assets/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" media="screen">
  <link href="assets/jquery-ui-1.12.1/jquery-ui.min.css" rel="stylesheet">
  <link href="assets/slick-1.6.0/slick.css" rel="stylesheet">
  <link href="assets/chosen-1.6.2/chosen.min.css" rel="stylesheet">
  <link href="css/nouislider.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
  <link href="css/responsive.css" rel="stylesheet" type="text/css" media="all" />
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
  <![endif]-->
</head>
<body>

<header class="header-default">

  <div class="top-bar">
    <div class="container">
        <div class="top-bar-left left">
          <ul class="top-bar-item right social-icons">
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="top-bar-right right">
          <a href="login.html" class="top-bar-item"><i class="fa fa-sign-in icon"></i>Login</a>
          <a href="register.html" class="top-bar-item"><i class="fa fa-user-plus icon"></i>Register</a>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
  </div>

  <div class="container">

    <!-- navbar header -->
    <div class="navbar-header">

      <div class="header-details">
        <div class="header-item header-search left">
          <table>
              <tr>
              <td><i class="fa fa-search"></i></td>
              <td class="header-item-text">
                <form class="search-form">
                  <input type="text" placeholder="Search..." />
                  <button type="submit"><i class="fa fa-search"></i></button>
                </form>
              </td>
            </tr>
          </table>
        </div>
        <div class="header-item header-phone left">
          <table>
            <tr>
              <td><i class="fa fa-phone"></i></td>
              <td class="header-item-text">
                Call us anytime<br/>
                <span>(+200) 123 456 5665</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="header-item header-phone left">
          <table>
            <tr>
              <td><i class="fa fa-envelope"></i></td>
              <td class="header-item-text">
                Drop us a line<br/>
                <span>hello@homely.com</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="clear"></div>
      </div>

      <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt="Homely" /></a>

      <!-- nav toggle -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

    </div>

    <!-- main menu -->
    <div class="navbar-collapse collapse">
      <div class="main-menu-wrap">
        <div class="container-fixed">

        <div class="member-actions right">
          <a href="user-submit-property.html" class="button small alt button-icon"><i class="fa fa-plus"></i>Submit Property</a>
        </div>
        <ul class="nav navbar-nav right">
          <li class="menu-item-has-children">
            <a href="index.html">Home</a>
            <ul class="sub-menu">
              <li><a href="index.html">Simple Search</a></li>
              <li><a href="index-slider-1.html">Slider Style 1</a></li>
              <li><a href="index-slider-2.html">Slider Style 2</a></li>
			  <li><a href="index-slider-3.html">Slider Style 3</a></li>
              <li><a href="index-map.html">Google Maps Style 1</a></li>
              <li><a href="index-map-horizontal.html">Google Maps Style 2</a></li>
              <li class="menu-item-has-children">
                <a href="index.html">Headers</a>
                <ul class="sub-menu">
                  <li><a href="index.html">Header Default</a></li>
                  <li><a href="index-header-classic.html">Header Classic</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-item-has-children">
            <a href="property-listing-grid.html">Properties</a>
            <ul class="sub-menu">
              <li><a href="property-listing-grid.html">Listing Grid</a></li>
              <li><a href="property-listing-grid-sidebar.html">Listing Grid Sidebar</a></li>
              <li><a href="property-listing-row.html">Listing Row</a></li>
              <li><a href="property-listing-row-sidebar.html">Listing Row Sidebar</a></li>
              <li><a href="property-listing-map.html">Listing Map</a></li>
              <li class="menu-item-has-children">
                <a href="property-single.html">Property Single</a>
                <ul class="sub-menu">
                  <li><a href="property-single.html">Property Single Classic</a></li>
                  <li><a href="property-single-full.html">Property Single Full Width</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-item-has-children">
            <a href="agent-listing-grid.html">Agents</a>
            <ul class="sub-menu">
              <li><a href="agent-listing-grid.html">Agent Listing Grid</a></li>
              <li><a href="agent-listing-grid-sidebar.html">Agent Listing Grid Sidebar</a></li>
              <li><a href="agent-listing-row.html">Agent Listing Row</a></li>
              <li><a href="agent-listing-row-sidebar.html">Agent Listing Row Sidebar</a></li>
              <li><a href="agent-single.html">Agent Single</a></li>
            </ul>
          </li>
          <li class="menu-item-has-children">
            <a href="blog-right-sidebar.html">Blog</a>
            <ul class="sub-menu">
              <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
              <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
              <li><a href="blog-full-width.html">Blog Full Width</a></li>
              <li><a href="blog-creative.html">Blog Creative</a></li>
              <li><a href="blog-single.html">Blog Single</a></li>
            </ul>
          </li>
          <li class="menu-item-has-children">
            <a href="#">Pages</a>
            <ul class="sub-menu">
              <li><a href="about.html">About</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="404.html">404 Error</a></li>
              <li><a href="login.html">Login</a></li>
              <li><a href="register.html">Register</a></li>
			  <li class="menu-item-has-children">
                <a href="user-my-properties.html">User Pages</a>
                <ul class="sub-menu">
				  <li><a href="user-profile.html">User Profile</a></li>
                  <li><a href="user-my-properties.html">My Properties</a></li>
				  <li><a href="user-favorite-properties.html">Favorited Properties</a></li>
                  <li><a href="user-submit-property.html">Submit Property</a></li>
                </ul>
              </li>
              <li><a href="elements.html">Elements</a></li>
            </ul>
          </li>
          <li class="current-menu-item"><a href="contact.php">Contact</a></li>
        </ul>
        <div class="clear"></div>

      </div>

      </div><!-- end main menu wrap -->
    </div><!-- end navbar collaspe -->

  </div><!-- end container -->
</header>

<section class="subheader">
  <div class="container">
    <h1>Contact Us</h1>
    <div class="breadcrumb right">Home <i class="fa fa-angle-right"></i> <a href="#" class="current">Contact Us</a></div>
    <div class="clear"></div>
  </div>
</section>

<section class="module contact-details">
  <div class="container">

    <div class="row">
      <div class="col-lg-3 col-md-3">
        <div class="contact-item">
          <i class="fa fa-envelope"></i>
          <h4>Email Us</h4>
          <p>hello@homely.com</p>
          <p>support@homely.com</p>
        </div>
      </div>
      <div class="col-lg-3 col-md-3">
        <div class="contact-item">
          <i class="fa fa-phone"></i>
          <h4>Call Us</h4>
          <p>General: 123 456 5665</p>
          <p>Support: (+200) 123 456 5665</p>
        </div>
      </div>
      <div class="col-lg-3 col-md-3">
        <div class="contact-item">
          <i class="fa fa-map-marker"></i>
          <h4>Visit Us</h4>
          <p>1234 Smith Drive<br/> Annapolis, MD 21012 USA</p>
        </div>
      </div>
      <div class="col-lg-3 col-md-3">
        <div class="contact-item">
          <i class="fa fa-share-alt"></i>
          <h4>Connect With Us</h4>
          <ul class="social-icons">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                </ul>
        </div>
      </div>
    </div><!-- end row -->

  </div>
</section>


<section class="module">
  <div class="container">

    <div class="row">

      <div class="col-lg-8 col-md-8">

        <div class="comment-form">
          <h4><span>Quick Contact</span> <img src="images/divider-half.png" alt="" /></h4>
          <p><b>Fill out the form below.</b> Morbi accumsan ipsum velit Nam nec tellus a odio tincidunt auctor a ornare odio sedlon maurisvitae erat consequat auctor</p>
          
		  <form method="post" id="contact-us">
		  
			<?php if(isset($emailSent) && $emailSent == true) { ?>
                <p class="alert-box success"><i class="fa fa-check icon"></i>Your email was sent!</p>
            <?php } else if(isset($hasError) || isset($captchaError) ) { ?>
                <p class="alert-box error"><i class="fa fa-close icon"></i>Error submitting the form</p>
            <?php } ?>
		  
            <div class="form-block">
              <label>
				Name *
				<?php if($nameError != '') { ?>
					<span class="error"><?php echo $nameError; ?></span> 
				<?php } ?>
			</label>
              <input class="requiredField" type="text" placeholder="Your Name" name="name" value="<?php if(isset($_POST['name'])) echo $_POST['name'];?>" />
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="form-block">
                  <label>
					Email *
					<?php if($emailError != '') { ?>
						<span class="error"><?php echo $emailError; ?></span> 
					<?php } ?>
				  </label>
                  <input class="email requiredField" type="text" placeholder="Your email" name="email" value="<?php if(isset($_POST['email'])) echo $_POST['email'];?>" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-block">
                  <label>Phone</label>
                  <input type="text" placeholder="Your phone" name="phone" value="<?php if(isset($_POST['phone'])) echo $_POST['phone'];?>" />
                </div>
              </div>
            </div>
            <div class="form-block">
                  <label>Subject</label>
                  <input type="text" placeholder="Subject" name="subject" value="<?php if(isset($_POST['subject'])) echo $_POST['subject'];?>" />
                </div>
            <div class="form-block">
              <label>
				Message *
				<?php if($messageError != '') { ?>
					<span class="error"><?php echo $messageError; ?></span> 
				<?php } ?>
			  </label>
              <textarea class="requiredField" placeholder="Your message..." name="message"><?php if(isset($_POST['message'])) echo $_POST['message'];?></textarea>
            </div>
            <div class="form-block">
              <input type="submit" value="Submit" />
			  <input type="hidden" name="submitted" id="submitted" value="true" />
            </div>
          </form>
        </div>

        <div class="divider"></div><br/>
        <h4>Still need help?</h4>
        <p>If you still have questions, try visiting our <a href="#"><b>FAQ</b></a> page to assit you. Morbi accumsan ipsum velit Nam nec tellus a odio tincidunt auctor a ornare odio sedlon maurisvitae erat consequat auctor</p>

      </div>

      <div class="col-lg-4 col-md-4 sidebar">

        <div class="widget widget-sidebar recent-properties">
          <h4><span>Quick Links</span> <img src="images/divider-half.png" alt="" /></h4>
          <div class="widget-content box">
            <ul class="bullet-list">
              <li><a href="#">Featured Properties</a></li>
              <li><a href="#">Featured Agents</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Frequently Asked Questions</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="#">Submit a Property</a></li>
            </ul>
          </div><!-- end widget content -->
        </div><!-- end widget -->

        <div class="widget widget-sidebar recent-properties">
          <h4><span>Recent Properties</span> <img src="images/divider-half.png" alt="" /></h4>
          <div class="widget-content">

            <div class="recent-property">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4"><a href="#"><img src="images/1837x1206.png" alt="" /></a></div>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <h5><a href="#">Beautiful Waterfront Condo</a></h5>
                  <p><strong>$1,800</strong> Per Month</p>
                </div>
              </div>
            </div>

            <div class="recent-property">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4"><a href="#"><img src="images/1837x1206.png" alt="" /></a></div>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <h5><a href="#">Family Home</a></h5>
                  <p><strong>$500,000</strong></p>
                </div>
              </div>
            </div>

            <div class="recent-property">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4"><a href="#"><img src="images/1837x1206.png" alt="" /></a></div>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <h5><a href="#">Ubran Apartment</a></h5>
                  <p><strong>$1,800</strong> Per Month</p>
                </div>
              </div>
            </div>

          </div><!-- end widget content -->
        </div><!-- end widget -->

      </div>

    </div><!-- end row -->

  </div><!-- end container -->
</section>

<section class="module cta newsletter">
  <div class="container">
	<div class="row">
		<div class="col-lg-7 col-md-7">
			<h3>Sign up for our <strong>newsletter.</strong></h3>
			<p>Lorem molestie odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
		</div>
		<div class="col-lg-5 col-md-5">
			<form method="post" id="newsletter-form" class="newsletter-form">
				<input type="email" placeholder="Your email..." />
				<button type="submit" form="newsletter-form"><i class="fa fa-send"></i></button>
			</form>
		</div>
	</div><!-- end row -->
  </div><!-- end container -->
</section>

<footer id="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-4 widget footer-widget">
                <a class="footer-logo" href="index.html"><img src="images/logo-white.png" alt="Homely" /></a>
                <p>Lorem ipsum dolor amet, consectetur adipiscing elit. Sed ut 
                purus eget nunc ut dignissim cursus at a nisl. Mauris vitae 
                turpis quis eros egestas tempor sit amet a arcu. Duis egestas 
                hendrerit diam.</p>
                <div class="divider"></div>
                <ul class="social-icons circle">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-4 widget footer-widget from-the-blog">
                <h4><span>From the Blog</span> <img src="images/divider-half.png" alt="" /></h4>
                <ul>
                    <li>
                      <a href="#"><h3>Open House at 123 Smith Drive</h3></a>
                      <p>Vel fermentum ipsum. Quis molestie odio. Interdum et...<br/> <a href="#">Read More</a></p>
                      <div class="clear"></div>
                    </li>
                     <li>
                        <a href="#"><h3>Open House at 123 Smith Drive</h3></a>
                        <p>Vel fermentum ipsum. Quis molestie odio. Interdum et...<br/> <a href="#">Read More</a></p>
                        <div class="clear"></div>
                      </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-4 widget footer-widget">
                <h4><span>Get In Touch</span> <img src="images/divider-half.png" alt="" /></h4>
                <p>123 Smith Drive<br/>
                Annapolis, MD 21012<br/>
                United States
                </p>
                <p>
                <b class="open-hours">Open Hours</b><br/>
                Mondy - Friday: 9 am - 5 pm<br/>
                Saturday: 9 am - 1pm<br/>
                Sunday: Closed
                </p>
                <p class="footer-phone"><i class="fa fa-phone icon"></i> (123) 456-7890</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 widget footer-widget newsletter">
                <h4><span>Newsletter</span> <img src="images/divider-half.png" alt="" /></h4>
                <p><b>Subscribe to our newsletter!</b> Vel lorem ipsum. Lorem molestie odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. </p>
                <form class="subscribe-form" method="post" action="#">
                    <input type="text" name="email" value="Your email" />
                    <input type="submit" name="submit" value="SEND" class="button small alt" />
                </form>
            </div>
        </div><!-- end row -->
    </div><!-- end footer container -->
</footer>

<div class="bottom-bar">
    <div class="container">
    © 2017  |  Homely - A theme by <a href="http://rypecreative.com/" target="_blank">Rype Creative</a>  |  All Rights Reserved
    </div>
</div>

<!-- JavaScript file links -->
<script src="js/jquery-3.1.1.min.js"></script>      <!-- Jquery -->
<script src="assets/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script src="js/bootstrap.min.js"></script>  <!-- bootstrap 3.0 -->
<script src="assets/slick-1.6.0/slick.min.js"></script> <!-- slick slider -->
<script src="assets/chosen-1.6.2/chosen.jquery.min.js"></script> <!-- chosen - for select dropdowns -->
<script src="js/isotope.min.js"></script> <!-- isotope-->
<script src="js/wNumb.js"></script> <!-- price formatting -->
<script src="js/nouislider.min.js"></script> <!-- price slider -->
<script src="js/global.js"></script>


</body>
</html>