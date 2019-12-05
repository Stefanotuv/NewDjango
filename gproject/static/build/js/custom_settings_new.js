var settings_loaded = false;
var lists_loaded={}

function read_lists(){
    "use strict"
    function savelist(data){
        debugger;
        for(var i=0;i<data.length;i++){
            lists_loaded[data[i]['name']] = data[i]['list_value'];
        }

    }

    $.ajax({
            type: 'GET',
            // url:'/api/elaborations/settings/1', elaborations/settings-lists/group/
            url: '/api/elaborations/settings-lists/user',
            success: function (data) {
                savelist(data);

            },
            error: function (xhr, errmsg, err) {
                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });


}

function add_settings(){
    "use strict"
    var edit_table_settings_body = document.getElementById("edit-table-settings-body");

    var tr = edit_table_settings_body.insertRow(0);

    var row_numbers = 0;


    var list_default = "<label> \n" +
     "                   <input type=\"checkbox\" class=\"flat\" checked=\"checked\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
     "                 </label>";

    var option_default = "<select class=\"form-control mid-control\">\n" +
     "                         <option>None</option>\n" +
    "                        <option>List</option>\n" +
     "                         <option>Range</option>\n" +
     "                       </select>";

    var option_default_empty = "<select class=\"form-control mid-control\">\n" +
     "                         <option>None</option>\n" +
    "                        <option>List</option>\n" +
     "                         <option>Range</option>\n" +
     "                       </select>";



    var check_box = '<label> \n' +
        '<input type="checkbox" class="flat" style="margin-right: 10px;"> NOT EMPTY \n' +
        '</label>';

    var edit_save_delete = "<div style=\"display: inline-block; text-align: center;\">\n" +
            "<a style=\"color: #2A3F54;padding: 3px;\">\n" +
            "  <i class=\"fa fa-pencil fa-2x\" style=\"padding: 3px;\"></i> </a>\n" +
            "<a style=\"color: #2A3F54;\">\n" +
            " <i class=\"fa fa-save fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "<a style=\"color: #2A3F54;\">\n" +
        "<i class=\"fa fa-trash fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
        "</div>";

    var input_value ='<input>'

    var option_list = "";
    read_lists()
    var sel_1 = document.createElement("select");
    sel_1.className = "form-control mid-control";
    for(var key_ in lists_loaded){
        var opt_ = document.createElement('option');
        opt_.innerText = key_;
        sel_1.appendChild(opt_);
    }
    option_list = sel_1

    var td_1 = document.createElement("td");
    td_1.innerHTML = "#";
    // td_1.id = "id-col-#-" + parseInt(i);
    tr.appendChild(td_1);

    var td_2 = document.createElement("td");
    td_2.innerHTML = "XXX";
    tr.appendChild(td_2);

    var td_3 = document.createElement("td");
    td_3.innerHTML = "autosave";
    tr.appendChild(td_3);

    var td_4 = document.createElement("td");
    td_4.style.textAlign = "center";
    td_4.innerHTML = check_box;
    tr.appendChild(td_4);

    var td_5 = document.createElement("td");
    td_5.innerHTML = option_default;
    tr.appendChild(td_5);

    var td_6 = document.createElement("td");
    td_6.appendChild(option_list); // list
    tr.appendChild(td_6);

    // var td_7 = document.createElement("td");
    // td_7.innerHTML = option_default;
    // tr.appendChild(td_7);

    var td_7 = document.createElement("td");
    td_7.innerHTML = "";
    tr.appendChild(td_7);

    var td_8 = document.createElement("td");
    td_8.innerHTML = input_value;
    td_8.style.textAlign = "center";
    tr.appendChild(td_8);

    var td_9 = document.createElement("td");
    td_9.innerHTML = input_value;
    td_9.style.textAlign = "center";
    tr.appendChild(td_9);

    var td_10 = document.createElement("td");
    td_10.innerHTML = "";
    tr.appendChild(td_10);

    var td_11 = document.createElement("td");
    td_11.innerHTML = "";
    tr.appendChild(td_11);



    var td_12 = document.createElement("td");
    td_12.style.textAlign = "center";
    td_12.innerHTML = edit_save_delete;
    tr.appendChild(td_12);
};


function read_settings(username){
    "use strict"
    // open file settings with ajax API call
    var temp;
    var edit_save_delete = "<div style=\"display: inline-block; text-align: center;\">\n" +
            "<a style=\"color: #2A3F54;padding: 3px;\">\n" +
            "  <i class=\"fa fa-pencil fa-2x\" style=\"padding: 3px;\"></i> </a>\n" +
            "<a style=\"color: #2A3F54;\">\n" +
            " <i class=\"fa fa-save fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "<a style=\"color: #2A3F54;\">\n" +
        "<i class=\"fa fa-trash fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
        "</div>";

    var elaboration_settings_group = document.getElementById('select_group_elaborations').selectedIndex;
    if(elaboration_settings_group !== "Choose Settings List") {

        read_lists();
        $.ajax({
            type: 'GET',
            // url:'/api/elaborations/settings/1', elaborations/settings-lists/group/
            url: '/api/elaborations/settings-lists/group/',
            data: {elaboration_settings_group: elaboration_settings_group},

            success: function (data) {
                if(settings_loaded===true){
                    document.getElementById("edit-table-settings-head").innerText = "";
                    document.getElementById("edit-table-settings-body").innerText = "";
                }
                settings_loaded=false;
                table_load_settings(data);
                settings_loaded=true;
            },
            error: function (xhr, errmsg, err) {
                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });


    }
}
function table_load_settings(data) {
            "use strict"
            current_data_set = data;
            create_header(data, "edit-table-settings-head");
            create_body_and_modal(data, "edit-table-settings-body");

            function create_header(data, table_head_id) {
                if (submitted === true) {
                    document.getElementById("edit-table-settings-head").innerText = "";
                }
                var i;
                var cols = [];
                // cols.push('#'); // intial column to store the record number
                for (var key in data[0]) {
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
                    if (cols[i]==='list_DB'){
                        var th_ = document.createElement("th");      // TABLE HEADER.
                        th_.style.textAlign = 'center';
                        th_.innerHTML = 'values';
                        tr.appendChild(th_);
                    }
                }
                var th_1 = document.createElement("th");      // TABLE HEADER.
                th_1.style.textAlign = 'center';
                th_1.innerHTML = 'Modify';
                tr.appendChild(th_1);
            }

            function create_body_and_modal(data, table_body_id) {
                // variable for the table fields
                var list_default_checked =
                    "<label> \n" +
                    "<input type=\"checkbox\" class=\"flat\" checked=\"checked\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
                    "</label>";
                var list_default_un_checked =
                    "<label> \n" +
                    "<input type=\"checkbox\" class=\"flat\" style=\"margin-right: 10px;\"> NOT EMPTY \n" +
                    "</label>";
                var edit_save_delete = "<div style=\"display: inline-block; text-align: center;\">\n" +
                    "<a style=\"color: #2A3F54;padding: 3px;\">\n" +
                    "  <i class=\"fa fa-pencil fa-2x\" style=\"padding: 3px;\"></i> </a>\n" +
                    "<a style=\"color: #2A3F54;\">\n" +
                    " <i class=\"fa fa-save fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
                    "<a style=\"color: #2A3F54;\">\n" +
                "<i class=\"fa fa-trash fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
                "</div>";

                if (submitted === true) {
                    // if the data have been submitted before, reset the table
                    document.getElementById("edit-table-settings-body").innerText = "";
                }

                var i;
                var cols = []; // columns for the table


                // column-headers for both main table and modal
                // the first row of the data is a dictionary with all headers
                for (var key in data[0]) {
                    if (cols.indexOf(key) === -1) {
                        cols.push(key);}
                    if (key==='list_DB'){
                        cols.push('values');
                    }
                }
                cols.push('modify');

                // create the body for the main table
                var table_body = document.getElementById("edit-table-settings-body");

                for (i = 0; i < data.length; i++) {

                    var tr = table_body.insertRow(-1); // create a row on the main table

                    var td = document.createElement("td");

                    for (var j=0; j<cols.length; j++) {
                        if (cols.indexOf(cols[j]) !== -1) {
                            // value of each cell
                            td = document.createElement("td");
                            if (cols[j] === 'mandatory') {
                                td.style.textAlign = "center";
                                if (data[i][cols[j]] === true) {
                                    td.innerHTML = list_default_checked;
                                } else if (data[i][cols[j]] === false) {
                                    td.innerHTML = list_default_un_checked;
                                }

                                // td.innerHTML = data[i][key];

                            }
                            else if (cols[j] === 'option_value') {
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

                                if (data[i][cols[j]] === "None") {
                                    opt1.selected = "true";
                                } else if (data[i][cols[j]] === "List") {
                                    opt2.selected = "true";
                                } else if (data[i][cols[j]] === "Range") {
                                    opt3.selected = "true";
                                }

                                td.appendChild(sel1);



                            }
                            else if (cols[j] === 'list_DB') {
                                console.log(data[i][cols[j]]);
                                if (data[i][cols[j]] !== null) {
                                    var sel = document.createElement("select");
                                    sel.className = 'form-control mid-control';
                                    var opt = document.createElement("option");
                                    opt.innerHTML = data[i][cols[j]]["name"];
                                    sel.appendChild(opt)
                                    td.appendChild(sel);

                                    //addd the other list too?

                                } else {
                                    td.innerHTML = data[i][cols[j]];
                                }

                            }
                            else if(cols[j] === 'values'){
                                debugger;
                                if((data[i]['list_DB'] !== null)&&(lists_loaded[data[i]['list_DB']['name']]!==undefined)){
                                    var sel__ = document.createElement("select");
                                    for(var x=0;x<lists_loaded[data[i]['list_DB']['name']].length; x++){
                                        var opt__ = document.createElement("option");
                                       opt__.innerText = lists_loaded[data[i]['list_DB']['name']][x]['value'];
                                       sel__.appendChild(opt__);
                                    }
                                    td.appendChild(sel__);
                                }

                            }
                            else if ((cols[j] === 'range_from') || (cols[j] === 'range_to')) {

                                console.log(data[i][key]);

                                var input = document.createElement("input");
                                input.value = data[i][cols[j]];
                                td.style.textAlign = 'center';
                                td.appendChild(input);

                            }

                            else if(cols[j] === 'modify'){
                                 td = document.createElement("td");
                                td.id = "id-col-" + (cols[j]) + "-" + (parseInt(i)+1);
                                td.style.textAlign="center";
                                 td.innerHTML = edit_save_delete;
                            }

                            else {
                                td.style.textAlign = 'center';
                                td.innerHTML = data[i][cols[j]];

                            }
                            td.id = "id-col-" + key + "-" + parseInt(i);
                            tr.appendChild(td);

                        }
                    }


                    tr.appendChild(td);







                }

            }

        }
function read_settings_group() {
    "use strict"
    // open file settings with ajax API call
    var temp;
    $.ajax({
            type:'GET',
            url:'/api/elaborations/settings-group/user',
            success: function(data) {
                 option_load_group(data);
             },
            error : function(xhr,errmsg,err) {
                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    function option_load_group(data){
            var select = document.getElementById("select_group_elaborations");
            debugger;
            for (var i = 0; i < data.length; i++) {
                var opt = document.createElement("option");
                opt.innerHTML = data[i]['group_name'];
                opt.id = data[i]['id'];
                select.appendChild(opt);
            }







    }
}