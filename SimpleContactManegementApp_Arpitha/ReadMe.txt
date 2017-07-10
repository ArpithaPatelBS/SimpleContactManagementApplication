/* Simple Contact Management Application */

Technologies used:
The simple contact management application is a basic web application which works on Node.js, Jquery, HTML, XML.
The application stores the contact details in an XML file called "contacts.xml".
Node.js helps in creating a client and server to access the local file and pass it through socket.
It also uses "socket.io.js" for socket creation at client side.
It also uses Cookies to store the ID of the user contact while navigating from one page to other.


Working of Application:
The above application has Four pages: Index.html, UpdateContact.html,  DeleteContact.html, and AddContact.html.
Index.html is the home page. It has a list view to display the items in the contactList which is coming from XML file.
It also includes a drop down to sort the contact according to user wish.
Each of the item in contact list also has update and delete button to update or delete corresponding contact.
There is also an Add button in the index page to add a contact.
On click of update button there will be a updateContact page for the user with text boxes pre-populated with contact details which the can be updated by User.
On click of Delete button there will be a deleteContact page for deleting contact from the list which displays contact details with a delete button.
On click of Add button there will be a add page with text boxes for adding a contact.


Installing the App:
As application needs Node.js we need to install node.js in our system and also make required changes.
Steps to proceed after that:
	1>Download and install node.js software.
	2>Right click on the folder and click on "open command window here" to install libraries of node using command "npm install"
	3>In the same window install xmldom using command "npm install xmldom"
	4>Install node using command "node app". You will see the message "listening on *:port", where * is your local IP address.
	5>Change the IP address in line 6 of your index.js to your local IP address.
	6>Run the application on web browser using url "http://localhost:4000/"
	

