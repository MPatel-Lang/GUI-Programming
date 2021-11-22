/*
Name: Mehul Patel
Email: Mehul_Patel@student.uml.edu
Assignment #4: Validate user input using jQuery Part 2
File: form-validation.js"
Date: 11/22/21
*/

function validate_form() {
    $.validator.addMethod("upperbound_greater_lowerbound", function (value, element, param) {
        /* Ensure that the user entered an upper bound value that's greater than the lower bound value. */
        return parseInt(value, 10) >= parseInt($(param).val(), 10);
    });

    var validator = $('#myform').validate({
        rules: {
          /* Ensure the form input values are correctly inputted */
          row1: {
              required: true,
              digits: true,
              min: 0
          },
          row2: {
              required: true,
              digits: true,
              upperbound_greater_lowerbound: "#row1"
          },
          col1: {
              required: true,
              digits: true,
              min: 0
          },
          col2: {
              required: true,
              digits: true,
              upperbound_greater_lowerbound: "#col1"
          }
        },
        /* Output a relevant message based on the type of incorrect field entry. */
        messages: {
          row1: {
            required: "This is a required field!",
            digits: "Enter an integer for the lower bound row value."
          },
          row2: {
            required: "This is a required field!",
            digits: "Enter an integer for the upper bound row value.",
            upperbound_greater_lowerbound: "You need to enter a value greater than row1."

          },
          col1: {
            required: "This is a required field!",
            digits: "Enter an integer for the lower bound column value."
          },
          col2: {
            required: "This is a required field!",
            digits: "Enter an integer for the upper bound column value.",
            upperbound_greater_lowerbound: "You need to enter a value greater than col1."
          }
        },
        errorPlacement: function(label, element) {
            label.addClass('arrow');
            label.insertAfter(element);
        },

        wrapper: 'span',

        submitHandler: function (form) {
            create_table()
        }
    }); // end of form validation
}
