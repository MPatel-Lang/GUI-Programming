/**
 AUTHOR:  Mehul Patel
   EMAIL:   mehul_patel@student.uml.edu
   FILE:    script.js

   
   FILE DESCRIPTION:
     Assignment #4: Using the jQuery Validation Plugin with Your Dynamic Table
  
     
 */
 
 
 /**
 * General purpose function that creates a HTML Table element, populates
 * it with multiplication values, and returns the new HTML Table element.
 *
 * @param {number} multiplierMinVal   - integer start of multiplier range.
 * @param {number} multiplierMaxVal   - integer end of multiplier range.
 * @param {number} multiplicandMinVal - integer start of multiplicand range.
 * @param {number} multiplicandMaxVal - integer end of multiplicand range.
 *
 * @return {HTMLTableElement} - HTML multiplication table.
 */
function createMultTable(multiplierMinVal,   multiplierMaxVal,
                         multiplicandMinVal, multiplicandMaxVal) {
                             
    var table = document.createElement('table');
    table.id = 'table';
    var firstRow = true;
    var firstCol = true;
    
    for(var row = multiplicandMinVal - 1; row <= multiplicandMaxVal; row++) {
        var tableRow = document.createElement('tr'); // Create the rows.
        
        for(var col = multiplierMinVal - 1; col <= multiplierMaxVal; col++) {
            var cell;
            var cellText;
            if(firstRow) {
                cell = document.createElement('th');
                if(!firstCol) {
                    
                    // If it's the first row and isn't the first column,
                    // put multiplier in a <th>.
                    cellText = document.createTextNode(col);
                    cell.appendChild(cellText);
                }
            } else {
                if(firstCol) {
                    
                    // If it's not the first row and is the first column,
                    // put the multiplicand in a <th>.
                    cell = document.createElement('th');
                    cellText = document.createTextNode(row);
                    cell.appendChild(cellText);
                    
                } else {
                    
                    // If it's not the first row and isn't the first column,
                    // put multiplier * multiplicand in a <td>.
                    cell = document.createElement('td');
                    cellText = document.createTextNode(row * col);
                    cell.appendChild(cellText);
                }
            }
            tableRow.appendChild(cell); // Add cell to row.
            firstCol = false;
        }
        table.appendChild(tableRow); // Add row to table.
        firstRow = false;
        firstCol = true;
    }
    return table;
}

 /**
 * General purpose function that appends a given HTML element to a given parent
 * node as the parent node's child. Or, if the parent node already has a child
 * HTML element with the same ID as the given HTML element, the child HTML
 * element is replaced with the HTML element. 
 *
 * @param {HTMLElement} newHtmlElement - Element to append into parentNode.
 * @param {Node} parentNode - Node to append newHtmlElement into.
 *
 */
function appendReplaceHtmlElement(newHtmlElement, parentNode) {
    var oldHtmlElement;
    if((oldHtmlElement = document.getElementById(newHtmlElement.id)) &&
       oldHtmlElement.parentNode === parentNode) {
           
        
        parentNode.replaceChild(newHtmlElement, oldHtmlElement);
    } else {
        parentNode.appendChild(newHtmlElement);
    }
}

if (typeof FormHandler == "undefined") { // Make sure namespace isn't used.

    /**
     * FormHandler namespace/module. Contains functions that perform specific
     * tasks for this specific HTML web page. These are not general purpose
     * functions.
     *
     * @namespace {object} FormHandler
     */
     
    var FormHandler = (function() {
        
        /**
         * Public function that initalizes the web page's form validation.
         * Uses the jQuery Validation Plugin to validate form data upon
         * detection of plugin-defined events. When data is valid, it calls
         * createMultTable() and appendReplaceHtmlElement() to generate
         * a multiplication table.
         *
         * @constructor
         * @memberof FormHandler
         */
        var init = function() {
            
            
            // Add a method to the jQuery Validation Plugin.
            
            jQuery.validator.addMethod(
                "compareTo",function(value, element, params) {
                    
                var num1 = parseInt(value);
                var num2 = parseInt($('input[name="' + params[0] + '"]').val());
                
                // If num1 or num2 are NaN, they weren't parsable numbers.
                if(isNaN(num1) || isNaN(num2)) return true;
                
                if(params[2]) {
                    return num1 <= num2;
                } else {
                    return num1 >= num2;
                }
            },'Maximum {1} value must be >= minimum {1} value.'); // Error messag

            
            // Defines validation rules 
            $('form').validate({
                
                // Define restrictions on form inputs.
                rules: {
                    multiplierMin: {
                        required: true, // Can't be empty.
                        number:   true, // Must be a number.
                        step:     1,     // Can't be a decimal.
                        compareTo:      // Must be <= multiplierMax.
                            ['multiplierMax', 'multiplier', true]
                    },
                    multiplierMax: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      
                            ['multiplierMin', 'multiplier', false]
                    },
                    multiplicandMin: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      
                            ['multiplicandMax', 'multiplicand', true]
                    },
                    multiplicandMax: {
                        required: true,
                        number:   true,
                        step:     1,
                        compareTo:      
                            ['multiplicandMin', 'multiplicand', false]
                    }
                },
                
                // Change where errors are shown on the page.
                showErrors: function(error, errorMap) {
                    // Let plugin do its default loading of errors.
                    this.defaultShowErrors();
                    
                    var isMaxError = false;
                    
                    // Iterate over the messages to show.
                    errorMap.forEach(function(error) {
                        
                        if(error.method === 'compareTo') {
                            
                            
                            isMaxError = true;
                            $('#' + error.element.name + '-error').empty();
                            var type = error.element.name.slice(0, -3);
                            $('#' + type + 'Error').html(error.message);
                        }
                    });
                    
                    if(errorMap.length === 0 || !isMaxError ) {
                        
                       
                        this.currentElements.each(function(index, element) {
                            var type = element.name.slice(0, -3);
                            $('#' + type + 'Error').empty();
                        });
                    }
                },
                
                // Error messages for all non-custom form restrictions.
                messages: {
                    multiplierMin: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplierMax: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplicandMin: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    },
                    multiplicandMax: {
                        required: 'Value cannot be empty.',
                        number: 'Value must be an integer.',
                        step: 'Decimals not allowed. Value must be an integer.'
                    }
                },
                
                // If validation passes, create the multiplication table.
                submitHandler: function(form, event) {
                    event.preventDefault();  
                    
                    var table = createMultTable(
                    form.elements['multiplierMin'].value,
                    form.elements['multiplierMax'].value,
                    form.elements['multiplicandMin'].value,
                    form.elements['multiplicandMax'].value);
                    appendReplaceHtmlElement(table, form);
                }
                
            });
        }
        
        return {
            init: init // Make init function publicly accessible.
        };
    })();

    // When DOM has loaded, initialize DOM-dependent javascript.
    document.addEventListener('DOMContentLoaded', FormHandler.init);
};