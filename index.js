document.addEventListener('DOMContentLoaded', function() {
        
    setTimeout(function() {
        document.getElementById('lcs').style.opacity = '0';
    }, 3000);     
    setTimeout(function() {
        document.getElementById('lcs').style.display = 'none';
    }, 3500);     
});

 // Configuración de Firebase
 const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  };
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const chatBox = document.getElementById('chat-box');
  const messageInput = document.getElementById('message-input');

  // Función para enviar un mensaje
  function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
      database.ref('messages').push({
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    messageInput.value = '';
}
}

// Escuchar mensajes nuevos
database.ref('messages').on('child_added', snapshot => {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.innerText = message.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
