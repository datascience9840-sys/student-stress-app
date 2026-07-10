import json
import random

# Fallback mockup question database matching standard formats
QUESTION_BANK = {
    "CBSE": [
        {"question": "Which cell organelle is known as the powerhouse of the cell?", "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"], "answer": "Mitochondria"},
        {"question": "What is the SI unit of electric current?", "options": ["Volt", "Ohm", "Ampere", "Watt"], "answer": "Ampere"}
    ],
    "ICSE": [
        {"question": "According to Merchant of Venice, who is Portia’s waiting-maid?", "options": ["Nerissa", "Jessica", "Sycorax", "Miranda"], "answer": "Nerissa"},
        {"question": "Which of the following acids is present in sour milk?", "options": ["Lactic acid", "Citric acid", "Tartaric acid", "Acetic acid"], "answer": "Lactic acid"}
    ],
    "Matriculation": [
        {"question": "Who was the first emperor of the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], "answer": "Chandragupta Maurya"},
        {"question": "What is the chemical formula of washing soda?", "options": ["Na2CO3", "NaHCO3", "NaOH", "NaCl"], "answer": "Na2CO3"}
    ]
}

def handler(event, context):
    query_params = event.get("queryStringParameters", {})
    board = query_params.get("board", "CBSE")
    
    # Fetch questions for the specific board
    questions = QUESTION_BANK.get(board, QUESTION_BANK["CBSE"])
    
    # Shuffle or sample if you expand your dataset later
    selected_questions = random.sample(questions, min(len(questions), 5))

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "board": board,
            "quiz": selected_questions
        })
    }