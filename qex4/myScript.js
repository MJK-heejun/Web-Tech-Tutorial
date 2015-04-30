
var db = null;
var db_ready = false;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// Let us open our database
var request = window.indexedDB.open("testdb", 2);


request.onerror = function(event) {
  // Do something with request.errorCode!
  console.log("opening error");
};
request.onupgradeneeded = function (e) {
	console.log('database upgraded');
	var db = e.target.result;
	// Create an objectStore for this database
	var objectStore = db.createObjectStore('peopleData', {keyPath:'name'});
};
request.onsuccess = function(event) {
  	// Do something with request.result!
  	db = event.target.result;
  	db_ready = true;
  	read();
};



$(document).ready(function(){

	$("#myButton").click(function(){
		if(db_ready){
			var name = $("#name").val();
			var age = $("#age").val();
			var gender = $("#gender").val();

			alert(name + "("+gender+") is " + age + " years old");

			$("table").append("<tr></tr>");
			$("table tr:last").append("<td>"+name+"</td>");
			$("table tr:last").append("<td>"+age+"</td>");
			$("table tr:last").append("<td>"+gender+"</td>");

			insert(name, age, gender);		
		}
	});	

	$("#delete_button").click(function(){
		var name = $("#delete_name").val();
		remove(name);
	});

});



function insert(name, age, gender){
	var transaction = db.transaction('peopleData', 'readwrite');
	var objectStore = transaction.objectStore('peopleData');

	//finish
    var object = {
      name: name, 
      age: age, 
      gender: gender
    };  

    var request = objectStore.put(object);
    request.onsuccess = function(e) {
      console.log("inserted/updated successfully");
    };    
    request.onerror = function(e){
      console.log("insert error occurred! oh no!:"+e);
    };	
}

function read(){
	//Getting data from the database
	var transaction = db.transaction('peopleData', 'readwrite');
	var objectStore = transaction.objectStore('peopleData');
	
    objectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result;
        if (cursor){
            console.log('Cursor data', cursor.value);

			$("table").append("<tr></tr>");
			$("table tr:last").append("<td>"+cursor.value['name']+"</td>");
			$("table tr:last").append("<td>"+cursor.value['age']+"</td>");
			$("table tr:last").append("<td>"+cursor.value['gender']+"</td>");

            cursor.continue();
        }else{
            console.log('Entries all displayed.');
        }
    };
}


function remove(name){
    var transaction = db.transaction('peopleData', 'readwrite');
    var objectStore = transaction.objectStore('peopleData');	
    var request = objectStore.delete(name);   

    request.onsuccess = function(e) {
      //console.log(e);
      console.log(name+" deleted");
    }; 
    request.onerror = function(e){
      //console.log(e);
      console.log("delete error occurred! oh no!:"+e);
    };     
}