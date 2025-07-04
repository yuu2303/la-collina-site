from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/status')
def get_status():
    # このAPIは現在、ページの動的な更新には使用されていません。
    # 将来的に「本日の混雑状況」を動的にする場合に利用します。
    status_data = [
        {"time": "9:00-11:00", "status_class": "slow", "status_text": "ゆっくりお買い物"},
        {"time": "11:00-14:00", "status_class": "normal", "status_text": "通常"},
        {"time": "14:00-16:00", "status_class": "crowded", "status_text": "混雑"},
        {"time": "16:00-", "status_class": "slow", "status_text": "ゆっくりお買い物"}
    ]
    return jsonify(status_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)