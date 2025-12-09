// Variable for transition speed
var transitionLength = 300;
var currentView = "default";
var previousView = "default";

// Helper: Change View
function changeView(v, t) {
  if (t != "none") {
    if (t == "fade") {
      // Fade to black
      $( ".black" ).addClass( "animate" );
      $( ".black" ).css( {"top" : "0"} );
      
      setTimeout(function(){
        loadViewContents(v, t);
      }, transitionLength);
    }
  } else {
    loadViewContents(v, t);
  }
}

// Helper: AJAX Load
function loadViewContents(v, t) {
  // Use jQuery .load() to inject HTML from the views folder
  $(".app").load("views/" + v + ".html", function() {
    
    // Wait for images in the new view to load before fading back in
    setTimeout(function(){
      $('.app').imagesLoaded( { background: '*' }, function() {
        
        // View specific logic
        if (v === "menu") {
          // Update Date
          if(typeof updateDate === "function") updateDate(); 
        }

        if (v === "settings-main") {
          setTimeout(function(){
            $( ".settings-navcontainer" ).addClass( "animate" );
            $( ".settings-header" ).addClass( "animate" );
            $( ".settings-footer" ).addClass( "animate" );
          }, 300);
        }

        currentView = v;

        // Transition out (Fade back in)
        if (t != "none") {
          if (t == "fade") {
            $( ".black" ).removeClass( "animate" );
            
            if (v === "menu") {
              // Play menu music
              var music = document.getElementById("bg-music");
              if(music) music.play().catch(e => console.log("Autoplay blocked"));

              // Play startup sound only once
              if (previousView === "default") {
                var startup = document.getElementById("startup");
                if(startup) startup.play().catch(e => console.log("Autoplay blocked"));
              }
            }
            
            setTimeout(function(){
              $( ".black" ).css( {"top" : "100vh"} );
            }, transitionLength);
          }
        }
      });
    }, 100);
  });
}

$( document ).ready(function() {
  currentView = "default";
  previousView = "default";
  $(".black").show();

  // Event Delegation for View Changes
  $("body").on("click", ".viewchange", function() {
       var viewtoChange = $(this).data("view");
       var transition = $(this).data("transition");
       previousView = currentView;
       changeView(viewtoChange, transition);
  });

  // Initial Load
  changeView("menu", "fade");
});