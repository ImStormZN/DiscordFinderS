import './App.css'  
import gifDiscord from './assets/discord.gif'
import { useState } from 'react'

function App() {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  async function buscar() {
    setError("");
    setUserData(null);

    try {
      const res = await fetch(`https://stdiscordsearchapi.onrender.com/user/${id}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setUserData(data);
      }

    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
      <h1>Discord Finder</h1>
      <img src={gifDiscord} alt="Discord GIF" className="gif" />
  
      <input 
        type="text" 
        placeholder="Digite o ID do Discord"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ padding: 10, width: 250 }}
      />
  
      <button 
        onClick={buscar}
        style={{ marginTop: 10, padding: "10px 20px" }}
      >
        Buscar
      </button>
  
      {/* 🔵 PARÁGRAFO APARECE ANTES DA BUSCA E SOME DEPOIS DO SUCESSO */}
      {!userData && (
        <p 
          style={{ 
            marginTop: "20px", 
            color: "#5865F2", 
            cursor: "pointer",
            textDecoration: "underline"
          }}
          onClick={() => window.location.href = "/tutorial"}
        >
          Não sabe como buscar o ID do usuário?
        </p>
      )}
  
      {/* 🔴 ERRO */}
      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}
  
      {/* 🟢 RESULTADO */}
      {userData && (
        <div style={{ marginTop: 20, textAlign: "center" }}>

          <h2>{userData.username}</h2>
          <p>ID: {userData.id}</p>
  
          {userData.avatar && (
            <img 
              src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=512`} 
              alt="avatar" 
              width="150"
              style={{ borderRadius: "50%", display: "block", margin: "0 auto" }}
            />
          )}

          {/* 🔥 AGORA O BOTÃO ESTÁ SEMPRE NUM BLOCO SEPARADO */}
          <div style={{ marginTop: 25 }}>
            <button
              onClick={() => window.location.href = `/detalhes/${userData.id}`}
              style={{
                padding: "10px 20px",
                background: "#3ba55d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              Obter mais detalhes
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
