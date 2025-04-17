document.addEventListener('DOMContentLoaded', () => {
    console.log('VirtualVet website loaded successfully!');
    // Add interactivity here if needed

    // Search functionality
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('search-input').value;
            searchResults.innerHTML = `<p>Searching for "${query}"...</p>`;
            // Simulate search results
            setTimeout(() => {
                searchResults.innerHTML = `<p>Results for "${query}":</p><ul><li>Example result 1</li><li>Example result 2</li></ul>`;
            }, 1000);
        });
    }

    // Chatbot functionality
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userMessage = document.getElementById('chat-input').value;
            const userBubble = `<div class="chat-bubble user">${userMessage}</div>`;
            chatMessages.innerHTML += userBubble;
            document.getElementById('chat-input').value = '';
            // Simulate chatbot response
            setTimeout(() => {
                const botResponse = `<div class="chat-bubble bot">I'm here to help with your pet's health!</div>`;
                chatMessages.innerHTML += botResponse;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }
});
