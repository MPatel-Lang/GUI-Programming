/*
Name: Mehul Patel
Email: Mehul_Patel@student.uml.edu
Assignment #4: Validate user input using jQuery Part 2
File: form-validation.js"
Date: 11/22/21
*/

$(document).ready(function () {
	$("#tabs").tabs()

	create_sliders()

	$("#submit-button").on("click", function () {
		create_tab()
	});

	/*Validation form */
	if (validate_form()) {
		create_table()
	}
});

function create_tab() {
	var num_tabs = $("#tabs li").length + 1;

	$("div#tabs ul").append(
        "<li class='tab'><a href='#tab-" + num_tabs + "'>Tab #" + num_tabs + "</a></li>"
	);

	$("div#tabs").append(
		'<div id="tab-' + num_tabs + '">' + $("#my_table").html() + '</div>'
	);

	$("#tabs").tabs("refresh");
	$("#tabs").tabs("option", "active", -1);
}
