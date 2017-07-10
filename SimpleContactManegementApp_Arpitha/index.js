//Global array and xml to keep the data alive across different pages. 
 var globalArray = [];		
 var globalXML = '';
 
 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://10.226.10.200:4000/");

	//Calls the server onRead event through socket
	socket.emit("onRead");
	
			
	// Assign event handlers to button clicks
	$('#buttonAdd').click(handleAddContact);
	$('#buttonUpdate').click(handleUpdateContact);
	$('#buttonDelete').click(handleDeleteContact);
	
	$('#DropDownChoose').click(function()
	{
		$('.dropdown-menu').toggle();
		
	});
	
	$('.dropdown-list').click(function()
	{
		$('.dropdown-menu').toggle();
	});
			
	
	//handle Add event to the user
	function handleAddContact() {
			var name = $('#name').val();
			var address1 = $('#address1').val();
			var city = $('#city').val();
			var phoneNum = $('#phoneNumber').val();
			if (name.trim() != "") {
				if (address1.trim() != "") {
					if (city.trim() != "") {
						if (phoneNumber != "") {
							var xmlDoc = $.parseXML( globalXML ); 
							 
							var $xml = $(xmlDoc);
							
							var $contactsElement  = $xml.find("Contact");
							if($contactsElement.length > 0)
							{
								//Generate an XML and then pass it to server to write in the xml file
								var insertXML = '<rss version="' + 2.0 +'"><Contacts>';
								$contactsElement.each(function() {
									var newXMLElement = '<Contact id="' +  $(this).attr('id') + '"><Name>' + $(this).find('Name').text() + '</Name><Address1>' + $(this).find('Address1').text() + '</Address1><City>' + $(this).find('City').text() + '</City><PhoneNo>' + $(this).find('PhoneNo').text() +'</PhoneNo></Contact>';
									insertXML = insertXML + newXMLElement;
								});
								var id = parseInt($contactsElement.last().attr('id'));
								id = id+ 1;
								insertXML = insertXML + '<Contact id="' +  id + '"><Name>' + name + '</Name><Address1>' + address1 + '</Address1><City>' + city + '</City><PhoneNo>' + phoneNum +'</PhoneNo></Contact>';
								insertXML = insertXML + '</Contacts></rss>';
								socket.emit("onSave", insertXML);
							}
							else{
								//Generate an XML and then pass it to server to write in the xml file
								var newXMLElement = '<rss version="' + toString(2.0) +'"><Contacts><Contact id=' +  1 + '><Name>' + name + '</Name><Address1>' + address1 + '</Address1><City>' + city + '</City><PhoneNo>' + phoneNum +'</PhoneNo></Contact></Contacts></rss>';
								socket.emit("onSave", newXMLElement);
							}
							
						}else {
							displayErrorMsg('Please enter phone number');
						}
					}
					else {
						displayErrorMsg('Please enter city');
					}
				}
				else {
                    displayErrorMsg('Please enter address');
                }
			}
			else {
                displayErrorMsg('Please enter name');
            }			
	}
	
	
	

		
	//Handles user Update event	
	function handleUpdateContact() {
			var name = $('#name').val();
			var address1 = $('#address1').val();
			var city = $('#city').val();
			var phoneNum = $('#phoneNumber').val();
			if (name.trim() != "") {
				if (address1.trim() != "") {
					if (city.trim() != "") {
						if (phoneNumber != "") {
							var xmlDoc = $.parseXML( globalXML ); 
							 
							var $xml = $(xmlDoc);
							
							var $contactsElement  = $xml.find("Contact");
							if($contactsElement.length > 0)
							{
								//Generate an XML and then pass it to server to write in the xml file
								//Cookie stores the id of the user to be updated.
								var cookies = document.cookie;
								var cookieId = getCookie("id");
								var insertXML = '<rss version="' + 2.0 +'"><Contacts>';
								$contactsElement.each(function() {
									if($(this).attr("id") === cookieId)
									{
										insertXML = insertXML + '<Contact id="' +  cookieId + '"><Name>' + name + '</Name><Address1>' + address1 + '</Address1><City>' + city + '</City><PhoneNo>' + phoneNum +'</PhoneNo></Contact>';
										insertXML = insertXML + newXMLElement;
									}
									else
									{
										var newXMLElement = '<Contact id="' +  $(this).attr('id') + '"><Name>' + $(this).find('Name').text() + '</Name><Address1>' + $(this).find('Address1').text() + '</Address1><City>' + $(this).find('City').text() + '</City><PhoneNo>' + $(this).find('PhoneNo').text() +'</PhoneNo></Contact>';
										insertXML = insertXML + newXMLElement;
									}
									
								});
								
								insertXML = insertXML + '</Contacts></rss>';
								socket.emit("onSave", insertXML);
							}
							
						}else {
							displayErrorMsg('Please enter phone number');
						}
					}
					else {
						displayErrorMsg('Please enter city');
					}
				}
				else {
                    displayErrorMsg('Please enter address');
                }
			}
			else {
                displayErrorMsg('Please enter name');
            }	
			
		
	}
	



	//Handles user Delete event
	function handleDeleteContact() {
	
		var xmlDoc = $.parseXML( globalXML ); 
		 
		var $xml = $(xmlDoc);
		
		var $contactsElement  = $xml.find("Contact");
		if($contactsElement.length > 0)
		{
			//Generate an XML and then pass it to server to write in the xml file
			//Cookie stores the id of the user to be updated.
			var cookies = document.cookie;
			var cookieId = getCookie("id");
			var insertXML = '<rss version="' + 2.0 +'"><Contacts>';
			$contactsElement.each(function() {
				if($(this).attr("id") != cookieId)
				{
					var newXMLElement = '<Contact id="' +  $(this).attr('id') + '"><Name>' + $(this).find('Name').text() + '</Name><Address1>' + $(this).find('Address1').text() + '</Address1><City>' + $(this).find('City').text() + '</City><PhoneNo>' + $(this).find('PhoneNo').text() +'</PhoneNo></Contact>';
					insertXML = insertXML + newXMLElement;
				}
				
			});
			
			insertXML = insertXML + '</Contacts></rss>';
			socket.emit("onSave", insertXML);
		}
							
						
	}


		
		
	/************************************************************************************************************************************************/  

	// Assign event handlers to events from server
	 socket.on("onSaveSucess", handleSaveSuccessEvnt);
	 socket.on("onReadSucess", handleReadSuccessEvnt);
	 
	 
	 function handleSaveSuccessEvnt()
	 {
			window.location = 'index.html';
	 }
	
	
	function handleReadSuccessEvnt(data)
	{
		globalXML = data;
		var xmlDoc = $.parseXML( data ); 
		var $xml = $(xmlDoc);
		var $contact = $xml.find("Contact");
		
		var pathname = window.location.pathname; 
		
		//on Main page to handle the input
		if(pathname == "/index.html" || pathname == "/")
		{
			var Output = '<ul class="list-group">';
			$contact.each(function() {
				var id = $(this).attr('id');
				var name = $(this).find('Name').text();
				var address1= $(this).find('Address1').text();
				var city = $(this).find('City').text();
				var phoneNum = $(this).find('PhoneNo').text();
				var arrayItem = {};
				arrayItem.id = id;
				arrayItem.name = name;
				arrayItem.address1 = address1;
				arrayItem.city = city;
				arrayItem.phoneNum = phoneNum;
				globalArray.push(arrayItem);
				Output = Output + '<div class="list-group-item" id="' + id + '" style="cursor:pointer;"><div>' + name + '</div><div>' + phoneNum + '</div><div>' + address1 + '</div><div>' + city + '</div><button type="button" class="btn btn-primary" style="margin-left:30px;margin-right:30px;" onclick="UpdateContact('+ id +')">Update Contact</button><button type="button" class="btn btn-primary" style="margin-left:30px;margin-right:30px;" onclick="DeleteContact('+ id +')">Delete Contact</button></div>';
			});
			Output =  Output + '</ul>';
			
			
			var readData = $('#contact-info');
			readData.append(Output);
			
		}
		
		
		//on Update page to handle the input
		if(pathname == "/updateContact.html")
		{
			var cookies = document.cookie;
			var cookieId = getCookie("id");
			var xmlDoc = $.parseXML( globalXML ); 
			var $xml = $(xmlDoc);
			var $contact = $xml.find('Contact');
			$contact.each(function() 
			{
				if($(this).attr("id") === cookieId)
				{
					$('#name').val($(this).find('Name').text());
					$('#address1').val($(this).find('Address1').text());
					$('#city').val($(this).find('City').text());
					$('#phoneNumber').val($(this).find('PhoneNo').text());
				}
			});
		}
		
		//on Delete page to handle the input
		if(pathname == "/deleteContact.html")
		{
			var cookies = document.cookie;
			var cookieId = getCookie("id");
			var xmlDoc = $.parseXML( globalXML ); 
			var $xml = $(xmlDoc);
			var $contact = $xml.find('Contact');
			$contact.each(function() 
			{
				if($(this).attr("id") === cookieId)
				{
					var Output = '<div id="' + cookieId + '" ><div>' + $(this).find('Name').text() + '</div><div>' + $(this).find('PhoneNo').text() + '</div><div>' + $(this).find('Address1').text() + '</div><div>' + $(this).find('City').text() + '</div></div>';
					$('.panel-body').html(Output);
				}

			});
		}
	}
	
 });
 
 /************************************************************************************************************************************************/
 
 //sorting function on user preference
 function sortContact(functionName)
{
	globalArray.sort(functionName);
	displayContact(globalArray);
}

