var listForms = document.querySelectorAll('.js-list-form');
if (listForms) {
  for (var i = 0; i < listForms.length; ++i) {
    createListForm(listForms[i]);
  }
}

function createListForm(listForm) {
  var sendButton = document.createElement('input');
  sendButton.type = 'submit';
  sendButton.value = 'Submit gifts reservation';
  sendButton.classList.add('button');
  sendButton.addEventListener('click', function (e) {
    e.preventDefault();
    var details = getDetails(listForm);
    var selectedItems = getSelectedItems(listForm);
    if (details && selectedItems && selectedItems.length > 0) {
      submitForm(listForm, details, selectedItems);
    } else {
      alert('Please enter your name and email address, and select some items from the list before trying to generate an email.');
    }
    return false;
  });
  listForm.appendChild(sendButton);
}

function getSelectedItems(listForm) {
  var selectedItems = [];
  var checkedItems = listForm.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedItems) {
    for (var i = 0; i < checkedItems.length; ++i) {
      if (!checkedItems[i].disabled) {
        selectedItems.push(checkedItems[i].name);
      }
    }
  }
  var multipleItems = listForm.querySelectorAll('input[type="number"]');
  if (multipleItems) {
    for (var i = 0; i < multipleItems.length; ++i) {
      if (multipleItems[i].value > 0 && !multipleItems[i].disabled) {
        selectedItems.push(multipleItems[i].name + ': ' + multipleItems[i].value);
      }
    }
  }
  return selectedItems;
}

function getDetails(listForm) {
  var firstName = listForm.querySelector('#Field1');
  var lastName = listForm.querySelector('#Field2');
  var emailAddress = listForm.querySelector('#Field3');
  if (firstName && lastName && emailAddress) {
    if (firstName.value && lastName.value && emailAddress.value) {
      return firstName.value + ' ' + lastName.value + '\n' + emailAddress.value;
    }
    return null;
  }
  alert('Could not get name and email address. Please try reloading the page and try again. If that does not work, please let Annabel or Billy know.');
  return null;
}

function submitForm(listForm, details, selectedItems) {
  var content = 'Dear Ann-Marie,\n\nI would like to reserve the following items from Annabel and Billy\'s wedding list:\n\n';
  for (var i = 0; i < selectedItems.length; ++i) {
    content += '- ' + selectedItems[i] + '\n';
  }
  content += '\n';
  content += 'Best wishes,';
  content += '\n\n';
  content += details;
  var emailContent = document.getElementById('Field4');
  emailContent.value = content;
  if (!emailContent) {
    alert('Could not prepare reservation to send. Please reload the page and try again, otherwise contact Annabel or Billy.');
    return;
  }
  var submitButton = document.getElementById('saveForm');
  if (!submitButton) {
    alert('Could not send reservation. Please reload the page and try again, otherwise contact Annabel or Billy.');
    return;
  }
  submitButton.click();
}
