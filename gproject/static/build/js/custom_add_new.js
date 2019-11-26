
var currentTab = 0; // Current tab is set to be the first tab (0)
var submitted = false; // check if the form has been submitted
var editor;
var record_changed_dict = {}; //save the changes from the modal
var current_data_set;

showTab(currentTab); // Display the current tab

function showTab(n) {

  // This function will display the specified tab of the form ...
  "use strict";
  var  x = document.getElementsByClassName("tab");
  debugger;
    if(x.length !== 0){
      x[n].style.display = "block";
      // ... and fix the Previous/Next buttons:
      if (n === 0) {
        document.getElementById("prevButton").disabled = true;
        if (submitted === false){
            document.getElementById("nextButton").disabled = true;
        }

      } else {
        document.getElementById("prevButton").disabled = false;

      }
      if (n === (x.length - 1)) {
        document.getElementById("nextButton").innerHTML = "Submit";

      } else {
        document.getElementById("nextButton").innerHTML = "Next >>";

      }
      // ... and run a function that displays the correct step indicator:
      fixStepIndicator(n);
    }
}

function nextPrev(n) {
  "use strict";

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
    var current_f_s, new_f_s;
    if (n===1){
        current_f_s = parseInt(document.getElementById('table').style.fontSize.split('px')[0]);
        new_f_s = current_f_s + 1;
        document.getElementById('table').style.fontSize = new_f_s + 'px';
        }


    if (n===-1){
        current_f_s = parseInt(document.getElementById('table').style.fontSize.split('px')[0]);
        if (current_f_s - 1 > 0){
            new_f_s = current_f_s - 1;
        }else{
            new_f_s = current_f_s
        }

        document.getElementById('table').style.fontSize = new_f_s + 'px';

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

                get_json_data(data.document_input); // send ajax get to load the table and the modal
                submitted = true;
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
    current_data_set = data;
    create_header(data,"edit-table-head");
    create_body_and_modal(data,"edit-table-head");

function create_header(data, table_head_id){
    if (submitted === true){
        document.getElementById("edit-table-head").innerText = "";
    }
    var i;
    var cols=[];
    cols.push('#'); // intial column to store the record number
    for(var key in data[0]){
        if (cols.indexOf(key) === -1) {
                    cols.push(key);
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

    if (submitted === true){
        // if the data have been submitted before, reset the table
        document.getElementById("edit-table-body").innerText = "";
    }

    var i;
    var cols=[]; // columns for the table

    // column-headers for both main table and modal
    // the first row of the data is a dictionary with all headers
    for(var key in data[0]){
        if (cols.indexOf(key) === -1) {
                    cols.push(key);
                }
        }

    // create the body for the main table
    var table_body = document.getElementById("edit-table-body");

    // for the modal table
    var div_form = document.createElement("div");
    var button_modal_submit = document.getElementById("button_modal_submit");
    var record_num = document.getElementById("record_num");
    var input, label, form_group;

    for (i = 0; i < data.length; i++) {
        debugger;
        var tr = table_body.insertRow(-1); // create a row on the main table

        var div_step = document.createElement("div"); // for each row create a div_step for the modal
        div_step.id = "modal-step-" + (parseInt(i));
        div_step.className = "modal-step";

        // add the first column for the record number
        var td = document.createElement("td");
        td.innerHTML = i;
        td.id = "id-col-#-" + parseInt(i);
        tr.appendChild(td);

        for (key in data[i]) {
            if (cols.indexOf(key) !== -1) {

                // value of each cell
                td = document.createElement("td");
                td.innerHTML = data[i][key];
                td.id = "id-col-"+ key + "-" + parseInt(i);

                // *********** modal template form start ****************************
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
                input.id = "id-col-modal" + key + parseInt(i);

                // event listener to record changes in the input fields for the modal table
                // event listener for the changes in the modal
                input.addEventListener('change', function() {
                    this.style.border = '1px solid #01d28e';
                    button_modal_submit.disabled = false;

                    // on change save the entire record and save in a dictionary
                    var div_step_changed = this.parentNode.parentElement;
                    var rec_numbers = div_step_changed.getElementsByClassName("control-label").length;
                    var div_step_labels = div_step_changed.getElementsByClassName("control-label");
                    var div_step_inputs = div_step_changed.getElementsByClassName("control-input");
                    var record_number = parseInt(document.getElementById("record_num").innerText);
                    var record_changed = {};


                    for(var k=0;k<rec_numbers;k++){
                        record_changed[div_step_labels[k].innerHTML] = div_step_inputs[k].value;

                    }
                    record_changed_dict[record_number]=record_changed;

                 });

                form_group.append(label);
                form_group.append(input);
                div_step.append(form_group);

                // double click event on each cell of the main table to open the modal in the current record
                // TODO: the ondblclick can be moved to be part of the row rather then the individual cells
                td.ondblclick = function(){
                    var rowId = this.parentNode.rowIndex;
                    record_num.innerText = rowId -1 ;

                    // hide all steps

                    var steps = document.getElementsByClassName("modal-step");

                    // hide all steps
                    for(var k=0; k<steps.length;k++){
                        steps[k].style.display = "none";
                    }

                    // show only selected step
                    document.getElementById("modal-step-"+ (rowId-1)).style.display = "block";


                    $('#update-modal').modal('show');

                }


                tr.appendChild(td);
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
    document.getElementById("modal-step-"+ record_num).style.display = "none";
    if((record_num + n) === -1){
        document.getElementById("modal-step-"+ (total_records -1)).style.display = "block";
        document.getElementById("record_num").innerText = (total_records -1 );
    } else if((record_num + n) === total_records){
        document.getElementById("modal-step-"+ 0).style.display = "block";
        document.getElementById("record_num").innerText = 0;
    }else{
       document.getElementById("modal-step-"+ (record_num + n)).style.display = "block";
       document.getElementById("record_num").innerText = (record_num + n);
    }


}

// changes from the modal posted to the main table
function submit_change_table() {
    "use strict"
    console.log("pressed");
    for(var key in record_changed_dict){
        for (var key_key in record_changed_dict[key]){
            document.getElementById(("id-col-" + key_key + "-" + parseInt(key))).innerHTML =
                record_changed_dict[key][key_key];
        }
    }
}

//
function run_checks(){
    "use strict"
    debugger;
    var headers_check = check_columns_headers(current_data_set);
    debugger;
    var rows_checks =  check_by_row(current_data_set,headers_check);
    debugger;
    issues_summary(headers_check,rows_checks);
    document.getElementById("x_panel_elaboration").style.display = "inline-block";
}

// save the changes from the modal and posted to the table in the global variable
// if not saved the global variable will keep the records pre-changes in the modal
function confirm_changes(){
    "use strict"
    //current_data_set; // contains all the records

    //record_changed_dict; // contains the records changed with the modal

}

