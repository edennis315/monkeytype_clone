import time
import json
import random

from flask import Flask, jsonify, request
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/randomquote', methods = ['GET'])
def get_random_quote():
    with open("./quotes/wof_quotes.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    random_data = random.choice(data)
    text = random_data["quote"]
    return jsonify({"quote": text})
