var list = document.getElementsByTagName('ul')[0]; // Get the list.

// ADD NEW ITEM TO END OF LIST
var item = document.createElement('li');         // Create list item.
var itemText = document.createTextNode('cream'); // Create text.
item.appendChild(itemText);                      // Add text to list item.
list.appendChild(item);                          // Add item to end of list.
                                           
// ADD NEW ITEM START OF LIST
item = document.createElement('li');             // Create list item.
itemText = document.createTextNode('kale');      // Create text.
item.appendChild(itemText);                      // Add text to list item.
list.insertBefore(item, list.firstChild);        // Add item to start of list.



var listItems = document.getElementsByTagName('li'); // Get all list items.
var listItemCount = listItems.length;                // Get # of list items.

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for (var i = 0; i < listItemCount; ++i) {
    listItems[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var headingTwo = document.querySelector('h2');     // Get the h2.
item = document.createElement('span');             // Create span.
itemText = document.createTextNode(listItemCount); // Create item count text.
item.appendChild(itemText);                        // Add text to span.
headingTwo.appendChild(item); // Add item count to end of h2 contents.