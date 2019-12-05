function post_list(user) {
        "use strict"
        var fileSelect = document.getElementById('id_document_input_list').files[0];
        var filename = fileSelect.name;

        // console.log( 'fileSelect:' );
        // console.log( fileSelect );
        debugger;
        var formData = new FormData();
        formData.append('user', user);
        formData.append('name', $("#id_name_list").val());
        formData.append('document_input', fileSelect, filename);
        formData.append('csrfmiddlewaretoken', $("input[name=csrfmiddlewaretoken]").val());

        var call_results = $.ajax({
            type:'POST',
            url:'/api/elaborations/list/add',
            enctype: 'multipart/form-data',
            dataType:'json',
            processData: false,
            contentType: false,
            crossDomain: true,
            data: formData,
            success: function(data) {
                debugger;
                console.log("success");

            },
            error : function(xhr,errmsg,err) {
                debugger;

                console.log("error message");
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }