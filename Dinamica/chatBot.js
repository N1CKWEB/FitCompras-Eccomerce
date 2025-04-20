// Simular la carga del archivo JSON
// const respuestas = [
//     {"pregunta": "Hola", "respuesta": "¡Hola! Bienvenido a FitCompras, ¿en qué podemos ayudarte hoy?"},
//     {"pregunta": "Buenos dias", "respuesta": "¡Buenos días! Somos FitCompras, ¿en qué podemos asistirte?"},
//     {"pregunta": "Buenas tardes", "respuesta": "¡Buenas tardes! ¿Cómo podemos ayudarte en FitCompras?"},
//     {"pregunta": "Buenas noches", "respuesta": "¡Buenas noches! Si necesitas ayuda, estamos aquí para responder tus preguntas."},
//     {"pregunta": "Gracias", "respuesta": "¡De nada! Si necesitas algo más, no dudes en preguntar."},
//     {"pregunta": "Adiós", "respuesta": "¡Hasta pronto! Esperamos verte de nuevo en FitCompras."},
//     {"pregunta": "Nos vemos", "respuesta": "¡Nos vemos! Que tengas un excelente día."},
//     {"pregunta": "Chao", "respuesta": "¡Chao! Recuerda que siempre estamos aquí para ayudarte."}
// ];

let respuestas = [];

async function cargarDatosJSON() {
    try {
        const response = await fetch('datos.json'); // Cargar el archivo JSON
        respuestas = await response.json(); // Convertir a objeto JavaScript
        console.log('Datos cargados:', respuestas); // Verificar los datos cargados
    } catch (error) {
        console.error('Error cargando el JSON:', error);
    }
}

// Llamar a la función al iniciar
cargarDatosJSON();

// Función para abrir o cerrar el chat
function toggleChat() {
    const chatContainer = document.getElementById('chatbot-container');
    chatContainer.style.display = (chatContainer.style.display === 'none' || chatContainer.style.display === '') ? 'block' : 'none';
}

// Función para enviar mensaje
function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    if (userMessage.trim() !== "") {
        // Mostrar el mensaje del usuario
        displayMessage(userMessage, 'user');
        document.getElementById('user-input').value = "";  // Limpiar input después de enviar el mensaje

        // Buscar respuesta en el JSON
        const respuesta = getBotResponse(userMessage);

        // Mostrar respuesta del bot
        displayMessage(respuesta, 'bot');
    }
}

// Mostrar mensaje en la interfaz
function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);

    // Desplazar el chat hacia abajo después de agregar el mensaje
    adjustChatHeight();
}

// Obtener la respuesta del bot desde el JSON
function getBotResponse(userMessage) {
    for (let i = 0; i < respuestas.length; i++) {
        if (userMessage.toLowerCase() === respuestas[i].pregunta.toLowerCase()) {
            return respuestas[i].respuesta;
                    
            // Desplazar automáticamente hacia abajo
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
    return "Lo siento, no entiendo esa pregunta. ¿Puedes reformularla?";
}

// Función para ajustar la altura del chat y mover el input hacia abajo
function adjustChatHeight() {
    const messagesDiv = document.getElementById('messages');
    const inputDiv = document.getElementById('user-input');
    
    // Ajustar el contenedor de mensajes
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Hacer que el input también se mueva hacia abajo
    inputDiv.style.bottom = `${20 + messagesDiv.scrollHeight}px`;
}

// Añadir una respuesta predeterminada cuando el chatbot comienza
window.onload = function() {
    // Se inicializa vacío, sin mensaje predeterminado
};
