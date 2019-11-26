// various routines to review the input data correctness
//
// 1) checks the various columns.
//     key colums are included
//
// 2) review the columns against they allowed inputs
//
// 3) create a list of issues


function check_columns_headers(data){

    // verify that the key / mandatory columns are in the data
    "use strict"

    var missing_or_wrong_headers = [];
    var included_headers = [];

    debugger;
    for (var mandatory_header in mandatory_columns_headers){
        if (mandatory_header in data[0]){
            included_headers.push(mandatory_header);
        }
        else {
            missing_or_wrong_headers.push(mandatory_header);
        }
    }

    var headers_check = [
        {"included":included_headers},
        {"not_included":missing_or_wrong_headers}
    ];

    return headers_check;
}




function check_by_row(data){
    "use strict"
    for (var i=1; i<data.length;i++){
        for (var column in data[i]){

        }
    }
}


function check_empty_or_value_cells(array,values_or_range,values,range){
    "use strict"
    var empty_or_value_cells_rows = [];
    for (var i=0; i< array.length;i++){

        // check if the cells are empty and if they are not,
        // whether the cells is included in a set of values or in a range

        if ((array[i] === "")) {
            empty_or_value_cells_rows.push({i:"empty"});
        }else{
            if (values_or_range === "values"){
                if (!(array[i] in values)){
                    empty_or_value_cells_rows.push({i:"value issue"});
                }
            }
            else if(values_or_range ==="range"){
                empty_or_value_cells_rows.push({i:"range issue"});
            }
        }
    }
    return empty_or_value_cells_rows;
}

function create_column(data,col_name){
    "use strict"
    var array =[]
    for(var i=1;i<data.length;i++){
        array.push(data[i][col_name]);
    }
}

function    check_first_name(data){
    "use strict"
    // check if the column exist before running the loop
    // the loop is to verify that the cells are not empty
    if ("First Name" in data[0]){
        return check_empty_or_value_cells(create_column(data,"First Name"));
    }
};
function    check_surname(data){
    "use strict"
    if ("Surname" in data[0]){
        return check_empty_or_value_cells(create_column(data,"Surname"));
    }
};
function    check_gender(data){
    "use strict"
        if ("gender" in data[0]){
        return check_empty_cells(create_column(data,"gender"));
    }

};
function    check_age(data){
    "use strict"
};
function    check_relevant_exp(data){
    "use strict"
};
function    check_gmat(data){
    "use strict"
};
function    check_q_gmat(data){
    "use strict"
};
function    check_eng_mother_tongue(data){
    "use strict"
};
function    check_company_name(data){
    "use strict"
};
function    check_job_function(data){
    "use strict"
};
function    check_email(data){
    "use strict"
};
function    check_nationality(data){
    "use strict"
};
function    check_second_nationality(data){
    "use strict"
};
function    check_micro_waiver(data){
    "use strict"
};
function    check_macro_waiver(data){
    "use strict"
};
function    check_dam_waiver(data){
    "use strict"
};
function    check_visa_at_risk(data){
    "use strict"
};



