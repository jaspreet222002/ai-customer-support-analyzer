const messageInput = document.getElementById("message-input");

const sendButton = document.getElementById("send-button");

const chatBox = document.getElementById("chat-box");


// Add message to chat
function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {

        messageDiv.classList.add("user-message");

    } else {

        messageDiv.classList.add("bot-message");

    }


    const contentDiv = document.createElement("div");

    contentDiv.classList.add("message-content");

    contentDiv.innerHTML = message;


    messageDiv.appendChild(contentDiv);

    chatBox.appendChild(messageDiv);


    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Send message to FastAPI
async function sendMessage() {

    const message = messageInput.value.trim();


    // Don't send empty message
    if (!message) {
        return;
    }


    // Show user's message
    addMessage(message, "user");


    // Clear input
    messageInput.value = "";


    // Disable button while processing
    sendButton.disabled = true;

    sendButton.textContent = "Analyzing...";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data = await response.json();


        if (!data.success) {

            addMessage(
                `Error: ${data.error}`,
                "bot"
            );

            return;
        }


        // Get analysis
        const analysis = data.analysis;


        // Create analysis HTML
        const analysisHTML = `
            <strong>AI Analysis</strong>

            <div class="analysis">

                <div class="analysis-item">
                    <span class="analysis-label">
                        Intent:
                    </span>
                    ${analysis.intent}
                </div>


                <div class="analysis-item">
                    <span class="analysis-label">
                        Sentiment:
                    </span>
                    ${analysis.sentiment}
                </div>


                <div class="analysis-item">
                    <span class="analysis-label">
                        Urgency:
                    </span>
                    ${analysis.urgency}
                </div>


                <div class="analysis-item">
                    <span class="analysis-label">
                        Category:
                    </span>
                    ${analysis.category}
                </div>


                <div class="analysis-item">
                    <span class="analysis-label">
                        Recommended Action:
                    </span>
                    ${analysis.recommended_action}
                </div>


                <div class="analysis-item">
                    <span class="analysis-label">
                        Summary:
                    </span>
                    ${analysis.summary}
                </div>

            </div>
        `;


        // Show AI response
        addMessage(
            analysisHTML,
            "bot"
        );


    } catch (error) {

        console.error(error);

        addMessage(
            "Unable to connect to the backend server.",
            "bot"
        );

    } finally {

        // Enable button again
        sendButton.disabled = false;

        sendButton.textContent = "Send";

    }
}


// Send when button is clicked
sendButton.addEventListener(
    "click",
    sendMessage
);


// Send when Enter is pressed
messageInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);