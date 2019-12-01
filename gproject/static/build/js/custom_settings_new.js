function add_settings(){
    "use strict"
    var edit_table_settings_body = document.getElementById("edit-table-settings-body");

    var tr = edit_table_settings_body.insertRow(0);

    var td_1 = document.createElement("td");
    td_1.innerHTML = "#";
    // td_1.id = "id-col-#-" + parseInt(i);
    tr.appendChild(td_1);

    var td_2 = document.createElement("td");
    td_2.innerHTML = "XXX";
    tr.appendChild(td_2);

    var list_default = "<label> \n" +
     "                   <input type=\"checkbox\" class=\"flat\" checked=\"checked\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
     "                 </label>";

    var option_default = "<select class=\"form-control mid-control\">\n" +
     "                         <option>Choose option</option>\n" +
    "                        <option>Option one</option>\n" +
     "                         <option>Option two</option>\n" +
     "                         <option>Option three</option>\n" +
     "                         <option>Option four</option>\n" +
     "                       </select>";


    var td_3 = document.createElement("td");
    td_3.style.textAlign = "center";
    td_3.innerHTML = list_default;
    tr.appendChild(td_3);


    var td_4 = document.createElement("td");
    td_4.innerHTML = option_default;
    tr.appendChild(td_4);

    var td_5 = document.createElement("td");
    td_5.innerHTML = option_default;
    tr.appendChild(td_5);

    var td_6 = document.createElement("td");
    td_6.innerHTML = option_default;
    tr.appendChild(td_6);

    var td_7 = document.createElement("td");
    td_7.innerHTML = option_default;
    tr.appendChild(td_7);

    var td_8 = document.createElement("td");
    td_8.style.textAlign = "center";
    td_8.innerHTML = "<div style=\"display: inline-block; text-align: center;\">\n" +
            "                                                    <a style=\"color: #2A3F54;padding: 3px;\">\n" +
            "                                                        <i class=\"fa fa-pencil fa-2x\" style=\"padding: 3px;\"></i> </a>\n" +
            "                                                    <a style=\"color: #2A3F54;\">\n" +
            "                                                        <i class=\"fa fa-save fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "                                                    <a style=\"color: #2A3F54;\">\n" +
            "                                                        <i class=\"fa fa-trash fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "                                                </div>";
    tr.appendChild(td_8);
};

function read_settings(username){
    "use strict"
    // open file settings with ajax API call
    var temp;
    $.ajax({
            type:'GET',
            url:'/api/elaborations/settings/1',
            success: function(data) {
                debugger;
                 table_load_settings(data);
             },
            error : function(xhr,errmsg,err) {
                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    debugger;
    function table_load_settings(data){
            "use strict"
            current_data_set = data;
            create_header(data,"edit-table-settings-head");
            create_body_and_modal(data,"edit-table-settings-body");

            function create_header(data, table_head_id){
                if (submitted === true){
                    document.getElementById("edit-table-settings-head").innerText = "";
                }
                var i;
                var cols=[];
                // cols.push('#'); // intial column to store the record number
                for(var key in data[0]){
                    if (cols.indexOf(key) === -1) {
                                cols.push(key);
                                // console.log(key);
                            }
                    }
                var table_head = document.getElementById("edit-table-settings-head")
                var tr = table_head.insertRow(-1);                   // TABLE ROW.
                for (i = 0; i < cols.length; i++) {
                        var th = document.createElement("th");      // TABLE HEADER.
                        th.style.textAlign = 'center';
                        th.innerHTML = cols[i];
                        tr.appendChild(th);
                    }
                }

            function create_body_and_modal(data, table_body_id){
                // variable for the table fields
                var list_default_checked =
                        "<label> \n" +
                            "<input type=\"checkbox\" class=\"flat\" checked=\"checked\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
                        "</label>";
                var list_default_un_checked =
                        "<label> \n" +
                            "<input type=\"checkbox\" class=\"flat\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
                        "</label>";

                if (submitted === true){
                    // if the data have been submitted before, reset the table
                    document.getElementById("edit-table-settings-body").innerText = "";
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
                var table_body = document.getElementById("edit-table-settings-body");

                for (i = 0; i < data.length; i++) {
                    debugger;
                    var tr = table_body.insertRow(-1); // create a row on the main table


                    var td = document.createElement("td");
                    // add the first column for the record number
                    // td.innerHTML = i;
                    // td.id = "id-col-#-" + parseInt(i);
                    // tr.appendChild(td);

                    for (key in data[i]) {
                        if (cols.indexOf(key) !== -1) {

                            // value of each cell
                            td = document.createElement("td");
                            if(key=== 'mandatory'){
                                debugger;
                                td.style.textAlign = "center";
                                if(data[i][key] === true){
                                    td.innerHTML = list_default_checked;
                                }else if(data[i][key] === false){
                                    td.innerHTML = list_default_un_checked;
                                }

                                // td.innerHTML = data[i][key];

                            }
                            else if(key=== 'option_value'){
                                debugger;
                                var sel1 = document.createElement("select");
                                sel1.className = 'form-control mid-control';

                                var opt1 = document.createElement("option");
                                var opt2 = document.createElement("option");
                                var opt3 = document.createElement("option");

                                opt1.innerHTML = "None";
                                opt2.innerHTML = "List";
                                opt3.innerHTML = "Range";

                                sel1.appendChild(opt1);
                                sel1.appendChild(opt2);
                                sel1.appendChild(opt3);

                                if (data[i][key] === "None" ){opt1.selected = "true";}
                                else if (data[i][key] === "List" ){opt2.selected = "true";}
                                else if (data[i][key] === "Range" ){opt3.selected = "true";}

                                td.appendChild(sel1);

                            }
                            else if(key=== 'list_DB'){
                                debugger;
                                console.log(data[i][key]);
                                if (data[i][key] !== null ){
                                    var sel = document.createElement("select");
                                    sel.className = 'form-control mid-control';
                                    var opt = document.createElement("option");
                                    opt.innerHTML = data[i][key]["name"];
                                    sel.appendChild(opt)
                                    td.appendChild(sel);

                                }
                                else{
                                 td.innerHTML = data[i][key];
                                }

                            }
                            else if((key=== 'range_from')||(key=== 'range_to')){
                                debugger;
                                console.log(data[i][key]);

                                var input = document.createElement("input");
                                input.value = data[i][key];
                                td.style.textAlign = 'center';
                                td.appendChild(input);

                            }
                            else{
                                td.style.textAlign = 'center';
                                td.innerHTML = data[i][key];

                            }
                            td.id = "id-col-"+ key + "-" + parseInt(i);
                            tr.appendChild(td);

                        }

                    }
                }

            }

            }
}

