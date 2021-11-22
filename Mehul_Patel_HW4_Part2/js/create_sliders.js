/*
Name: Mehul Patel
Email: Mehul_Patel@student.uml.edu
Assignment #4: Validate user input using jQuery Part 2
File: create_sliders.js"
Date: 11/22/21
*/

function create_sliders() {
    $('#first-row').slider({
        min: 0,
        max: 30,
        range: [0, 30],
        value: 5,

        slide: function(event, ui) {
            $("#row1").val(ui.value);
            $(this).find('.ui-slider-handle').text(ui.value);
            submit_on_valid_change();
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    });

    $("#row1").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 30 && input_val >= 0) {
            $("#first-row").slider("value", input_val);
            $('#first-row > .ui-slider-handle').text(input_val);
            submit_on_valid_change();
        }
    });

    $('#second-row').slider({
        min: 0,
        max: 30,
        range: [0, 30],
        value: 5,

        slide: function(event, ui) {
            $("#row2").val(ui.value);
            $(this).find('.ui-slider-handle').text(ui.value);
            submit_on_valid_change();
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    });

    $("#row2").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 30 && input_val >= 0) {
            $("#second-row").slider("value", input_val);
            $('#second-row > .ui-slider-handle').text(input_val);
            submit_on_valid_change();
        }
    });

    $("#first-col").slider({
        min: 0,
        max: 30,
        range: [0, 30],
        value: 5,

        slide: function( event, ui ) {
            $("#col1").val(ui.value);
            $(this).find('.ui-slider-handle').text(ui.value);
            submit_on_valid_change();
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    });

    $("#col1").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 30 && input_val >= 0) {
            $("#first-col").slider("value", input_val);
            $('#first-col > .ui-slider-handle').text(input_val);
            submit_on_valid_change();
        }
    });

    $('#second-col').slider({
        min: 0,
        max: 30,
        range: [0, 30],
        value: 5,

        slide: function( event, ui ) {
            $("#col2").val(ui.value);
            $(this).find('.ui-slider-handle').text(ui.value);
            submit_on_valid_change();
        },
        create: function(event, ui) {
            var v = $(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    });

    $("#col2").change(function () {
        var input_val = $(this).val();

        if (!isNaN(input_val) && input_val <= 30 && input_val >= 0) {
            $("#second-col").slider("value", input_val);
            $('#second-col > .ui-slider-handle').text(input_val);
            submit_on_valid_change();
        }
    });
};

function submit_on_valid_change() {
    /* This forces the form to submit when a change in slider is made. */
    var form_valid = $("#myform").valid();

    if (form_valid) {
        $("#myform").submit();
    }

    return false;
}
