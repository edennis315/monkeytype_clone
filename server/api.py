import time
import requests
from flask import Flask, jsonify, request
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

def fetch_batch(difficulty):
    response = requests.get(
                f"https://random-word-api.herokuapp.com/word?number=5&diff={difficulty}"
            )
    return response.json()

@app.route('/api/randomwords/<int:difficulty>', methods = ['GET'])
def get_random_words(difficulty):
    all_words = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(fetch_batch, difficulty) for _ in range (20)]
        for future in futures:
            all_words.extend(future.result())

    text = " ".join(all_words[:100])  # trim in case last batch overshoots
    return jsonify({"difficulty": difficulty, "words": text})
