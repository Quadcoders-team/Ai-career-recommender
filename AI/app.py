# app.py
from flask import Flask, request, jsonify
from ai_model import recommend_roles

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_skills = data.get("skills", [])
    result = recommend_roles(user_skills)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5001)
