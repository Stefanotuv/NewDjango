debugger;
var zoom_up_down = 11; // 11 - default
var currentTab = 0; // Current tab is set to be the first tab (0)
var submitted = false; // check if the form has been submitted
var editor;
var records_changed = []; //save the changes from the modal

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
    if (submitted === false){
        document.getElementById("nextButton").disabled = true;
    }

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

  var x = document.getElementsByClassName("tab");
   x[currentTab].style.display = "none";
   currentTab = currentTab + n;
    if (currentTab >= (x.length)) {
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
        document.getElementById('edit-table').className = "table " + zoom_class;

        }
    }

    if (n===-1){

        if (zoom_up_down>8){
        zoom_up_down = zoom_up_down - 1;

        zoom_class = "size_" + zoom_up_down;
        document.getElementById('edit-table').className = "table " + zoom_class;

        }
    }



}

// post_data calls get_json_data to load the table through
// table_load and load the modal table
function post_data(user) {
        "use strict"
        var fileSelect = document.getElementById('id_document_input').files[0];
        var filename = fileSelect.name;

        // console.log( 'fileSelect:' );
        // console.log( fileSelect );

        var formData = new FormData();
        formData.append('user', user);
        formData.append('name', $("#id_name").val());
        formData.append('description',  $("#id_description").val());
        formData.append('document_input', fileSelect, filename);
        formData.append('csrfmiddlewaretoken', $("input[name=csrfmiddlewaretoken]").val());

        var call_results = $.ajax({
            type:'POST',
            url:'/api/elaborations/add',
            enctype: 'multipart/form-data',
            dataType:'json',
            processData: false,
            contentType: false,
            crossDomain: true,
            data: formData,
            success: function(data) {
                document.getElementById("nextButton").disabled = false;
                document.getElementById("btn_upload").style = "font-size:20px; color: #00bb00";
                submitted = true;

                get_json_data(data.document_input); // send ajax get to load the table and the modal

            },
            error : function(xhr,errmsg,err) {
                document.getElementById("nextButton").disabled = true;
                document.getElementById("btn_upload").className = "btn btn-danger";
                console.log("error message")
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

// get the json file to be loaded on the table and in the modal
function get_json_data(file_path_to_load_xls) {
                "use strict"

                var file_path = "/media/static/documents/";
                var file_to_load_xls = file_path_to_load_xls.split(/.*[\/|\\]/)[1];
                var file_to_load_json = file_to_load_xls.split('.').slice(0, -1).join('.') + ".json";
                var file_to_load_json_full = file_path + file_to_load_json;

                var call_results = $.ajax({
                    type:'GET',
                    url:file_to_load_json_full,
                    success: function(data) {
                        table_load(data);
                    },
                    error : function(xhr,errmsg,err) {
                        console.log("error message");
                        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    }
                });

}

// get the Json data into the table
function table_load(data){
    "use strict"
    debugger;
create_header(data,"edit-table-head");
create_body_and_modal(data,"edit-table-head");

function create_header(data, table_head_id){

    var i;
    var cols=[];
    for(var key in data[0]){
        if (cols.indexOf(key) === -1) {
                    cols.push(key)
                    // console.log(key);
                }
        }
    var table_head = document.getElementById("edit-table-head")
    var tr = table_head.insertRow(-1);                   // TABLE ROW.
    for (i = 0; i < cols.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = cols[i];
            tr.appendChild(th);
        }
    }

function create_body_and_modal(data, table_body_id){
    var i;
    var cols=[];

    // columns for both main table and modal
    for(var key in data[0]){
        if (cols.indexOf(key) === -1) {
                    cols.push(key);
                }
        }

    // for the main table
    var table_body = document.getElementById("edit-table-body");

    // for the modal table
    var div_form = document.createElement("div");
    var button_modal_submit = document.getElementById("button_modal_submit");
    var record_num = document.getElementById("record_num");
    var input;
    var label;
    var form_group;

    for (i = 1; i < data.length; i++) {

        var tr = table_body.insertRow(-1); // create a row on the main table

        var div_step = document.createElement("div"); // for each row create a div_step for the modal
        div_step.id = "modal-step-" + i; // steps id starting from 1 (the data include the columns in the row 0)
        debugger;
        div_step.className = "modal-step";

        for (key in data[i]) {
            if (cols.indexOf(key) !== -1) {

                // value of each cell
                var th = document.createElement("th");
                th.innerHTML = data[i][key];

                // form_group to group the label and input for the modal table
                form_group = document.createElement("div");
                form_group.className = "form-group";
                form_group.style = "overflow: auto;"

                // label for the modal
                label = document.createElement("label");
                label.className = "control-label col-md-6 col-sm-6 col-xs-12";

                // input fields for the modal
                input = document.createElement("input");
                input.className = "control-input col-md-6 col-sm-6 col-xs-12";
                input.type = "text";

                // assign values to the label and input in the modal
                label.textContent = key;
                label.value = key;
                input.value = data[i][key];
                input.id = "id_" + key;

                // event listener to record changes in the input fields for the modal table
                input.addEventListener('change', function() {
                    this.style.border = '1px solid #01d28e';
                    button_modal_submit.disabled = false;

                    // on change save the entire record and save in a list/array
                    var div_step_changed = this.parentNode.parentElement;
                    var rec_numbers = div_step_changed.getElementsByClassName("control-label").length;
                    var div_step_labels = div_step_changed.getElementsByClassName("control-label");
                    var div_step_inputs = div_step_changed.getElementsByClassName("control-input");
                    var record_number = parseInt(document.getElementById("record_num").innerText);
                    debugger;
                    var record_changed = {};
                    var record_changed_dict = {};

                    for(var k=0;k<rec_numbers;k++){
                        record_changed[div_step_labels[k].innerHTML] = div_step_inputs[k].value;

                    }
                    debugger;
                    record_changed_dict[record_number]=record_changed;
                    records_changed.push(record_changed_dict);

                 });

                form_group.append(label);
                form_group.append(input);
                div_step.append(form_group);

                // double click event on each cell of the main table to open the modal in the current record
                th.ondblclick = function(){
                    var rowId = this.parentNode.rowIndex;
                    record_num.innerText = rowId;

                    // hide all steps
                    debugger;
                    var steps = document.getElementsByClassName("modal-step");

                    // hide all steps
                    for(var k=0; k<steps.length;k++){
                        steps[k].style.display = "none";
                    }

                    // show only selected step
                    document.getElementById("modal-step-"+rowId).style.display = "block";


                    debugger;
                    $('#update-modal').modal('show');

                }


                tr.appendChild(th);
            }

        }

        div_step.style.display = "none";
        div_form.append(div_step);
    }
    $('#modal-body').html(div_form);

}

}

function modal_next_prev(n){
    "use strict"
    var record_num = parseInt(document.getElementById("record_num").innerText);
    var total_records = document.getElementsByClassName("modal-step").length;
    debugger;
    document.getElementById("modal-step-"+ record_num).style.display = "none";
    if((record_num+n) === 0){
        document.getElementById("modal-step-"+ (total_records - 1)).style.display = "block";
        document.getElementById("record_num").innerText = (total_records - 1);
    } else if((record_num+n) === total_records){
        document.getElementById("modal-step-"+ 1).style.display = "block";
        document.getElementById("record_num").innerText = 1;
    }else{
       document.getElementById("modal-step-"+ (record_num + n)).style.display = "block";
       document.getElementById("record_num").innerText = (record_num + n);
    }


}