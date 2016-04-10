$( document ).ready(function() {
    $( "#main-content" ).fadeIn( 1200, function() {
    // Animation complete
      });

    $("#signUpModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
        $("#signUpModal a.btn").on("click", function(e) {
            console.log("button pressed");   // just as an example...
            $("#signUpModal").modal('hide');     // dismiss the dialog
        });
    });
    $("#signUpModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
        $("#signUpModal a.btn").off("click");
    });
    
    $("#signUpModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#signUpModal").remove();
    });
    
    $("#signUp").on("click", function(){
      $("#signUpModal").modal({                    // wire up the actual modal functionality and show the dialog
        "backdrop"  : "static",
        "keyboard"  : true,
        "show"      : true                     // ensure the modal is shown immediately
      });
    });

    $("#cancelModal").on("click", function(){
      $("#signUpModal").modal("hide");
    });

    $("#employerCheck").on("click", function(){
        if ($("#employerCheck").prop("checked"))
        {
          $(".userOptions").each(function(){
            $(this).hide();
          });
        } 
        else
        {
          $(".userOptions").each(function(){
            $(this).show();
          });
        }
    });

});
