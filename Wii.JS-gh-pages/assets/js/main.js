// Delay helper
var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

// Audio Helpers
function hover(){
    var audio = document.getElementById("hover");
    if(audio) { audio.currentTime = 0; audio.play(); }
}

function select(){
    var audio = document.getElementById("select");
    if(audio) audio.play();
}

function zip(){
    var audio = document.getElementById("zip");
    if(audio) audio.play();
    select();
    var music = document.getElementById("bg-music");
    if(music) music.pause();
}

function back(){
    var audio = document.getElementById("back");
    if(audio) audio.play();
}

// Date Logic
const monthNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function updateDate() {
    const d = new Date();
    let weekday = monthNames[d.getDay()];
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let dateStr = weekday + " " + month + "/" + day;
    
    $(document).find( ".date" ).html( "<span> " + dateStr + "</span>" );
}

$( document ).ready(function() {
    
    // Channel Click (Zoom Effect)
    $("body").on("click", ".occupied .hover", function(){
        var centerX = $(this).offset().left + $(this).width() / 2;
        var centerY = $(this).offset().top + $(this).height() / 2;
        
        // Set transform origin to clicked channel
        $( ".main-menu" ).css( {"transform-origin" : centerX + "px " + centerY + "px 0px"} );

        var img = $( this ).attr( "data-img" );
        $( ".splash-screen" ).css( {"background-image" : " url(" + img + ")", "transform-origin" : centerX + "px " + centerY + "px 0px"} );

        $( ".main-menu" ).addClass( "channel-splash" );
        $( "body" ).addClass( "channel-splash" );
        
        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
        }, 900 );
    });

    // "Wii Menu" Button (Zoom Back)
    $("body").on("click", ".menu-btn", function(){
        $( ".main-menu" ).removeClass( "channel-splash" );
        $( "body" ).removeClass( "channel-splash" );
        $( "body" ).addClass( "splash-switch" );
        
        var music = document.getElementById("bg-music");
        if(music) music.play();

        delay(function(){
            $( "body" ).removeClass( "splash-switch" );
        }, 900 );
    });

    // Close screen warning
    $("body").on("click", ".screen-message", function(){
        $( ".screen-message" ).addClass( "hidden" );
    });
});