function sortOnPhoneNumber(a, b)
{
	if (a.phoneNum == b.phoneNum) { return(0) }
	else if (a.phoneNum < b.phoneNum) { return(-1) }
	else if (a.phoneNum > b.phoneNum) { return(1) }
}


function sortOnName(a,b)
{
	if (a.name == b.name) { return(0) }
	else if (a.name < b.name) { return(-1) }
	else if (a.name > b.name) { return(1) }
}

function sortOnAddress(a,b)
{
	if (a.address1 == b.address1) { return(0) }
	else if (a.address1 < b.address1) { return(-1) }
	else if (a.address1 > b.address1) { return(1) }
}

function sortOnCity(a,b)
{
	if (a.city == b.city) { return(0) }
	else if (a.city < b.city) { return(-1) }
	else if (a.city > b.city) { return(1) }
}

//Helps display contact after sorting
function displayContact(data)
{
	var Output = '<ul class="list-group">';
	
	for (var i = 0; i < data.length; i++) {
		Output = Output + '<div class="list-group-item" id="' + data[i].id + '"><div>' + data[i].name + '</div><div>' + data[i].phoneNum + '</div><div>' + data[i].address1 + '</div><div>' + data[i].city + '</div><button type="button" class="btn btn-primary" style="margin-left:30px;margin-right:30px;" onclick="UpdateContact('+ data[i].id +')">Update Contact</button><button type="button" class="btn btn-primary" style="margin-left:30px;margin-right:30px;" onclick="DeleteContact('+ data[i].id +')">Delete Contact</button></div>';
	}
	
	var readData = $('#contact-info');
	readData.html(Output);
}

//Helps in redirect from main to add
function AddContact()
{
	window.location = "addContact.html";
}

//Helps in redirect from main to update
function UpdateContact(id)
{
	document.cookie = "id=" + id;
	window.location = "updateContact.html";
}

//Helps in redirect from main to delete
function DeleteContact(id)
{
	document.cookie = "id=" + id;
	window.location = "deleteContact.html";
}

function displayErrorMsg(errorMsg) {
    $('#divErrorMsg').html(errorMsg);
    $('#divErrorStatus').show();
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}