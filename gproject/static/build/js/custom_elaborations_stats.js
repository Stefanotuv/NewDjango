current_data_set;

function stats(item,type) {
    "use strict"
    var data = current_data_set;
    debugger;

    if ((item === "#") || (item === "")) {
        return data.length;
    } else {

        var iterable = [];
        for (var i = 0; i < data.length; i++) {
            iterable.push(data[i][item]);
        }


        if ((type === "count") || (type === "")) {

            return countUnique(iterable);

        } else if (type === "list") {
            debugger;
            var size = countUnique(iterable);
            var list_unique = returnUnique(iterable);
            var list_unique_number = {};
            for (var t = 0; t < size; t++) {
                var count = 0;
                for (var h = 0; h < data.length; h++) {
                    if (data[h][item] === list_unique[t]) {
                        count = count + 1;
                    }
                }

                list_unique_number[list_unique[t]] = count ;
            }
            debugger;
            return list_unique_number;
        }
    }
}

function countUnique(iterable) {
    "use strict"
    debugger
    return new Set(iterable).size;
}

function returnUnique(list) {
    "use strict"
    var list_unique_pop = new Set(list).values();
    var size = new Set(list).size;
    var list_unique = [];
    debugger
    for(var k=0;k<size;k++){
        list_unique.push(list_unique_pop.next().value);
    }

    debugger;

    return list_unique;
}