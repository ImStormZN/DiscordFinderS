import "./Tutorial.css";
import { useNavigate } from "react-router-dom";
import gifTutorial from "./assets/Animation.gif";
import { useEffect, useState } from "react";

export default function Tutorial() {
  const nav = useNavigate();


  return (
    <div className="tutorial-page">
      <div className="tutorial-card">

        <h1>Como pegar o ID do usuário</h1>

        <img 
          src={gifTutorial}
          alt="Tutorial GIF"                        
          className="tutorial-gif"
        />

        <p className="tutorial-text">
          Siga o passo acima para copiar o ID do usuário no Discord.
        </p>

        <button className="tutorial-btn" onClick={() => nav("/")}>
          Já aprendi
        </button>
      </div>
    </div>
  );
}