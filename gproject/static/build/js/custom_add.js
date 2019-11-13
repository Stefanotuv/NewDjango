debugger;
var zoom_up_down = 11; // 11 - default
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {


  // This function will display the specified tab of the form ...
  "use strict";
  debugger;
  var  x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevButton").style.display = "none";


  } else {
    document.getElementById("prevButton").style.display = "inline";
  }
  if (n === (x.length - 1)) {
    document.getElementById("nextButton").innerHTML = "Submit";
  } else {
    document.getElementById("nextButton").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  "use strict";
  debugger;
  console.log("n:");
  console.log(n);
    // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:

//
//  if (n === 1 && !validateForm())
//  {return false};
//


  // Hide the current tab:
   x[currentTab].style.display = "none";
   currentTab = currentTab + n;
  // Increase or decrease the current tab by 1:

    // if you have reached the end of the form... :

    if (currentTab >= (x.length)) {
    //...the form gets submitted:
    document.getElementById("tabs");
    currentTab = currentTab - 1;


  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}



function fixStepIndicator(n) {
  "use strict";
    // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function zoomUpDown(n) {
    "use strict";
    debugger;
    var zoom_class = "";

    if (n===1){
        if (zoom_up_down<16){
        zoom_up_down = zoom_up_down + 1;

        zoom_class = "size_" + zoom_up_down;
        document.getElementById('dy-table-div').className = zoom_class;

        console.log(zoom_up_down);
        }
    }

    if (n===-1){

        if (zoom_up_down>8){
        zoom_up_down = zoom_up_down - 1;

        zoom_class = "size_" + zoom_up_down;
        document.getElementById('dy-table-div').className = zoom_class;

        console.log(zoom_up_down);
        }
    }



}

function post_data(user) {
        "use strict"
        var fileSelect = document.getElementById('id_document_input').files[0];
        var filename = fileSelect.name;

        console.log( 'fileSelect:' );
        console.log( fileSelect );

        var formData = new FormData();
        formData.append('user', user);
        formData.append('name', $("#id_name").val());
        formData.append('description',  $("#id_description").val());
        formData.append('document_input', fileSelect, filename);
        formData.append('csrfmiddlewaretoken', $("input[name=csrfmiddlewaretoken]").val());

        $.ajax({
            type:'POST',
            url:'/api/elaborations/add',
            enctype: 'multipart/form-data',
            dataType:'json',
            processData: false,
            contentType: false,
            crossDomain: true,
            data: formData,
            success: function(data) {
                console.log("success");
                console.log("data");
                console.log(data);
            },
            error : function(xhr,errmsg,err) {
                console.log("error message")
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }


