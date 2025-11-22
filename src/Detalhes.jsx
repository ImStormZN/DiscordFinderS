import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Detalhes.css";

import staff from "./assets/badges/staff.png";
import partner from "./assets/badges/Partner.png";
import hsevents from "./assets/badges/hypesquad_events.png";
import bug1 from "./assets/badges/bughunter1.png";
import bravery from "./assets/badges/bravery.png";
import brilliance from "./assets/badges/brilliance.png";
import balance from "./assets/badges/balance.png";
import supporter from "./assets/badges/early_supporter.png";
import bug2 from "./assets/badges/bughunter2.png";
import activedev from "./assets/badges/activedev.png";

const FLAGS = {
  1: { name: "Discord Staff", icon: staff },
  2: { name: "Partner", icon: partner },
  4: { name: "HypeSquad Events", icon: hsevents },
  8: { name: "Bug Hunter Lvl 1", icon: bug1 },
  64: { name: "HypeSquad Bravery", icon: bravery },
  128: { name: "HypeSquad Brilliance", icon: brilliance },
  256: { name: "HypeSquad Balance", icon: balance },
  512: { name: "Early Supporter", icon: supporter },
  16384: { name: "Bug Hunter Lvl 2", icon: bug2 },
  4194304: { name: "Active Developer", icon: activedev }
};

function decodeFlags(value = 0) {
  const out = [];
  for (const bitStr of Object.keys(FLAGS)) {
    const bit = Number(bitStr);
    if (value & bit) {
      out.push({
        name: FLAGS[bit].name,
        icon: FLAGS[bit].icon
      });
    }
  }
  return out.length ? out : [];
}

/* --- Snowflake -> Date (retorna Date) --- */
function snowflakeToDate(snowflake) {
  const discordEpoch = 1420070400000;
  try {
    // usa BigInt e shift para precisão em IDs grandes
    const ts = Number(BigInt(snowflake) >> 22n) + discordEpoch;
    return new Date(ts);
  } catch {
    // fallback caso BigInt não seja possível
    return new Date(discordEpoch + Number(snowflake) / 4194304);
  }
}

/* --- Formatações de data --- */
function formatDatePTBR(date) {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDiscordStyle(date) {
  return (
    date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    ` às ` +
    date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

function timeAgo(date) {
  const now = new Date();
  const diff = now - date;

  const sec = diff / 1000;
  const min = sec / 60;
  const hour = min / 60;
  const day = hour / 24;
  const month = day / 30;
  const year = month / 12;

  if (year >= 1) return `há ${Math.floor(year)} ano(s)`;
  if (month >= 1) return `há ${Math.floor(month)} mês(es)`;
  if (day >= 1) return `há ${Math.floor(day)} dia(s)`;
  if (hour >= 1) return `há ${Math.floor(hour)} hora(s)`;
  if (min >= 1) return `há ${Math.floor(min)} minuto(s)`;

  return `há alguns segundos`;
}

function detailedAge(date) {
  const now = new Date();

  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();
  let days = now.getDate() - date.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];

  if (years > 0) parts.push(`${years} ano${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  if (days > 0) parts.push(`${days} dia${days !== 1 ? "s" : ""}`);

  return parts.length ? parts.join(", ") : "menos de um dia";
}

/* local path do arquivo que você enviou — usei exatamente o path pedido */
const tutorialPath = "/mnt/data/f653cdb7-cbd2-44af-8068-15986026b7bb.png";

export default function Detalhes() {
  const { id } = useParams();
  const nav = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    setUserData(null);

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/user/${id}`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Usuário não encontrado");
        }
        const data = await res.json();
        if (mounted) {
          setUserData(data);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Erro ao buscar dados");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="det-page">
        <div className="card card-loading">
          <div className="banner-skeleton" />
          <div className="avatar-skeleton" />
          <div className="line-skeleton short" />
          <div className="line-skeleton medium" />
          <div className="line-skeleton long" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="det-page">
        <div className="card">
          <p style={{ color: "#ff6b6b" }}>{error}</p>
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => nav(-1)}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // montar urls do CDN (respeita GIFs quando hash começa com "a_")
  const avatarIsGif = userData.avatar && userData.avatar.startsWith?.("a_");
  const avatarExt = avatarIsGif ? "gif" : "png";
  const avatarUrl = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${avatarExt}?size=512`
    : `https://cdn.discordapp.com/embed/avatars/${Number(userData.id) % 5}.png?size=512`;

  const bannerUrl = userData.banner
    ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.${userData.banner.startsWith("a_") ? "gif" : "png"}?size=1024`
    : null;

  const accent = userData.accent_color
    ? `#${userData.accent_color.toString(16).padStart(6, "0")}`
    : "#5865F2";

  const flagsList = decodeFlags(userData.flags || 0);

  // obter a data como Date usando snowflakeToDate
  const createdDate = snowflakeToDate(userData.id);

  return (
    <div className="det-page">
      <div className="card" style={{ borderColor: accent }}>
        {/* Banner */}
        {bannerUrl ? (
          <div className="banner-wrap">
            <img src={bannerUrl} alt="banner" className="banner-img" />
            <div className="banner-overlay" style={{ background: `${accent}33` }} />
          </div>
        ) : (
          <div className="banner-fallback" style={{ background: accent }} />
        )}

        {/* Avatar */}
        <div className="avatar-row">
          <img src={avatarUrl} alt="avatar" className="avatar-img" style={{ boxShadow: `0 0 0 6px ${accent}33` }} />
        </div>

        <div className="card-body">
          <div className="head-row">
            <div>
              <h2 className="display-name">{userData.global_name || userData.username}</h2>
              <p className="username">@{userData.username}</p>
            </div>

            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <p className="small muted">ID</p>
              <p className="mono small">{userData.id}</p>
            </div>
          </div>

          {/* Bio */}
          {userData.bio ? (
            <div className="bio">{userData.bio}</div>
          ) : (
            <div className="bio muted">Sem descrição</div>
          )}

          {/* Flags / Badges */}
          <div className="section">
            <h4>Badges</h4>
            <div className="badges">
              {flagsList.length > 0 ? (
                flagsList.map((flag, i) => (
                  <div key={i} className="badge">
                    <img src={flag.icon} alt={flag.name} />
                    <span>{flag.name}</span>
                  </div>
                ))
              ) : (
                <span className="muted">Nenhuma badge</span>
              )}
            </div>
          </div>

          {/* Created at */}
          <div className="section">
            <h4>Conta criada em</h4>

            <div className="muted">{formatDiscordStyle(createdDate)}</div>
            <div className="muted">{detailedAge(createdDate)}</div>
          </div>

          {/* Downloads + ações */}
          <div className="actions-row">
            <a className="link-btn" href={avatarUrl} download>
              Baixar avatar
            </a>
            {bannerUrl && (
              <a className="link-btn" href={bannerUrl} download>
                Baixar banner
              </a>
            )}
            <button className="btn" onClick={() => nav(-1)}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
