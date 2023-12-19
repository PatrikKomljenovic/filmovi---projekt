var express = require('express');
var app = express();

//const dbConfig = require("./db.config.js");
var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "filmovi"
    });

dbConn.connect();

app.get("/podaci", function(request, response){
    return response.send({message:"ok"});
})
app.get("/podaci/:id", function(request, response){
    var id = request.params.id+1;
    return response.send({message: id+" ok"});
})
app.post("/podaci", function(request, response){
    var podaci = request.body.podatak;
    return response.send({message: podaci+" ok"});
})
app.get("/film", function(request, response){
    dbConn.query('SELECT * FROM filmovi', function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results, message: 'READ svi korisnici' });
         //return response.send({message:"READ korisnik (svi)"});
    });
})
app.get("/film/:id", function(request, response){
    var id = request.params.id;
    return response.send({message: "READ filmovi "+id});
})
app.post("/film", function(request, response){
    var naslov = request.body.naslov;
    var žanr = request.body.žanr;
    var godina = request.body.godina;
    var ocjena = request.body.ocjena;
    dbConn.query('INSERT INTO filmovi VALUES (NULL,?,?,?,?)',[naslov, zanr, godina, ocjena],  function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results, message: 'INSERT film ime='+naslov });
    });   
    //return response.send({message: "CREATE "+ime+" "+prezime});
})
app.put("/film/:id filma", function(request, response){
    var id = request.params.id;
    var ocjena = request.body.ocjena;
    dbConn.query('UPDATE film SET tel=? WHERE id=?', [ocjena,id],  function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results, message: 'UPDATE korisnik id='+id+'ocjena='+ocjena });
    });
    //return response.send({message: "UPDATE "+id+" nova adresa: "+adresa});
})
app.delete("/film/:id", function(request, response){
    var id = request.params.id;
    dbConn.query('DELETE FROM film WHERE id=?',id,  function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results, message: 'DELETE film id='+id });
    })

    //return response.send({message: "DELETE "+id});
})


// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
