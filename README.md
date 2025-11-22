# 🎨 stDiscordSearch — Front-End

Um front-end moderno feito em React para consultar usuários do Discord através da API.  
Permite visualizar avatar, banner animado, cores personalizadas, badges, biografia e muito mais — em um layout baseado no estilo do Discord App.

---

## 🚀 Tecnologias Utilizadas
- React + Vite
- React Router DOM
- Axios / Fetch API
- CSS puro (inspirado no Discord)
- Vercel (Deploy)

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/ImStormZN/stDiscordSearch
cd stDiscordSearch
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

```bash
npm run dev
```

Abra no navegador:

```
http://localhost:5173
```

---

## 🧩 Estrutura de pastas

```
📁 src/
 ├── App.jsx
 ├── Detalhes.jsx
 ├── Tutorial.jsx
 ├── assets/
 │    └── badges/
 │    └── icons/
 ├── index.css
 └── main.jsx
```

---

## 🔗 Comunicação com a API

O front consome:

```
http://localhost:3000/user/{id}
```

Para deploy, basta trocar pelo domínio da API hospedada:

```js
const API_URL = "https://seu-dominio-da-api.vercel.app";
```

---

## ✨ Funcionalidades
- Buscar usuário por ID
- Mostrar avatar (GIF incluso)
- Mostrar banner animado
- Cores personalizadas copiadas do perfil do Discord
- Badges oficiais renderizadas em PNG
- Data de criação da conta (Snowflake decoding)
- Tempo de conta (anos / meses / dias)
- Download de avatar e banner
- Tutorial integrado explicando como pegar o ID

---

## 🌐 Deploy

### **Front-End na Vercel**
Simples:

```bash
vercel --prod
```

⚠️ Importante:  
Use **Rewrite Rules** no `vercel.json` para SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Sem isso, rotas como `/detalhes/123` geram erro 404.

---

## 📄 Licença
MIT License.

---

# 🎯 Autor
**StormZN**  
Interface moderna inspirada no Discord App com animações, blur e estilo original.
