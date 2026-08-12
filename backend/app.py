# from flask import Flask,request,jsonify
# from flask_cors import CORS
# from openai import OpenAI
# from youtube_transcript_api import YouTubeTranscriptApi
# import fitz
# from dotenv import load_dotenv
# import os

# load_dotenv()
# client=OpenAI(
#     api_key=os.getenv("OPENROUTER_API_KEY"),
#     base_url="https://openrouter.ai/api/v1"
#     )

# app=Flask(__name__)
# CORS(app,origins="http://localhost:3000")

# def get_summary(prompt):
#     response=client.chat.completions.create(
#         model="openai/gpt-oss-20b:free",
#         # messages={
#         # {"role":"system","content":"You are a helpful assistant that summarizes content"},
#         # {"role":"user","content":prompt}
#         # },
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are a helpful assistant that summarizes content."
#             },
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#      max_tokens=300
#     )
#     return response.choices[0].message.content

# @app.route('/summarize/text',methods=['POST'])
# def summarize_text():
#     data=request.get_json()
#     text=data['text']
#     prompt=f"Summarize the following text:\n{text}"
#     summary=get_summary(prompt)
#     return jsonify({'summary':summary})

# @app.route('/summarize/pdf',methods=['POST'])
# def summarize_pdf():
#     file=request.files['file']
#     doc=fitz.open(stream=file.read(),filetype="pdf")
#     text=""
#     for page in doc:
#         text+=page.get_text()
#     prompt=f"Summarize the following pdf content:\n{text}"
#     summary=get_summary(prompt)
#     return jsonify({"summary":summary})

# @app.route('/summarize/youtube',methods=['POST'])
# def summarize_youtube():
#     data=request.get_json()
#     url=data['url']
#     # video_id=url.split("v="[-1])
#     video_id = url.split("v=")[1].split("&")[0]
#     transcript=YouTubeTranscriptApi.get_transcript(video_id)
#     text="".join([t['text']for t in transcript])
#     prompt=f"Summarize this youtube video tanscript:\n{text}"
#     summary=get_summary(prompt)
#     return jsonify({'summary':summary})

# if __name__=='__main__':
#     app.run(debug=True)
    


from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
import fitz
import os

# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# -----------------------------
# Flask App
# -----------------------------
app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


# -----------------------------
# Health Check
# -----------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "Backend Running",
        "message": "AI Summarizer API is working."
    })


# -----------------------------
# OpenRouter Summary Function
# -----------------------------
def get_summary(prompt):
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that summarizes content "
                    "into clear, concise bullet points."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=300
    )

    return response.choices[0].message.content


# -----------------------------
# Text Summarizer
# -----------------------------
@app.route("/summarize/text", methods=["POST"])
def summarize_text():
    try:
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "Text is required."}), 400

        text = data["text"]

        prompt = f"""
Summarize the following text.

Requirements:
- Keep it concise
- Use bullet points
- Highlight key ideas

Text:
{text}
"""

        summary = get_summary(prompt)

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# PDF Summarizer
# -----------------------------
@app.route("/summarize/pdf", methods=["POST"])
def summarize_pdf():
    try:

        if "file" not in request.files:
            return jsonify({"error": "No PDF uploaded."}), 400

        file = request.files["file"]

        doc = fitz.open(stream=file.read(), filetype="pdf")

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        # Prevent token overflow
        text = text[:12000]

        prompt = f"""
Summarize the following PDF.

Requirements:
- Bullet points
- Mention important topics
- Keep it short

PDF Content:
{text}
"""

        summary = get_summary(prompt)

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# YouTube Summarizer
# -----------------------------
@app.route("/summarize/youtube", methods=["POST"])
def summarize_youtube():
    try:

        data = request.get_json()

        if not data or "url" not in data:
            return jsonify({"error": "YouTube URL is required."}), 400

        url = data["url"]

        if "v=" not in url:
            return jsonify({"error": "Invalid YouTube URL."}), 400

        video_id = url.split("v=")[1].split("&")[0]

        # transcript = YouTubeTranscriptApi.get_transcript(video_id)

        # text = " ".join([item["text"] for item in transcript])
        ytt_api = YouTubeTranscriptApi()

        transcript = ytt_api.fetch(video_id)

        text = " ".join([item.text for item in transcript])

        text = text[:12000]

        prompt = f"""
Summarize this YouTube transcript.

Requirements:
- Bullet points
- Mention important concepts
- Keep it concise

Transcript:
{text}
"""

        summary = get_summary(prompt)

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
