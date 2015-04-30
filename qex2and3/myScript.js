
$(document).ready(function(){
	$("#myButton").click(function(){
		var name = $("#name").val();
		var age = $("#age").val();
		var gender = $("#gender").val();

		alert(name + "("+gender+") is " + age + " years old");


		$("table").append("<tr></tr>");
		$("table tr:last").append("<td>"+name+"</td>");
		$("table tr:last").append("<td>"+age+"</td>");
		$("table tr:last").append("<td>"+gender+"</td>");
	});	
});


