var listForms = document.querySelectorAll('.js-list-form');
if (listForms) {
  for (var i = 0; i < listForms.length; ++i) {
    createListForm(listForms[i]);
  }
}

function createListForm(listForm) {
  var generateButton = document.createElement('input');
  generateButton.type = 'submit';
  generateButton.value = 'Generate email to reserve gifts';
  generateButton.classList.add('button');
  generateButton.addEventListener('click', function (e) {
    e.preventDefault();
    var userName = getUserName(listForm);
    var selectedItems = getSelectedItems(listForm);
    if (selectedItems && selectedItems.length > 0 && userName && userName.length > 0) {
      generateEmailLink(listForm, userName, selectedItems);
    } else {
      alert('Please enter your name and select some items from the list before trying to generate an email.');
    }
    return false;
  });
  listForm.appendChild(generateButton);
}

function getSelectedItems(listForm) {
  var selectedItems = [];
  var checkedItems = listForm.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedItems) {
    for (var i = 0; i < checkedItems.length; ++i) {
      selectedItems.push(checkedItems[i].name);
    }
  }
  var multipleItems = listForm.querySelectorAll('input[type="number"]');
  if (multipleItems) {
    for (var i = 0; i < multipleItems.length; ++i) {
      if (multipleItems[i].value > 0) {
        selectedItems.push(multipleItems[i].name + ': ' + multipleItems[i].value);
      }
    }
  }
  return selectedItems;
}

function getUserName(listForm) {
  var userNameField = listForm.querySelector('input[name="user name"]');
  if (userNameField) {
    return userNameField.value;
  }
  return null;
}

function generateEmailLink(listForm, userName, selectedItems) {
  var emailLink = document.createElement('a');
  var subject = 'Wedding list reservation request';
  var content = 'Dear Ann-Marie,\n\nI would like to reserve the following items from Annabel and Billy\'s wedding list:\n\n';
  for (var i = 0; i < selectedItems.length; ++i) {
    content += '- ' + selectedItems[i] + '\n';
  }
  content += '\n';
  content += 'Best wishes,\n\n' + userName;
  // emailLink.href = 'mailto:annmarie.grout@btopenworld.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(content);
  emailLink.href = 'mailto:druidofluhn@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(content);
  emailLink.click();
}
