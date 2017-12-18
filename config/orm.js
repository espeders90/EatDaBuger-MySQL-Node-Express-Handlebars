var connection = require("./connection.js");

// function printQuestionMarks(num) {
//   var arr = [];

//   for (var i = 0; i < num; i++) {
//     arr.push("?");
//   }

//   return arr.toString();
// }

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.String();
}

var orm = {
    selectAll: function(table, cb) {
        var queryString = "Select * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, burger_name, cb) {
        var queryString = "INSERT INTO " + table + "(burger_name) VALUES (" + burger_name + ")";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE" + table;
        queryString = queryString + "SET";
        queryString = queryString + objToSql(objColVals);
        queryString = queryString + "WHERE";
        queryString = queryString + condition;
        console.log(condition);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
};

module.exports = orm;
