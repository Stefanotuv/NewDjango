// various routines to review the input data correctness
//
// 1) checks the various columns.
//     key colums are included
//
// 2) review the columns against they allowed inputs
//
// 3) create a list of issues

var issue_summary = 0; // initial value to check if the check has already been performed

function check_columns_headers(data){

    // verify that the key / mandatory columns are in the data
    "use strict"

    var missing_or_wrong_headers = [];
    var included_headers = [];

    debugger;
    for (var i=0; i< mandatory_columns_headers.length;i++){
        if (mandatory_columns_headers[i] in data[0]){
            included_headers.push(mandatory_columns_headers[i]);
        }
        else {
            missing_or_wrong_headers.push(mandatory_columns_headers[i]);
        }
    }

    var headers_check = {
            "included":included_headers,
            "not_included":missing_or_wrong_headers
        };
    debugger;
    return headers_check;
}

function check_by_row(data, headers_check ){
    "use strict"
    var included = headers_check['included'];
    var results_row = [];
    var k;
    for (var i=0; i<data.length;i++){
        var result_row = {};
        if (i === 18){

        }
        for (var j=0;j< included.length;j++){
            switch(included[j]){
                case "School Number":
                    var school_number = 0;
                    result_row["School Number"]= check_value_cells(data[i][included[j]],null,null);
                    break;
                case "First Name":
                    var first_name = 0;
                    result_row["First Name"]= check_value_cells(data[i][included[j]],null,null);
                    break;
                case "Surname":
                    var surname = 0;
                    result_row["Surname"]= check_value_cells(data[i][included[j]],null,null);
                    break;
                case "Known Name":
                     var known_name = 0;
                    result_row["Known Name"]= check_value_cells(data[i][included[j]],null,null);
                    break;
                case "Nationality":
                     var nationality = 0;
                    result_row["Nationality"]= check_value_cells(data[i][included[j]],nationality_list,null);
                    break;
                case "Gender":
                     k = 0;
                     result_row["Gender"]= check_value_cells(data[i][included[j]],gender_list,null);
                     break;
                case "Age":
                     k = 0;
                     result_row["Age"]= check_value_cells(data[i][included[j]],null,age_range);
                     break;
                case "Relevant Experience":
                     k = 0;
                     result_row["Relevant Experience"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "GMAT Score(total)":
                     k = 0;
                     result_row["GMAT Score(total)"]= check_value_cells(data[i][included[j]],null,gmat_range);
                     break;
                case "Quant":
                     k = 0;
                     result_row["Quant"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "English Mother Tongue":
                     k = 0;
                     result_row["English Mother Tongue"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "English Scores":
                     k = 0;
                     result_row["English Scores"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Company Name":
                     k = 0;
                     result_row["Company Name"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "City (Employment)":
                     k = 0;
                     result_row["City (Employment)"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Country(Employment)":
                     k = 0;
                     result_row["Country(Employment)"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Professional Category (PO team)":
                     k = 0;
                     result_row["Professional Category (PO team)"]= check_value_cells(data[i][included[j]],null,null);
                     break;

               case "Job Function":
                     k = 0;
                     result_row["Job Function"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Email Address":
                     k = 0;
                     result_row["Email Address"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "School Email":
                     k = 0;
                     result_row["School Email"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Microeconomics Waiver":
                     k = 0;
                     result_row["Microeconomics Waiver"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Macroeconomics Waiver":
                     k = 0;
                     result_row["Macroeconomics Waiver"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "DAM Waiver":
                     k = 0;
                     result_row["DAM Waiver"]= check_value_cells(data[i][included[j]],null,null);
                     break;
                case "Visa at risk":
                     k = 0;
                     result_row["Visa at risk"]= check_value_cells(data[i][included[j]],null,null);
                     break;
            }


        }
        results_row.push(result_row);
    }

    return results_row;
}

function check_value_cells(value,values,range){
    "use strict"

    var results = {};
    if(value === ""){
        results["success"]="No"; results["issue"] = "empty - value expected";
    }else{
        if((values !== null)){

            if((value in values)){
                results["success"]="Yes"; results["issue"] = "";
            }
            else{
                results["success"]="No"; results["issue"] = "value not in the list";
            }
        }else if((range !== null)){

            if((value >= range[0]) && (value <= range[1])){
                results["success"]="Yes"; results["issue"] = "";
            }
            else{
                results["success"]="No"; results["issue"] = "value outside expected range";
            }


        }else{

            results["success"]="Yes"; results["issue"] = "";

        }
    }
    return results;

}

function issues_summary(headers_check,rows_check){
    "use strict"
    // 1 - create the summary table
    var table_results_body = document.getElementById("table_results_body");

    if(issue_summary !==0){
        table_results_body.innerText = "";
    }

    for (var i =0; i<headers_check['not_included'].length;i++){

        var tr_c = table_results_body.insertRow(-1);
        tr_c.ondblclick = function(){ window.alert("download template file to add the missing column");};

        var td_1 = document.createElement("td");

        td_1.innerHTML = " <i class=\"fa fa-times-circle\"></i> Error";
        td_1.style.color = "red";

        var td_2 = document.createElement("td");
        td_2.innerHTML = "Column";
        td_2.style.color = "red";

        var td_3 = document.createElement("td");
        td_3.innerHTML = headers_check['not_included'][i];
        td_3.style.color = "red";

        var td_4 = document.createElement("td");
        td_4.innerHTML = "Missing mandatory column in the input file. " +
            "Please download the template file, correct and re-upload";
        td_4.style.color = "red";

        tr_c.append(td_1); tr_c.append(td_2); tr_c.append(td_3); tr_c.append(td_4);
        table_results_body.append(tr_c);
    }
    debugger;
    for(var k=0; k<rows_check.length;k++){
        var tr_r = table_results_body.insertRow(-1);

        tr_r.ondblclick = function(){
            debugger;
            var rowId = this.rowIndex - (headers_check['not_included'].length);

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
        };

        var str = "";

        var td_r_1 = document.createElement("td");
        td_r_1.innerHTML = "<i class=\"fa fa-exclamation-triangle\"></i> Warning";
        td_r_1.style.color = "#f45905";

        var td_r_2 = document.createElement("td");
        td_r_2.innerHTML = "row: " + parseInt(k);
        td_r_2.style.color = "#f45905";

        var td_r_3 = document.createElement("td");
        td_r_3.style.color = "#f45905";

        var td_r_4 = document.createElement("td");
        td_r_4.innerHTML = "review and correct the data in the table";
        td_r_4.style.color = "#f45905";

        debugger;
        for(var key in rows_check[k]){
            if (rows_check[k][key].success === "No"){
                str = str + key + " " + rows_check[k][key].issue + ", ";
            }

        }

        // td_r_3.innerHTML = str; // display all the issues details



        if (str !== ""){
            td_r_3.innerHTML = "review for empty cells, values on in the list or values on in range"
            tr_r.append(td_r_1); tr_r.append(td_r_2); tr_r.append(td_r_3); tr_r.append(td_r_4);
            table_results_body.append(tr_r);
        }

    }

    issue_summary = 1;
    // 2 - change colour of the entries in the table
}