// import React,{useState} from "react";

// import axios from 'axios';
// import "./App.css";

// function App() {
//   const [text,setText]=useState("");
//   const [summary,setSummary]=useState("");
//   const [file,setFile]=useState(null);
//   const [youtubeURL,setyoutubeURL]=useState("");
//   const [mode,setMode]=useState("text");
//   const [loading,setLoading]=useState(false);

//   const handleSummarize=async()=>{
//     setLoading(true);
//     setSummary("");
//     try{
//       let res;
//       if (mode==="text"){
//         if(!text.trim()) return alert ("Please Enter some Text");
//           res=await axios.post("http://localhost:3000/summarize/text",{text});
//       }
//       else if (mode==="pdf"){
//         if(!file) return alert ("Please Upload a PDF file");
//           const formData=new FormData();
//         formData.append("file",file);
//         res=await axios.post("http://localhost:3000/summarize/pdf",formData,{
//           headers:{"Content-Type":"multipart/form-data"},
//         });
//       }
//       else if (mode==="youtube"){
//         if(!youtubeURL.trim()) return alert ("Please Enter a YouTube URL");
//         res=await axios.post("http://localhost:3000/summarize/youtube",{url:youtubeURL});
//       }
//       setSummary(res.data.summary);
//     } 
//     catch(err)
//     {
//       console.error(err);
//       alert("Something went wrong from frontend ");
//     }
//     setLoading(false);

//   };

//   return (
//     <div className="App">
//       <h1>🤖 AI Summarizer(Text,PDF and YouTube)</h1>
//       <div className="mode-buttons" >
//         <button
//          className={mode==="text"?"active":""}
//          onClick={()=>setMode("text")}>
//         Text
//         </button>
//         <button 
//         className={mode==="pdf"?"active":""} 
//         onClick={()=>setMode("pdf")}>
//         PDF
//         </button>
//         <button 
//         className={mode==="youtube"?"active":""} 
//         onClick={()=>setMode("youtube")}>
//         YouTube
//         </button>   
//       </div>

//       {mode==="text" &&(
//         <textarea 
//         placeholder="Paste your text here..."
//         rows="10"
//         value={text}
//         onChange={(e)=>setText(e.target.value)} ></textarea>
//       )}

//       {mode==="pdf" &&(
//         <input 
//         type="file"
//         accept="application/pdf"
//         onChange={(e)=>setFile(e.target.files[0])} ></input>
//       )}

//       {mode==="youtube" &&(
//         <input
//         type="text" 
//         placeholder="Enter your youtube video url here..."
//         value={youtubeURL}
//         onChange={(e)=>setyoutubeURL(e.target.value)} ></input>
//       )}

//       <button onClick={handleSummarize} disabled={loading}>
//         {loading?"Summarizing...":"Summarize"}
//       </button>

//       {summary &&
//       (
//         <div className="summary">
//         <h2>📝Summary</h2>
//         <p>{summary}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Use REACT_APP_API_URL for Create React App
// Use import.meta.env.VITE_API_URL if using Vite
const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [mode, setMode] = useState("text");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");

    try {
      let res;

      if (mode === "text") {
        if (!text.trim()) {
          alert("Please enter some text.");
          return;
        }

        res = await axios.post(`${API}/summarize/text`, {
          text,
        });
      }

      else if (mode === "pdf") {
        if (!file) {
          alert("Please upload a PDF file.");
          return;
        }

        if (file.type !== "application/pdf") {
          alert("Only PDF files are allowed.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        res = await axios.post(
          `${API}/summarize/pdf`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      else if (mode === "youtube") {
        if (!youtubeURL.trim()) {
          alert("Please enter a YouTube URL.");
          return;
        }

        res = await axios.post(
          `${API}/summarize/youtube`,
          {
            url: youtubeURL,
          }
        );
      }

      setSummary(res.data.summary);

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🤖 Summora</h1>
    

      <div className="mode-buttons">
        <button
          className={mode === "text" ? "active" : ""}
          onClick={() => setMode("text")}
        >
          Text
        </button>

        <button
          className={mode === "pdf" ? "active" : ""}
          onClick={() => setMode("pdf")}
        >
          PDF
        </button>

        <button
          className={mode === "youtube" ? "active" : ""}
          onClick={() => setMode("youtube")}
        >
          YouTube
        </button>
      </div>

      {mode === "text" && (
        <textarea
          rows="10"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {mode === "pdf" && (
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      )}

      {mode === "youtube" && (
        <input
          type="text"
          placeholder="Paste YouTube URL..."
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
        />
      )}

      <button
        className="summarize-btn"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summary">
          <h2>📝 Summary</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
            }}
          >
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;