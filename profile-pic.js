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
    
    if (response.authResponse) {
        console.log("Authorized :)");
        
        var profilePic = new Image();
        profilePic.setAttribute('crossOrigin', 'anonymous');
        
        profilePic.src = "http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=square&width=500&height=500";
        
        profilePic.onload = function() {
            canvas = document.createElement("canvas");
            canvas.width = 500;
            canvas.height = 500;
            var context = canvas.getContext("2d");
            context.drawImage(profilePic, 0, 0, profilePic.width, profilePic.height, 0, 0, canvas.width, canvas.height);
            var overlay = new Image();
            overlay.src = "overlay.png";
            overlay.onload = function() {
                context.drawImage(overlay, 0, 0);
                var newProfPic = canvas.toDataURL();
                document.getElementById("newprofpic").src = newProfPic;
                
                $.ajax({
                    type: "POST",
                    url: "overlay-upload.php",
                    data: {
                        "img": newProfPic
                    },
                    success: function(url) {
                        webUrl = "http://test.craigowenby.com/" + url;
                        console.log(webUrl);
                        
                        FB.api(
                            "/me/photos",
                            "POST",
                            {
                                "url": webUrl
                            },
                            function (photo_response) {
                                console.log(photo_response);
                                if (photo_response && !response.error) {
                                    window.open("https://www.facebook.com/photo.php?fbid={" + photo_response.id + "}&makeprofile=1");
                                }
                                var fileNameBegin = url.lastIndexOf('/') + 1;
                                var fileNameEnd = url.lastIndexOf('.png');
                                var fileName = url.substring(fileNameBegin, fileNameEnd);
                                console.log(fileName);

//                                $.ajax({
//                                    type: 'POST',
//                                    url: 'overlay-delete.php',
//                                    data: {
//                                        "img": fileName
//                                    },
//                                    success: function(response) {
//                                        alert(response);
//                                    }
//                                });
                            }
                        );
                    }
                });
            }
        }
    } else {
        console.log("Not authorized :(");
    }
}

function login(){
    FB.login(loginCallback, {scope: "user_photos,publish_actions"});
}