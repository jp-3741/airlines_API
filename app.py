from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    try:
        template_path = os.path.join(app.template_folder, 'index.html')
        if not os.path.exists(template_path):
            app.logger.error(f"Template not found: {template_path}")
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f"Error rendering template: {str(e)}")
        return str(e), 500

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    app.logger.debug(f"Received data: {data}")
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    }

    try:
        response = requests.post('https://cardgpt.in/apitest', headers=headers, json=data)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        app.logger.debug(f"External API response: {response.json()}")
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Request to external API failed: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
