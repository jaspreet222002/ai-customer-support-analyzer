# AI Customer Support Analyzer

An AI-powered customer support application built with Python, FastAPI, and Groq LLM. It analyzes customer messages and identifies their intent, sentiment, urgency, and category. It also generates a recommended action and a short summary.

The application provides a browser-based interface where users can submit customer messages and view AI-generated analysis.

## Features

- Analyze customer support messages using an LLM.
- Identify customer intent.
- Detect customer sentiment.
- Classify message urgency.
- Categorize customer issues.
- Generate recommended actions.
- Generate concise message summaries.
- Return structured JSON responses.
- Browser-based chat interface.
- REST API built with FastAPI.
- Environment variables for API key management.
- CORS middleware for frontend-backend communication.

## Tech Stack

**Backend**
- Python
- FastAPI
- Groq API
- Pydantic
- Uvicorn

**AI / LLM**
- OpenAI GPT-OSS-120B (via Groq API)
- JSON structured responses

**Frontend**
- HTML
- CSS
- JavaScript

**Other Tools**
- Git
- GitHub
- python-dotenv

## Project Architecture

```text
Browser
   |
   | Customer message
   v
HTML / CSS / JavaScript
   |
   | HTTP POST Request
   v
FastAPI Backend
   |
   | Send customer message
   v
Groq API
   |
   | LLM analysis
   v
Structured JSON Response
   |
   v
FastAPI
   |
   | JSON response
   v
JavaScript
   |
   v
Display AI Analysis
```

## Project Structure

```text
Ai_customer/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

 
## API Endpoints

### GET /

Checks whether the API is running.

**Endpoint:**

```http
GET /
```

**Example response:**

```json
{
    "message": "AI Customer Support Analyzer API is running"
}
```

### POST /analyze

Analyzes a customer support message using the Groq LLM.

**Endpoint:**

```http
POST /analyze
```

**Request body:**

```json
{
    "message": "My order hasn't arrived and it was supposed to arrive five days ago."
}
```

**Example response:**

```json
{
    "success": true,
    "customer_message": "My order hasn't arrived and it was supposed to arrive five days ago.",
    "analysis": {
        "intent": "Order Status",
        "sentiment": "Negative",
        "urgency": "High",
        "category": "Shipping",
        "recommended_action": "Investigate the shipment and provide an updated delivery estimate.",
        "summary": "The customer reports that their order is five days late."
    }
}
```

The exact AI-generated response may vary.

## AI Analysis Fields

| Field | Description |
|---|---|
| Intent | Identifies the purpose of the customer's message. |
| Sentiment | Determines whether the message is positive, neutral, or negative. |
| Urgency | Estimates the urgency of the customer's issue. |
| Category | Classifies the issue, such as billing, shipping, or technical support. |
| Recommended Action | Suggests a possible next step for the support team. |
| Summary | Provides a concise summary of the customer's message. |

## How It Works

1. The user enters a customer support message in the browser.

**Example:**
   "My order hasn't arrived, and it was supposed to arrive five days ago."

2. JavaScript captures the message when the user clicks Send.
3. JavaScript sends an HTTP POST request to the FastAPI `/analyze` endpoint.
4. FastAPI receives the message and sends it to the Groq API.
5. The LLM analyzes the message and returns structured JSON.
6. FastAPI converts the JSON response into a Python dictionary.
7. FastAPI returns the analysis to the frontend.
8. JavaScript displays the analysis in the browser.

## CORS Configuration

The application uses FastAPI's `CORSMiddleware` to handle cross-origin requests between the frontend and backend.

For local development, the application allows cross-origin requests. For production, configure the allowed origins to match your actual frontend domain.

## Environment Variables

| Variable | Description |
|---|---|
| GROQ_API_KEY | API key used to access the Groq LLM API. |

## Future Improvements

- Add conversation history and memory.
- Store customer messages and analysis in a database.
- Add user authentication.
- Improve error handling and response validation.
- Deploy the application to a cloud platform.
- Add automated tests and CI/CD.

## License

This project is available for learning and portfolio purposes.

 