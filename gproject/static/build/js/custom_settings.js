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

    var td_3 = document.createElement("td");
    td_3.style.textAlign = "center";
    td_3.innerHTML = "                                             <div valign=\"center\" style=\"display: inline-block;\" >\n" +
        "                                                    <label class=\"switch\">\n" +
        "                                                      <input type=\"checkbox\">\n" +
        "                                                      <span class=\"slider round\"></span>\n" +
        "                                                    </label>\n" +
        "                                                </div>";
    // td_1.id = "id-col-#-" + parseInt(i);
    tr.appendChild(td_3);



    var td_4 = document.createElement("td");
    td_4.innerHTML = "<section class=\"container_dropdown\">\n" +
        "                                                  <div class=\"dropdown_dd\">\n" +
        "                                                    <select name=\"one\" class=\"dropdown_dd-select\">\n" +
        "                                                      <option value=\"\">Select…</option>\n" +
        "                                                      <option value=\"1\">Option #1</option>\n" +
        "                                                      <option value=\"2\">Option #2</option>\n" +
        "                                                      <option value=\"3\">Option #3</option>\n" +
        "                                                    </select>\n" +
        "                                                  </div>\n" +
        "                                                  <div class=\"dropdown_dd\">\n" +
        "                                                    <select name=\"one\" class=\"dropdown_dd-select\">\n" +
        "                                                      <option value=\"\">Select…</option>\n" +
        "                                                      <option value=\"1\">Option #1</option>\n" +
        "                                                      <option value=\"2\">Option #2</option>\n" +
        "                                                      <option value=\"3\">Option #3</option>\n" +
        "                                                    </select>\n" +
        "                                                  </div>\n" +
        "                                                </section>"

    tr.appendChild(td_4);

    var td_5 = document.createElement("td");
    td_5.innerHTML = "<section class=\"container_dropdown\">\n" +
        "                                                  <div class=\"dropdown_dd\">\n" +
        "                                                    <select name=\"one\" class=\"dropdown_dd-select\">\n" +
        "                                                      <option value=\"\">Select…</option>\n" +
        "                                                      <option value=\"1\">Option #1</option>\n" +
        "                                                      <option value=\"2\">Option #2</option>\n" +
        "                                                      <option value=\"3\">Option #3</option>\n" +
        "                                                    </select>\n" +
        "                                                  </div>\n" +
        "                                                  <div class=\"dropdown_dd\">\n" +
        "                                                    <select name=\"one\" class=\"dropdown_dd-select\">\n" +
        "                                                      <option value=\"\">Select…</option>\n" +
        "                                                      <option value=\"1\">Option #1</option>\n" +
        "                                                      <option value=\"2\">Option #2</option>\n" +
        "                                                      <option value=\"3\">Option #3</option>\n" +
        "                                                    </select>\n" +
        "                                                  </div>\n" +
        "                                                </section>"
    tr.appendChild(td_5);

    var td_6 = document.createElement("td");
        td_6.innerHTML = "                                                <div style=\"display: inline-block; text-align: center;\">\n" +
            "                                                    <a style=\"color: #2A3F54;padding: 3px;\">\n" +
            "                                                        <i class=\"fa fa-pencil fa-2x\" style=\"padding: 3px;\"></i> </a>\n" +
            "                                                    <a style=\"color: #2A3F54;\">\n" +
            "                                                        <i class=\"fa fa-save fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "                                                    <a style=\"color: #2A3F54;\">\n" +
            "                                                        <i class=\"fa fa-trash fa-2x\" style=\"padding: 3px;\"></i>  </a>\n" +
            "                                                </div>";
    tr.appendChild(td_6);
};

function read_settings(username){
    "use strict"
    // open file settings with ajax API call
    var temp;
    $.ajax({
            type:'GET',
            url:'/elaborations/settings/<username> ',
            success: function(data) {
                 temp = data;
            },
            error : function(xhr,errmsg,err) {
                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    debugger;
}