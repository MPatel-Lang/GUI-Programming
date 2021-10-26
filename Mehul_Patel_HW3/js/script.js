/**
  AUTHOR:  Mehul Patel
  EMAIL:   Mehul_patel@student.uml.edu
  FILE:    index.html

 FILE DESCRIPTION:
     Assignment #3: Mulitplication Table
    
     This file is the HTML structure of a simple web page. The web page
     uses javascript to create and display a multiplication table.
     Multiplier and multiplicand values are provided by the user via an
     HTML form, and the page is styled using CSS.
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
     * tasks for a specific HTML page. These are not general purpose functions.
     *
     * @namespace {object} FormHandler
     */
    var FormHandler = (function() {
        var form;
        var minError = 'Min value must be <= to maximum value.';
        var maxError = 'Max value must be >= to minimum value.';
        
        /**
         * Calls createMultTable(), appendReplaceNode(), and 
         * FormHandler.validation().
         *
         * @constructor
         * @memberof FormHandler
         */
        var init = function() {
            form = document.getElementById('form');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();    // Prevent form submission.
                var table = createMultTable(
                    form.elements['multiplierMin'].value,
                    form.elements['multiplierMax'].value,
                    form.elements['multiplicandMin'].value,
                    form.elements['multiplicandMax'].value);
                appendReplaceNode(table, form);
            });
            
            for (var i = 0; i < form.elements.length; i++) {
                if(form.elements[i].type !== 'number') continue;
                
                // Add listener to all form inputs with type='number'.
                form.elements[i].addEventListener('input', validation);
            }
        }
       
        /**
         * @memberof FormHandler
         */
        var validation = function(){
            var min, max;
            
            if(this.name === 'multiplierMin' ||
                this.name === 'multiplierMax') {
                
                min = form.elements['multiplierMin'];
                max = form.elements['multiplierMax'];
                
            } else if(this.name === 'multiplicandMin' ||
                this.name === 'multiplicandMax') {
                
                min = form.elements['multiplicandMin'];
                max = form.elements['multiplicandMax'];
            }
            if(min.length !== 0 && max.length !== 0 &&
               parseInt(min.value, 10) > parseInt(max.value, 10)) {
                
                // If min > max and both have a value, add custom error.
                min.setCustomValidity(minError);
                max.setCustomValidity(maxError);
            } else {
                
                // If min < max or at least one doesn't have a value,
                // erase custom errors.
                min.setCustomValidity('');
                max.setCustomValidity('');
            }
        }
        
        return {
            init: init // Make init function public.
        };
    })();

    // When DOM has loaded, initialize the DOM-dependent event listeners.
    document.addEventListener('DOMContentLoaded', FormHandler.init);
};