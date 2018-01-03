window.onload = function(){

	// buttons
	var contactAddBtn = document.getElementById('ContactAdd');
	var contactAddFormDiv = document.querySelector('.contactaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');

	// formfields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var email = document.getElementById('email');

	// addressbook display
	var addBookDiv = document.querySelector('.addbook');
	
	//event listeners
	contactAddBtn.addEventListener("click", function(){
	// display the form div
		contactAddFormDiv.style.display = "block";
		// to make the cancel button appear, it is gone for the edit function
		Cancel.style.display = "inline-block";
	});
	//cancels contact creation
	cancelBtn.addEventListener("click", function(){
		contactAddFormDiv.style.display = "none";
		clearForm();
	});

	// adds contact to the book
	AddBtn.addEventListener("click", addToBook);

	// removes a contact from the book
	addBookDiv.addEventListener("click", removeEntry);

	// edits a contact and removes the older version
	addBookDiv.addEventListener("click", editEntry);

	// create Storage Array
	var addressBook = [];

	// base function to create a new contact
	function jsonContacts(fullname,phone,address,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.email = email;
	}
	// to create and store new contacts
	function addToBook(){
		// only completely filled forms will be added
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && email.value!='';
		if(isNull){
			// add the form to the array and localstorage
			var obj = new jsonContacts(fullname.value,phone.value,address.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			//hide form
			contactAddFormDiv.style.display = "none";
			// clear the form for new use
			clearForm();
			// show updated contacts
			showAddressBook();
			} else {
			alert("Fill in the entire form please")
		}
	}
	// Remove an entry from the addressbook
	function removeEntry(e){
		if(e.target.classList.contains('deletebutton')){
			var removecontact = e.target.getAttribute('contactid');
			addressBook.splice(removecontact,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}
	// clear form for new use
	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}
	// show the contacts list
	function showAddressBook(){
		// check if "addBook" key is in localstorage, if not create it
		// if it exists load the content from localstorage and loop display it on the page
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
					// to make removing a contact possible
					str += '<div class="del"><a href="#" class="deletebutton" contactid="' + n + '">Delete</a></div>';
					// to make editing possible
					str += '<div class="edit"><a href="#" class="editbutton" contactedit="' + n + '">Edit</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}
	// edit function
	function editEntry(e){
		// Remove old entry from the addressbook
		if(e.target.classList.contains('editbutton')){
			var editcontact = e.target.getAttribute('contactedit');
			localStorage['addbook'] = JSON.stringify(addressBook);
			document.getElementById("fullname").value = addressBook[e.target.getAttribute("contactedit")].fullname;
			document.getElementById("phone").value = addressBook[e.target.getAttribute("contactedit")].phone;
			document.getElementById("address").value = addressBook[e.target.getAttribute("contactedit")].address;
			document.getElementById("email").value = addressBook[e.target.getAttribute("contactedit")].fullname;
			// adds new entry to the addressbook has to be completely filled
			contactAddFormDiv.style.display = "block";
			// to make the cancel button dissappear for editing it causes errors otherwise
			Cancel.style.display = "none";
			addressBook.splice(editcontact,1);
			document.getElementById("fullname").innerHTML = fullname.value;
		}
	}
	showAddressBook();

}
