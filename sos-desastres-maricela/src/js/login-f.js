function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      saveUserFacebook();
    
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }
 

function saveUserFacebook(){
    //web
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        //alert('<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>');
        //name: response.first_name + ' ' + response.last_name
        //username: response.id
        //email: response.email
        //user_type: Estudiante
        //school: ??
        Parse.User.logIn(response.id, 'passwordFB:'+ response.id, {
            success: function(results) {
                UserLogin(results);
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
                registrarUserFacebook(response);
                log.console("Error: " + error.code + " " + error.message);
            }
        });
    });
}

//si el usuario si esta en la base de datos
function UserLogin(res){
    sessionStorage.setItem('id', res.id);
    sessionStorage.setItem('user_type', res.attributes.user_type);
    sessionStorage.setItem('school', res.attributes.school);
    sessionStorage.setItem('username', res.attributes.name);
    sessionStorage.setItem('token', res.getSessionToken());
    onClickAccion();
    //window.location = '/';
}

//si el usuario no esta en la base de datos
function registrarUserFacebook(response){
    console.log("register userFabeook");
    var newuser = new Parse.User();
    newuser.set("name", response.first_name + ' ' + response.last_name);
    newuser.set("email", response.email);
    newuser.set("username", response.id);
    newuser.set("password", 'passwordFB:'+ response.id);
    newuser.set("school", 'null');
    newuser.set("user_type", "Estudiante");

    newuser.signUp(null, {
        success: function (res) {
            UserLogin(res);
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            log.console("Error: " + error.code + " " + error.message);
        }
    });

}

function logout(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('school');
    sessionStorage.removeItem('user_type');
    sessionStorage.removeItem('username');

    /*FB.logout(function(response) {
    // user is now logged out
    });*/
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                // user is now logged out
            });
        }
    });
}
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
        
    }, {scope:'email,public_profile'});
    //recupera el correo electronico con scope
  }

function initFB(){
    window.fbAsyncInit = function() {
    FB.init({
        appId      : '406214259746931',
        cookie     : true,  // enable cookies to allow the server to access 
                                // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
        });
    };
  // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
}
  

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  



  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }