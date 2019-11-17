debugger;
var zoom_up_down = 11; // 11 - default
var currentTab = 0; // Current tab is set to be the first tab (0)
var submitted = false; // check if the form has been submitted
var editor

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
  // console.log("n:");
  // console.log(n);
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
                // console.log("success_post");
                // console.log("data_post");
                // console.log(data);
                document.getElementById("nextButton").disabled = false;
                // document.getElementById("btn_upload").className = "btn btn-success";
                document.getElementById("btn_upload").style = "font-size:20px; color: #00bb00";
                debugger;
                if(submitted === true){
                    $("#dy-table").dataTable().fnDestroy();
                };
                submitted = true;
                get_data(data.document_input); // load the datatable
                get_json_data(data.document_input); // send ajax get and

            },
            error : function(xhr,errmsg,err) {
                document.getElementById("nextButton").disabled = true;
                document.getElementById("btn_upload").className = "btn btn-danger";
                console.log("error message")
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
        debugger;
        // console.log("call-results");
        // console.log(call_results);
    }

// load file into the datable
function get_data(file_path_to_load_xls) {
                "use strict"

                var file_path = "/media/static/documents/";
                var file_to_load_xls = file_path_to_load_xls.split(/.*[\/|\\]/)[1];
                var file_to_load_json = file_to_load_xls.split('.').slice(0, -1).join('.') + ".json";
                var file_to_load_json_full = file_path + file_to_load_json;

                $('#dy-table').dataTable({

                     autoFill: true,
                     ajax: {
                            url:file_to_load_json_full,
                            dataSrc: '',
                     },
                     columns: [
                            { data: 'LBSNo' },
                            { data: 'Stream' },
                            { data: 'Group' },
                            { data: 'First Name' },
                            { data: 'Known Name' },
                            { data: 'Surname' },
                            { data: 'Nationality' },
                            { data: 'Nationality Region' },
                            { data: 'Gender' },
                            { data: 'Age' },
                            { data: 'Relevant Experience' },
                            { data: 'Country of Residence' },
                            { data: 'CoR Region' },
                            { data: 'GMAT Score(total)' },
                            { data: 'Quant' },
                            { data: 'English Mother Tongue' },
                            { data: 'English Scores' },
                            { data: 'Job Title' },
                            { data: 'Company Name' },
                            { data: 'City (Employment)' },
                            { data: 'Country(Employment)' },
                            { data: 'Professional Category (PO team)' },
                            { data: 'Job Function' },
                            { data: 'Email Address' },
                            { data: 'School Email' },
                            { data: 'Q Score' },
                            { data: 'Q Score %' },
                            { data: 'V Score' },
                            { data: 'V Score %' },
                            { data: 'AW Score' },
                            { data: 'AW Score  %' },
                            { data: 'IR Score' },
                            { data: 'IR Score  %' },
                            { data: 'Second Nationality' },
                            { data: 'Home City' },
                            { data: 'Microeconomics Waiver' },
                            { data: 'Macroeconomics Waiver' },
                            { data: 'DAM Waiver' },
                            { data: 'Visa at risk' },
                            ]

                });

        }

// get the json file to be loaded on the table
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
                        console.log("error message")
                        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    }
                });

}

// get the Json data into the table
function table_load(data,table_id){
    "use strict"
    debugger;
    create_header(data,"edit-table-head");
    create_body(data,"edit-table-head");

    function create_header(data, table_head_id){

    var i;
    var cols=[];
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

    function create_body(data, table_body_id){
    var i;
    var cols=[];
    for(var key in data[0]){
        if (cols.indexOf(key) === -1) {
                    cols.push(key);
                    // console.log(key);
                }
        }

    var table_body = document.getElementById("edit-table-body")
                      // TABLE ROW.
    for (i = 1; i < data.length; i++) {
        var tr = table_body.insertRow(-1);
        for (key in data[i]) {
            if (cols.indexOf(key) !== -1) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = data[i][key];
                th.ondblclick = function(){
                            // Get the row id where the cell exists
                            var rowId = this.parentNode.rowIndex;
                            var rowsNotSelected = table_body.getElementsByTagName('tr');
                            for (var row = 0; row < rowsNotSelected.length; row++) {
                                rowsNotSelected[row].style.backgroundColor = "";
                                rowsNotSelected[row].classList.remove('selected');
                            }
                            var rowSelected = table.getElementsByTagName('tr')[rowId];
                            rowSelected.style.backgroundColor = "#E1FBFA";
                            rowSelected.className += " selected";

                            debugger;
                            // popup_row(rowSelected,rowsNotSelected,rowId,cols);
                            popup_data(rowSelected,rowsNotSelected,rowId,cols);


                }

                th.onclick = function(){
                            // Get the row id where the cell exists
                            var rowId = this.parentNode.rowIndex;
                            var rowsNotSelected = table_body.getElementsByTagName('tr');
                            for (var row = 0; row < rowsNotSelected.length; row++) {
                                rowsNotSelected[row].style.backgroundColor = "";
                                rowsNotSelected[row].classList.remove('selected');
                            }
                            var rowSelected = table.getElementsByTagName('tr')[rowId];
                            rowSelected.style.backgroundColor = "#E1FBFA";
                            rowSelected.className += " selected";
                }
                // th.contentEditable = true;
                tr.appendChild(th);
            }
        }
        }
    }

}

// visualise only the selected row
function popup_row(rowSelected,rowsNotSelected,rowId,cols){
    "use strict"
    var form = document.createElement("form");
    var button_modal_submit = document.getElementById("button_modal_submit");
    var record_num = document.getElementById("record_num");
    var input;
    var label;
    var form_group;


    for(var i=0;i<rowSelected.cells.length;i++){

        form_group = document.createElement("div");
        form_group.className = "form-group";
        form_group.style = "overflow: auto;"

        label = document.createElement("label");
        label.className = "control-label col-md-6 col-sm-6 col-xs-12";

        input = document.createElement("input");
        input.className = "control-input col-md-6 col-sm-6 col-xs-12";
        input.type = "text";
        input.addEventListener('change', function() {
            debugger;
            console.log(this);
            this.style.border = '1px solid #01d28e';
            button_modal_submit.disabled = false;
        });

        label.textContent = cols[i];
        label.value = cols[i];
        input.value = rowSelected.cells[i].innerText;
        input.id = "id_" + cols[i];

        form_group.append(label);
        form_group.append(input);

        form.append(form_group);

    }

    record_num.innerText = rowId;
    debugger;
    $('#modal-body').html(form);

    $('#update-modal').modal('show');

}

// visualise the selected row and navigate all records
function popup_data(rowSelected,allRows,rowId,cols){
    "use strict"

    var div_form = document.createElement("div");
    var button_modal_submit = document.getElementById("button_modal_submit");
    var record_num = document.getElementById("record_num");
    var input;
    var label;
    var form_group;

    for (var row = 0; row < allRows.length; row++) {
        var div_step = document.createElement("div");
        div_step.id = "modal-step-" + row;

        for(var i=0;i<rowSelected.cells.length;i++){

                form_group = document.createElement("div");
                form_group.className = "form-group";
                form_group.style = "overflow: auto;"

                label = document.createElement("label");
                label.className = "control-label col-md-6 col-sm-6 col-xs-12";

                input = document.createElement("input");
                input.className = "control-input col-md-6 col-sm-6 col-xs-12";
                input.type = "text";
                input.addEventListener('change', function() {
                    debugger;
                    console.log(this);
                    this.style.border = '1px solid #01d28e';
                    button_modal_submit.disabled = false;
                 });

                label.textContent = cols[i];
                label.value = cols[i];
                input.value = rowSelected.cells[i].innerText;
                input.id = "id_" + cols[i];

                form_group.append(label);
                form_group.append(input);

                div_step.append(form_group);
                debugger;


        }
        if (row !== rowId){
            div_step.style.display = "none";
        }
        if (row === rowId){
            div_step.style.display = "block";
        }
        div_form.append(div_step);
    }

    debugger;
    record_num.innerText = rowId;
    debugger;
    $('#modal-body').html(div_form);

    $('#update-modal').modal('show');

}

