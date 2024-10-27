document.getElementById('contact_message').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const message = document.getElementById('Message').value;
    if((name.value = "") && (email.value="")) {
        alert("please write something")
    }
    else {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwfiQuCEOqJJDQWtO02EiOVKsBy5saywHbuAC-AiIG_7PveQsnwsMzu5KAJBjEO8A5TWA/exec';
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
    
      fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
        .then(response => {
          document.getElementById('stateMessage').textContent = 'Message sent successfully!';
          document.getElementById('contact_message').reset();
        })
        .catch(error => {
          document.getElementById('statusMessage').textContent = 'Error sending message.';
          console.error('Error!', error.message);
        });
  
    }
    // Google Sheets API URL

  });