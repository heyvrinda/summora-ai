#  🤖 Summora — AI-Powered Multi-Source Summarizer

> **Summarize anything. Understand everything.**

Summora is a full-stack AI-powered summarization application that converts **text, PDF documents, and YouTube videos** into concise, meaningful summaries using the **OpenAI API**.

Built with **React.js, Flask, Python, and OpenAI**, Summora provides a simple and intuitive way to process different types of content from a single platform.

---

## 🚀 Features

* 📝 **Text Summarization** — Convert lengthy text into concise summaries.
* 📄 **PDF Summarization** — Extract and summarize PDF content using PyPDF2.
* 🎥 **YouTube Summarization** — Retrieve YouTube transcripts and generate AI-powered summaries.
* 🤖 **OpenAI Integration** — Uses the OpenAI API for intelligent content summarization.
* ⚡ **Simple Interface** — Select a content type, provide the input, and generate a summary.
* 🔗 **Full-Stack Architecture** — React frontend connected to a Flask/Python backend.

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **CSS3**
* **Axios**
* **React Hooks** — `useState`, `useEffect`

### Backend

* **Python**
* **Flask**
* **Flask-CORS**
* **python-dotenv**

### AI & Content Processing

* **OpenAI API**
* **PyPDF2**
* **youtube-transcript-api**

---

## 🏗️ How It Works

```text
        ┌──────────────────────┐
        │   🤖 Summora         │
        │   React Frontend     │
        └──────────┬───────────┘
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
       📝 Text   📄 PDF  🎥 YouTube
                   │        │
                PyPDF2   Transcript
                   │        │
          └────────┼────────┘
                   │
                 Axios
                   │
                   ▼
        ┌──────────────────────┐
        │    Flask Backend     │
        │      REST API        │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │     OpenAI API       │
        │   AI Summarization   │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │   Generated Summary  │
        └──────────────────────┘
```

### Processing Flow

**Select → Provide Content → Extract Content → OpenAI Processing → Generate Summary**

| Input      | Processing                                            |
| ---------- | ----------------------------------------------------- |
| 📝 Text    | Direct text processing                                |
| 📄 PDF     | Text extraction using **PyPDF2**                      |
| 🎥 YouTube | Transcript retrieval using **youtube-transcript-api** |

---

## 📂 Project Structure

```text
summora-ai/
│
├── backend/
│   ├── .env
│   └── app.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   │
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Python 3.x
* Node.js
* npm
* OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/summora-ai.git
cd summora-ai
```

### 2. Backend Setup

```bash
cd backend
python -m venv env
```

**Windows:**

```bash
env\Scripts\activate
```

**macOS/Linux:**

```bash
source env/bin/activate
```

Install dependencies:

```bash
pip install flask flask-cors openai PyPDF2 youtube-transcript-api python-dotenv
```

### 3. Configure API Key

Create a `.env` file inside `backend/`:

```env
OPENAI_API_KEY=your_openai_api_key
```

> ⚠️ Never commit your API key or `.env` file to GitHub.

### 4. Run the Backend

```bash
python app.py
```

### 5. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The application will then be available locally through the React development server.

---

## 📸 Screenshots

### Main Interface

Add a screenshot of the Summora homepage here.

### PDF Summarization

Add a screenshot showing PDF summarization here.

### YouTube Summarization

Add a screenshot showing YouTube summarization here.

### Generated Summary

Add a screenshot of the generated summary here.

> **Tip:** Actual screenshots or a short GIF demonstrating the workflow will make the repository much more attractive to recruiters.

---

## 🎯 Use Cases

* 🎓 **Students** — Summarize lectures, notes, PDFs, and educational videos.
* 📚 **Researchers** — Quickly extract important information from lengthy documents.
* 👨‍💻 **Developers** — Summarize technical documentation and long-form content.
* 🎥 **YouTube Learners** — Quickly understand educational videos and tutorials.
* 💼 **Professionals** — Process reports and lengthy written content efficiently.

---

## 🔮 Future Improvements

* [ ] Summary history
* [ ] Download summaries as PDF
* [ ] Copy summary to clipboard
* [ ] Adjustable summary length
* [ ] Key-point extraction
* [ ] User authentication
* [ ] Dark mode
* [ ] Multi-language summarization
* [ ] Support for additional document formats
* [ ] AI follow-up questions
* [ ] Improved mobile responsiveness

---

## 🧠 What I Learned

Building Summora provided hands-on experience with:

* Full-stack web application development
* React.js component development
* Flask REST API development
* OpenAI API integration
* PDF text extraction
* YouTube transcript processing
* Frontend-backend communication using Axios
* React state management with Hooks
* CORS configuration
* Environment variable management
* Building an end-to-end AI-powered application

---

## 👩‍💻 Author

**Vrinda Sharma**

Built using **React.js • Flask • Python • OpenAI API**

---

## ⭐ Support

If you found **Summora** useful, consider giving the repository a ⭐.

> ### ✨ Summora
>
> **Summarize anything. Understand everything.**
