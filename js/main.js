var loading_image = '<img src="img/ajax-loader2.gif">';

if (screen.width >= 320 && screen.width <= 720)  {
    /*
    * Normalized hide address bar for iOS & Android
    * (c) Scott Jehl, scottjehl.com
    * MIT License
    */
    // alert(screen.width + ' x ' + screen.height);
    (function( win ){
        var doc = win.document;

        // If there's a hash, or addEventListener is undefined, stop here
        if( !location.hash && win.addEventListener ){

            //scroll to 1
            window.scrollTo( 0, 1 );
            var scrollTop = 1,
            getScrollTop = function(){
              return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            },

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( doc.body ){
                clearInterval( bodycheck );
                scrollTop = getScrollTop();
                win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                } 
            }, 15 );

            win.addEventListener( "load", function(){
                setTimeout(function(){
                  //at load, if user hasn't scrolled more than 20 or so...
                  if( getScrollTop() < 20 ){
                    //reset to hide addr bar at onload
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                  }
                }, 0);
            });
        }
    })( this );
}

function goBackToMallFeatures() {
    window.location.href = "mall_features.html";
}

function goBackToSpecificPage(feature_id) {
    if (feature_id == 1){
        window.location.href = "index.html";
    }
    else if (feature_id == 2){
        window.location.href = "partials/mall_info.html";
    }
    else if (feature_id == 3){
        window.location.href = "partials/promos.html";
    }
    else if (feature_id == 4){
        window.location.href = "partials/stores.html";
    } 
    else if (feature_id == 5){
        window.location.href = "partials/food.html";
    } 
    else if (feature_id == 6){
        window.location.href = "partials/events.html";
    } 
    else {
        window.location.href = "partials/cinema.html";
    } 
}

//lock to portrait orientaion 
// window.addEventListener("orientationchange", function() {
//     if (window.orientation == 90 || window.orientation == -90) {
//         $('body').hide();
//         alert('Landscape mode is not supported. This is best viewed in portrait mode');
//     }
//     else {
//         $('body').show();
//     }
// }, false);