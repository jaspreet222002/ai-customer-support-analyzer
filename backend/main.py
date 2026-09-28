import os
import json

from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not configured.")


# Create Groq client
client = Groq(api_key=api_key)


# Create FastAPI application
app = FastAPI(
    title="AI Customer Support Analyzer",
    description="API for analyzing customer support messages using Groq LLM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Request model
class CustomerMessage(BaseModel):
    message: str


# System prompt
system_prompt = """
You are an AI Customer Support Analyzer.

Analyze the customer's support message and determine:

1. Intent
2. Sentiment
3. Urgency
4. Category
5. Recommended action
6. Summary

Intent must be one of:

Information Request
Complaint
Refund Request
Order Status
Technical Support
Billing Issue
Account Issue
Cancellation
General Inquiry

Sentiment must be one of:

Positive
Neutral
Negative

Urgency must be one of:

Low
Medium
High
Critical

Category must be one of:

Order
Billing
Technical
Account
Refund
Shipping
General

Return ONLY a valid JSON object.

Do not return Markdown.
Do not use ```json.
Do not include any explanation outside the JSON.

The JSON must contain exactly these fields:

{
    "intent": "...",
    "sentiment": "...",
    "urgency": "...",
    "category": "...",
    "recommended_action": "...",
    "summary": "..."
}
"""


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "AI Customer Support Analyzer API is running"
    }


# Analyze customer message
@app.post("/analyze")
def analyze_customer_message(customer: CustomerMessage):

    message = customer.message.strip()

    # Empty message check
    if not message:
        return {
            "success": False,
            "error": "Customer message cannot be empty."
        }

    try:

        # Send message to Groq
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",

            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ],

            response_format={
                "type": "json_object"
            }
        )

        # Get AI response
        ai_response = response.choices[0].message.content

        # Convert JSON string to Python dictionary
        analysis = json.loads(ai_response)

    except json.JSONDecodeError:

        return {
            "success": False,
            "error": "AI returned invalid JSON."
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    # Return response
    return {
        "success": True,
        "customer_message": message,
        "analysis": analysis
    }