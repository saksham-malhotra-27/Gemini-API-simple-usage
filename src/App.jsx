import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async function run() {
    try {
      setGeneratedContent('')
      setLoading(true); // Set loading to true before making the API call
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setGeneratedContent(text);
      setPrompt('')
    } catch (error) {
      console.error(error);
      setGeneratedContent('Error occurred while generating content.');
    } finally {
      setLoading(false); // Set loading back to false after the API call is complete
    }
  }

  

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerateClick = () => {
    if (prompt.trim() !== '') {
      run();
    }
  };
  const element = document.getElementById('n1');
  element.style.backgroundImage = `url(${import.meta.env.BASE_URL}public/gridnav.svg)`

  return (
    <>
    <div className='container' style={{backgroundImage: `url(${import.meta.env.BASE_URL}public/grid1.svg)`}}>
      <div className='inputAI'>
        <label>
          <h2>Enter Prompt:</h2>
          <textarea style={{ backgroundColor: "black", color: "whitesmoke", borderRadius: "10px", padding: "5px", width: "100%", height: 'auto', minHeight: '10vh' }} value={prompt} onChange={handleInputChange} />
        </label>
        <button  className='butprompt' onClick={handleGenerateClick}>Generate Content</button>
      </div>

      <div className='OutputAI'>
        <strong>Generated Content:</strong>
        {loading && (
          <div style={{textAlign:"center", display:"flex",justifyContent:"center", alignItems:"center", flexFlow:"column", }}>
          <div className="spinner-border" role="status">
          </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <ReactMarkdown>{generatedContent}</ReactMarkdown>
      </div>
    </div>
    </>
  );
}
