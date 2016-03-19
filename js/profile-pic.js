window.fbAsyncInit = function() {
    FB.init({
      appId      : '518764661641758',
      xfbml      : true,
      version    : 'v2.5'
    });
};

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function loginCallback(response) {
    
    console.log("Callback executed.");
    
    if (response.authResponse) {
        console.log("Authorized :)");
        console.log(response);
        
        var profilePic = new Image();
        profilePic.src = "http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=square&width=500&height=500";
        
        profilePic.width = 500;
        profilePic.height = 500;
        
        profilePic.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 500;
            var context = canvas.getContext("2d");
            context.drawImage(picElement, 0, 0);
            var overlay = new Image();
            overlay.src = "../overlay.png";
            overlay.onload = function() {
                context.drawImage(overlay, 0, 0);
            }
            
            var newProfPic = canvas.toDataURL();
            console.log(newProfPic);
        }
    } else {
        console.log("Not authorized.");
    }
}

function login(){
    FB.login(loginCallback, {scope: "user_photos"});
}