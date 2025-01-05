// Q&A Database
const qaDatabase = {
    "hello": "Hello! Welcome to SHISHIBAGS. How can I help you today?",
    "hi": "Hi there! How can I assist you with our products?",
    "shipping": "We offer free shipping on orders over $100. Standard shipping takes 3-5 business days.",
    "returns": "Our return policy allows returns within 30 days of purchase. The item must be unused and in original packaging.",
    "payment": "We accept all major credit cards, PayPal, and Apple Pay.",
    "track order": "You can track your order by clicking on the 'Track Order' link in your confirmation email.",
    "contact": "You can reach our customer service team at support@shishibags.com or call us at 1-800-SHISHI.",
    "materials": "Our products are made with high-quality, sustainable materials sourced from ethical suppliers.",
    "warranty": "All our products come with a 1-year warranty against manufacturing defects.",
    "store locations": "Currently, we are an online-only store but plan to open physical locations soon.",
    "default": "I'm not sure about that. Would you like to speak with a customer service representative?"
};

// Create chatbot UI
function createChatbotUI() {
    const chatbot = document.createElement('div');
    chatbot.className = 'chatbot';
    chatbot.innerHTML = `
        <div class="chat-icon" id="chat-icon">
            <i class="fas fa-comments"></i>
        </div>
        <div class="chat-container" id="chat-container">
            <div class="chat-header">
                <h3>SHISHIBAGS Assistant</h3>
                <button class="close-chat" id="close-chat">×</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Hello! How can I help you today?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="user-input" placeholder="Type your question...">
                <button id="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatbot);
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .chatbot {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .chat-icon {
            background: #000;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .chat-container {
            display: none;
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 300px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .chat-header {
            background: #000;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            margin: 0;
            font-size: 16px;
        }
        
        .close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }
        
        .chat-messages {
            height: 300px;
            overflow-y: auto;
            padding: 15px;
        }
        
        .message {
            margin-bottom: 10px;
            padding: 8px 12px;
            border-radius: 15px;
            max-width: 80%;
            word-wrap: break-word;
        }
        
        .message.user {
            background: #f0f0f0;
            margin-left: auto;
        }
        
        .message.bot {
            background: #000;
            color: white;
        }
        
        .chat-input {
            display: flex;
            padding: 15px;
            border-top: 1px solid #eee;
        }
        
        .chat-input input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 20px;
            margin-right: 10px;
        }
        
        .chat-input button {
            background: #000;
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
        }
    `;
    document.head.appendChild(styles);
    
    // Add event listeners
    setupChatbotEvents();
}

// Setup event listeners
function setupChatbotEvents() {
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    
    chatIcon.addEventListener('click', () => {
        chatContainer.style.display = 'block';
        chatIcon.style.display = 'none';
    });
    
    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        chatIcon.style.display = 'flex';
    });
    
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim().toLowerCase();
    
    if (message) {
        // Add user message
        chatMessages.innerHTML += `
            <div class="message user">
                ${userInput.value}
            </div>
        `;
        
        // Find response
        let response = qaDatabase.default;
        for (const [key, value] of Object.entries(qaDatabase)) {
            if (message.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Add bot response after a small delay
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message bot">
                    ${response}
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
        // Clear input
        userInput.value = '';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', createChatbotUI);
