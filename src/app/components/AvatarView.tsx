"use client";

import { useState, useEffect } from "react";
import { User, Palette, Shirt, Sparkles, Save, Eye, Smile } from "lucide-react";

interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  eyebrowStyle: string;
  noseStyle: string;
  mouthStyle: string;
  facialHair: string;
  topStyle: string;
  topColor: string;
  accessory: string;
  background: string;
}

export function AvatarView() {
  const [avatar, setAvatar] = useState<AvatarConfig>({
    skinTone: "#F4C2A0",
    hairStyle: "short-wavy",
    hairColor: "#4A3728",
    eyeColor: "#4A3728",
    eyebrowStyle: "normal",
    noseStyle: "normal",
    mouthStyle: "smile",
    facialHair: "none",
    topStyle: "tshirt",
    topColor: "#3B82F6",
    accessory: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  });

  useEffect(() => {
    const saved = localStorage.getItem("glowup_avatar");
    if (saved) {
      setAvatar(JSON.parse(saved));
    }
  }, []);

  const saveAvatar = () => {
    localStorage.setItem("glowup_avatar", JSON.stringify(avatar));
  };

  const skinTones = [
    { name: "Muito Claro", color: "#FFE0BD" },
    { name: "Claro", color: "#F4C2A0" },
    { name: "Médio Claro", color: "#E8B896" },
    { name: "Médio", color: "#D4A574" },
    { name: "Médio Escuro", color: "#B8865F" },
    { name: "Escuro", color: "#8D5524" },
    { name: "Muito Escuro", color: "#5C3317" },
  ];

  const hairStyles = [
    { id: "short-wavy", name: "Curto Ondulado" },
    { id: "short-straight", name: "Curto Liso" },
    { id: "medium-wavy", name: "Médio Ondulado" },
    { id: "long-straight", name: "Longo Liso" },
    { id: "long-wavy", name: "Longo Ondulado" },
    { id: "curly", name: "Cacheado" },
    { id: "afro", name: "Afro" },
    { id: "bun", name: "Coque" },
    { id: "ponytail", name: "Rabo de Cavalo" },
    { id: "braids", name: "Tranças" },
    { id: "buzz", name: "Raspado" },
    { id: "mohawk", name: "Moicano" },
  ];

  const hairColors = [
    { name: "Preto", color: "#1A1A1A" },
    { name: "Castanho Escuro", color: "#4A3728" },
    { name: "Castanho", color: "#6B4423" },
    { name: "Castanho Claro", color: "#8B6F47" },
    { name: "Loiro Escuro", color: "#C4A053" },
    { name: "Loiro", color: "#E6C068" },
    { name: "Loiro Claro", color: "#F5E6C8" },
    { name: "Ruivo", color: "#B55239" },
    { name: "Ruivo Claro", color: "#D4704F" },
    { name: "Cinza", color: "#9CA3AF" },
    { name: "Branco", color: "#E5E7EB" },
    { name: "Rosa", color: "#EC4899" },
    { name: "Roxo", color: "#A855F7" },
    { name: "Azul", color: "#3B82F6" },
    { name: "Verde", color: "#10B981" },
  ];

  const eyeColors = [
    { name: "Castanho Escuro", color: "#4A3728" },
    { name: "Castanho", color: "#6B4423" },
    { name: "Castanho Claro", color: "#8B6F47" },
    { name: "Verde", color: "#10B981" },
    { name: "Azul", color: "#3B82F6" },
    { name: "Cinza", color: "#6B7280" },
    { name: "Âmbar", color: "#D97706" },
  ];

  const eyebrowStyles = [
    { id: "thin", name: "Finas" },
    { id: "normal", name: "Normais" },
    { id: "thick", name: "Grossas" },
    { id: "arched", name: "Arqueadas" },
  ];

  const noseStyles = [
    { id: "small", name: "Pequeno" },
    { id: "normal", name: "Normal" },
    { id: "large", name: "Grande" },
    { id: "wide", name: "Largo" },
  ];

  const mouthStyles = [
    { id: "smile", name: "Sorriso" },
    { id: "neutral", name: "Neutro" },
    { id: "small", name: "Pequeno" },
    { id: "full", name: "Cheio" },
  ];

  const facialHairOptions = [
    { id: "none", name: "Nenhum" },
    { id: "stubble", name: "Por Fazer" },
    { id: "goatee", name: "Cavanhaque" },
    { id: "beard", name: "Barba" },
    { id: "mustache", name: "Bigode" },
  ];

  const topStyles = [
    { id: "tshirt", name: "Camiseta" },
    { id: "shirt", name: "Camisa" },
    { id: "hoodie", name: "Moletom" },
    { id: "vneck", name: "Gola V" },
    { id: "polo", name: "Polo" },
    { id: "tank", name: "Regata" },
    { id: "sweater", name: "Suéter" },
    { id: "jacket", name: "Jaqueta" },
  ];

  const topColors = [
    { name: "Branco", color: "#FFFFFF" },
    { name: "Preto", color: "#000000" },
    { name: "Cinza", color: "#6B7280" },
    { name: "Azul", color: "#3B82F6" },
    { name: "Vermelho", color: "#EF4444" },
    { name: "Verde", color: "#10B981" },
    { name: "Amarelo", color: "#F59E0B" },
    { name: "Roxo", color: "#A855F7" },
    { name: "Rosa", color: "#EC4899" },
    { name: "Laranja", color: "#F97316" },
    { name: "Marrom", color: "#92400E" },
    { name: "Bege", color: "#D4A574" },
  ];

  const accessories = [
    { id: "none", name: "Nenhum" },
    { id: "glasses", name: "Óculos" },
    { id: "sunglasses", name: "Óculos de Sol" },
    { id: "hat", name: "Boné" },
    { id: "beanie", name: "Gorro" },
    { id: "headphones", name: "Fones" },
    { id: "earrings", name: "Brincos" },
    { id: "necklace", name: "Colar" },
  ];

  const backgrounds = [
    { name: "Roxo", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Rosa", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Azul", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Verde", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { name: "Laranja", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "Pôr do Sol", gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" },
    { name: "Oceano", gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" },
    { name: "Floresta", gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Meu Avatar Realista</h2>
        </div>
        <p className="text-purple-100">Crie um avatar único com características detalhadas</p>
      </div>

      {/* Avatar Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
          Seu Avatar Personalizado
        </h3>
        
        <div 
          className="relative w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
          style={{ background: avatar.background }}
        >
          {/* Realistic Avatar SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 400" className="w-full h-full">
              {/* Neck */}
              <rect x="130" y="240" width="40" height="50" fill={avatar.skinTone} />
              
              {/* Clothing */}
              {avatar.topStyle === "tshirt" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <ellipse cx="150" cy="280" rx="20" ry="10" fill={avatar.topColor} />
                </>
              )}
              {avatar.topStyle === "shirt" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <rect x="145" y="280" width="10" height="100" fill="#FFFFFF" opacity="0.3" />
                  <circle cx="150" cy="295" r="3" fill="#FFFFFF" />
                  <circle cx="150" cy="310" r="3" fill="#FFFFFF" />
                  <circle cx="150" cy="325" r="3" fill="#FFFFFF" />
                </>
              )}
              {avatar.topStyle === "hoodie" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <ellipse cx="150" cy="280" rx="25" ry="15" fill={avatar.topColor} filter="brightness(0.8)" />
                  <path d="M 125 280 Q 150 270, 175 280" stroke={avatar.topColor} strokeWidth="3" fill="none" filter="brightness(0.7)" />
                </>
              )}
              {avatar.topStyle === "vneck" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <path d="M 130 280 L 150 300 L 170 280" fill={avatar.skinTone} />
                </>
              )}
              {avatar.topStyle === "polo" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <path d="M 140 280 L 140 300 L 160 300 L 160 280" fill={avatar.topColor} filter="brightness(0.8)" />
                  <rect x="145" y="280" width="10" height="15" fill={avatar.topColor} filter="brightness(0.7)" />
                </>
              )}
              {avatar.topStyle === "tank" && (
                <>
                  <rect x="120" y="280" width="60" height="100" fill={avatar.topColor} />
                  <ellipse cx="150" cy="280" rx="30" ry="10" fill={avatar.topColor} />
                </>
              )}
              {avatar.topStyle === "sweater" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <ellipse cx="150" cy="280" rx="20" ry="10" fill={avatar.topColor} filter="brightness(0.9)" />
                  <rect x="130" y="285" width="40" height="3" fill={avatar.topColor} filter="brightness(0.8)" />
                  <rect x="130" y="295" width="40" height="3" fill={avatar.topColor} filter="brightness(0.8)" />
                </>
              )}
              {avatar.topStyle === "jacket" && (
                <>
                  <path d="M 90 290 L 110 270 L 130 280 L 130 380 L 90 380 Z" fill={avatar.topColor} />
                  <path d="M 210 290 L 190 270 L 170 280 L 170 380 L 210 380 Z" fill={avatar.topColor} />
                  <rect x="130" y="280" width="40" height="100" fill={avatar.topColor} />
                  <rect x="130" y="280" width="10" height="100" fill={avatar.topColor} filter="brightness(0.8)" />
                  <rect x="160" y="280" width="10" height="100" fill={avatar.topColor} filter="brightness(0.8)" />
                  <circle cx="135" cy="295" r="2" fill="#6B7280" />
                  <circle cx="135" cy="310" r="2" fill="#6B7280" />
                  <circle cx="135" cy="325" r="2" fill="#6B7280" />
                </>
              )}
              
              {/* Head */}
              <ellipse cx="150" cy="180" rx="55" ry="65" fill={avatar.skinTone} />
              
              {/* Ears */}
              <ellipse cx="100" cy="180" rx="12" ry="18" fill={avatar.skinTone} />
              <ellipse cx="200" cy="180" rx="12" ry="18" fill={avatar.skinTone} />
              <ellipse cx="102" cy="180" rx="6" ry="10" fill={avatar.skinTone} filter="brightness(0.9)" />
              <ellipse cx="198" cy="180" rx="6" ry="10" fill={avatar.skinTone} filter="brightness(0.9)" />
              
              {/* Hair */}
              {avatar.hairStyle === "short-wavy" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="50" fill={avatar.hairColor} />
                  <path d="M 92 160 Q 100 170, 108 160 Q 116 150, 124 160 Q 132 170, 140 160 Q 148 150, 156 160 Q 164 170, 172 160 Q 180 150, 188 160 Q 196 170, 208 160" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "short-straight" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="45" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="175" rx="58" ry="10" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "medium-wavy" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="70" fill={avatar.hairColor} />
                  <path d="M 92 180 Q 100 190, 108 180 Q 116 170, 124 180 Q 132 190, 140 180 Q 148 170, 156 180 Q 164 190, 172 180 Q 180 170, 188 180 Q 196 190, 208 180" fill={avatar.hairColor} />
                  <ellipse cx="85" cy="200" rx="15" ry="25" fill={avatar.hairColor} />
                  <ellipse cx="215" cy="200" rx="15" ry="25" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "long-straight" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="90" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="220" rx="58" ry="15" fill={avatar.hairColor} />
                  <ellipse cx="80" cy="230" rx="18" ry="40" fill={avatar.hairColor} />
                  <ellipse cx="220" cy="230" rx="18" ry="40" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "long-wavy" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="90" fill={avatar.hairColor} />
                  <path d="M 92 200 Q 100 210, 108 200 Q 116 190, 124 200 Q 132 210, 140 200 Q 148 190, 156 200 Q 164 210, 172 200 Q 180 190, 188 200 Q 196 210, 208 200" fill={avatar.hairColor} />
                  <path d="M 80 220 Q 75 235, 80 250 Q 85 235, 80 220" fill={avatar.hairColor} />
                  <path d="M 220 220 Q 225 235, 220 250 Q 215 235, 220 220" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "curly" && (
                <>
                  <circle cx="120" cy="140" r="20" fill={avatar.hairColor} />
                  <circle cx="145" cy="125" r="20" fill={avatar.hairColor} />
                  <circle cx="155" cy="125" r="20" fill={avatar.hairColor} />
                  <circle cx="180" cy="140" r="20" fill={avatar.hairColor} />
                  <circle cx="105" cy="160" r="18" fill={avatar.hairColor} />
                  <circle cx="130" cy="150" r="18" fill={avatar.hairColor} />
                  <circle cx="170" cy="150" r="18" fill={avatar.hairColor} />
                  <circle cx="195" cy="160" r="18" fill={avatar.hairColor} />
                  <circle cx="95" cy="180" r="16" fill={avatar.hairColor} />
                  <circle cx="120" cy="175" r="16" fill={avatar.hairColor} />
                  <circle cx="150" cy="170" r="16" fill={avatar.hairColor} />
                  <circle cx="180" cy="175" r="16" fill={avatar.hairColor} />
                  <circle cx="205" cy="180" r="16" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "afro" && (
                <>
                  <circle cx="150" cy="150" r="75" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "bun" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="35" fill={avatar.hairColor} />
                  <circle cx="150" cy="110" r="28" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="100" rx="30" ry="18" fill={avatar.hairColor} />
                </>
              )}
              {avatar.hairStyle === "ponytail" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="40" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="170" rx="58" ry="10" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="220" rx="20" ry="50" fill={avatar.hairColor} />
                  <path d="M 130 180 Q 150 200, 170 180" stroke={avatar.hairColor} strokeWidth="8" fill="none" />
                </>
              )}
              {avatar.hairStyle === "braids" && (
                <>
                  <ellipse cx="150" cy="130" rx="58" ry="35" fill={avatar.hairColor} />
                  <rect x="92" y="130" width="116" height="40" fill={avatar.hairColor} />
                  <path d="M 100 170 L 95 220 M 95 180 L 90 230 M 90 190 L 85 240" stroke={avatar.hairColor} strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path d="M 200 170 L 205 220 M 205 180 L 210 230 M 210 190 L 215 240" stroke={avatar.hairColor} strokeWidth="10" fill="none" strokeLinecap="round" />
                </>
              )}
              {avatar.hairStyle === "buzz" && (
                <>
                  <ellipse cx="150" cy="140" rx="56" ry="30" fill={avatar.hairColor} opacity="0.3" />
                  <rect x="94" y="140" width="112" height="25" fill={avatar.hairColor} opacity="0.3" />
                </>
              )}
              {avatar.hairStyle === "mohawk" && (
                <>
                  <rect x="140" y="100" width="20" height="80" fill={avatar.hairColor} />
                  <ellipse cx="150" cy="100" rx="10" ry="15" fill={avatar.hairColor} />
                  <path d="M 140 120 L 135 130 M 160 120 L 165 130" stroke={avatar.hairColor} strokeWidth="8" fill="none" />
                  <path d="M 140 150 L 135 160 M 160 150 L 165 160" stroke={avatar.hairColor} strokeWidth="8" fill="none" />
                </>
              )}
              
              {/* Eyebrows */}
              {avatar.eyebrowStyle === "thin" && (
                <>
                  <path d="M 115 165 Q 130 162, 145 165" stroke={avatar.hairColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 155 165 Q 170 162, 185 165" stroke={avatar.hairColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                </>
              )}
              {avatar.eyebrowStyle === "normal" && (
                <>
                  <path d="M 115 165 Q 130 162, 145 165" stroke={avatar.hairColor} strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M 155 165 Q 170 162, 185 165" stroke={avatar.hairColor} strokeWidth="4" fill="none" strokeLinecap="round" />
                </>
              )}
              {avatar.eyebrowStyle === "thick" && (
                <>
                  <path d="M 115 165 Q 130 162, 145 165" stroke={avatar.hairColor} strokeWidth="6" fill="none" strokeLinecap="round" />
                  <path d="M 155 165 Q 170 162, 185 165" stroke={avatar.hairColor} strokeWidth="6" fill="none" strokeLinecap="round" />
                </>
              )}
              {avatar.eyebrowStyle === "arched" && (
                <>
                  <path d="M 115 168 Q 130 158, 145 165" stroke={avatar.hairColor} strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M 155 165 Q 170 158, 185 168" stroke={avatar.hairColor} strokeWidth="4" fill="none" strokeLinecap="round" />
                </>
              )}
              
              {/* Eyes */}
              <ellipse cx="130" cy="180" rx="12" ry="15" fill="#FFFFFF" />
              <ellipse cx="170" cy="180" rx="12" ry="15" fill="#FFFFFF" />
              <circle cx="130" cy="182" r="8" fill={avatar.eyeColor} />
              <circle cx="170" cy="182" r="8" fill={avatar.eyeColor} />
              <circle cx="130" cy="182" r="5" fill="#000000" />
              <circle cx="170" cy="182" r="5" fill="#000000" />
              <circle cx="132" cy="179" r="2" fill="#FFFFFF" />
              <circle cx="172" cy="179" r="2" fill="#FFFFFF" />
              
              {/* Eyelashes */}
              <path d="M 118 175 L 115 172 M 122 173 L 120 170 M 126 172 L 125 169" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
              <path d="M 182 175 L 185 172 M 178 173 L 180 170 M 174 172 L 175 169" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
              
              {/* Nose */}
              {avatar.noseStyle === "small" && (
                <>
                  <path d="M 150 190 L 148 200 L 152 200" stroke={avatar.skinTone} strokeWidth="2" fill="none" filter="brightness(0.85)" />
                  <ellipse cx="145" cy="202" rx="2" ry="3" fill={avatar.skinTone} filter="brightness(0.8)" />
                  <ellipse cx="155" cy="202" rx="2" ry="3" fill={avatar.skinTone} filter="brightness(0.8)" />
                </>
              )}
              {avatar.noseStyle === "normal" && (
                <>
                  <path d="M 150 185 L 147 202 L 153 202" stroke={avatar.skinTone} strokeWidth="2.5" fill="none" filter="brightness(0.85)" />
                  <ellipse cx="144" cy="204" rx="3" ry="4" fill={avatar.skinTone} filter="brightness(0.8)" />
                  <ellipse cx="156" cy="204" rx="3" ry="4" fill={avatar.skinTone} filter="brightness(0.8)" />
                </>
              )}
              {avatar.noseStyle === "large" && (
                <>
                  <path d="M 150 180 L 145 205 L 155 205" stroke={avatar.skinTone} strokeWidth="3" fill="none" filter="brightness(0.85)" />
                  <ellipse cx="142" cy="207" rx="4" ry="5" fill={avatar.skinTone} filter="brightness(0.8)" />
                  <ellipse cx="158" cy="207" rx="4" ry="5" fill={avatar.skinTone} filter="brightness(0.8)" />
                </>
              )}
              {avatar.noseStyle === "wide" && (
                <>
                  <path d="M 150 185 L 145 202 L 155 202" stroke={avatar.skinTone} strokeWidth="3.5" fill="none" filter="brightness(0.85)" />
                  <ellipse cx="140" cy="204" rx="5" ry="4" fill={avatar.skinTone} filter="brightness(0.8)" />
                  <ellipse cx="160" cy="204" rx="5" ry="4" fill={avatar.skinTone} filter="brightness(0.8)" />
                </>
              )}
              
              {/* Mouth */}
              {avatar.mouthStyle === "smile" && (
                <>
                  <path d="M 125 215 Q 150 225, 175 215" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 130 218 Q 150 223, 170 218" stroke="#FF6B9D" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                </>
              )}
              {avatar.mouthStyle === "neutral" && (
                <>
                  <line x1="130" y1="218" x2="170" y2="218" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" />
                  <line x1="132" y1="220" x2="168" y2="220" stroke="#FF6B9D" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </>
              )}
              {avatar.mouthStyle === "small" && (
                <>
                  <path d="M 140 218 Q 150 222, 160 218" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 142 220 Q 150 222, 158 220" stroke="#FF6B9D" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
                </>
              )}
              {avatar.mouthStyle === "full" && (
                <>
                  <ellipse cx="150" cy="220" rx="25" ry="8" fill="#FF6B9D" opacity="0.7" />
                  <path d="M 125 218 Q 150 228, 175 218" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 130 220 Q 150 226, 170 220" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </>
              )}
              
              {/* Blush */}
              <ellipse cx="115" cy="200" rx="12" ry="8" fill="#FF6B9D" opacity="0.25" />
              <ellipse cx="185" cy="200" rx="12" ry="8" fill="#FF6B9D" opacity="0.25" />
              
              {/* Facial Hair */}
              {avatar.facialHair === "stubble" && (
                <>
                  <ellipse cx="150" cy="225" rx="35" ry="20" fill={avatar.hairColor} opacity="0.15" />
                </>
              )}
              {avatar.facialHair === "goatee" && (
                <>
                  <ellipse cx="150" cy="230" rx="15" ry="18" fill={avatar.hairColor} />
                  <path d="M 135 220 Q 150 225, 165 220" stroke={avatar.hairColor} strokeWidth="4" fill="none" />
                </>
              )}
              {avatar.facialHair === "beard" && (
                <>
                  <ellipse cx="150" cy="230" rx="40" ry="25" fill={avatar.hairColor} />
                  <path d="M 110 200 Q 105 220, 110 240" stroke={avatar.hairColor} strokeWidth="15" fill="none" strokeLinecap="round" />
                  <path d="M 190 200 Q 195 220, 190 240" stroke={avatar.hairColor} strokeWidth="15" fill="none" strokeLinecap="round" />
                  <path d="M 130 220 Q 150 225, 170 220" stroke={avatar.hairColor} strokeWidth="8" fill="none" />
                </>
              )}
              {avatar.facialHair === "mustache" && (
                <>
                  <path d="M 130 210 Q 140 215, 150 213 Q 160 215, 170 210" stroke={avatar.hairColor} strokeWidth="6" fill="none" strokeLinecap="round" />
                </>
              )}
              
              {/* Accessories */}
              {avatar.accessory === "glasses" && (
                <>
                  <circle cx="130" cy="180" r="18" fill="none" stroke="#2D3748" strokeWidth="3" />
                  <circle cx="170" cy="180" r="18" fill="none" stroke="#2D3748" strokeWidth="3" />
                  <line x1="148" y1="180" x2="152" y2="180" stroke="#2D3748" strokeWidth="3" />
                  <line x1="112" y1="180" x2="105" y2="178" stroke="#2D3748" strokeWidth="3" />
                  <line x1="188" y1="180" x2="195" y2="178" stroke="#2D3748" strokeWidth="3" />
                  <rect x="112" y="175" width="36" height="10" fill="#FFFFFF" opacity="0.2" />
                  <rect x="152" y="175" width="36" height="10" fill="#FFFFFF" opacity="0.2" />
                </>
              )}
              {avatar.accessory === "sunglasses" && (
                <>
                  <rect x="110" y="172" width="40" height="18" rx="5" fill="#2D3748" />
                  <rect x="150" y="172" width="40" height="18" rx="5" fill="#2D3748" />
                  <line x1="150" y1="181" x2="150" y2="181" stroke="#2D3748" strokeWidth="3" />
                  <line x1="110" y1="181" x2="103" y2="179" stroke="#2D3748" strokeWidth="3" />
                  <line x1="190" y1="181" x2="197" y2="179" stroke="#2D3748" strokeWidth="3" />
                  <rect x="115" y="175" width="30" height="8" fill="#FFFFFF" opacity="0.15" />
                  <rect x="155" y="175" width="30" height="8" fill="#FFFFFF" opacity="0.15" />
                </>
              )}
              {avatar.accessory === "hat" && (
                <>
                  <ellipse cx="150" cy="145" rx="65" ry="12" fill="#2D3748" />
                  <rect x="120" y="115" width="60" height="30" rx="8" fill="#2D3748" />
                  <ellipse cx="150" cy="115" rx="30" ry="12" fill="#2D3748" />
                  <rect x="125" y="120" width="50" height="5" fill="#3B82F6" />
                </>
              )}
              {avatar.accessory === "beanie" && (
                <>
                  <ellipse cx="150" cy="125" rx="60" ry="30" fill="#2D3748" />
                  <rect x="90" y="125" width="120" height="35" fill="#2D3748" />
                  <ellipse cx="150" cy="160" rx="60" ry="10" fill="#2D3748" />
                  <rect x="95" y="130" width="110" height="5" fill="#3B82F6" />
                </>
              )}
              {avatar.accessory === "headphones" && (
                <>
                  <path d="M 100 170 Q 100 130, 150 120 Q 200 130, 200 170" stroke="#2D3748" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <rect x="92" y="170" width="20" height="30" rx="10" fill="#2D3748" />
                  <rect x="188" y="170" width="20" height="30" rx="10" fill="#2D3748" />
                  <circle cx="102" cy="185" r="6" fill="#3B82F6" />
                  <circle cx="198" cy="185" r="6" fill="#3B82F6" />
                  <rect x="95" y="175" width="14" height="20" rx="7" fill="#1F2937" />
                  <rect x="191" y="175" width="14" height="20" rx="7" fill="#1F2937" />
                </>
              )}
              {avatar.accessory === "earrings" && (
                <>
                  <circle cx="100" cy="195" r="5" fill="#FFD700" stroke="#F59E0B" strokeWidth="1" />
                  <circle cx="200" cy="195" r="5" fill="#FFD700" stroke="#F59E0B" strokeWidth="1" />
                  <circle cx="100" cy="195" r="2" fill="#FFFFFF" opacity="0.6" />
                  <circle cx="200" cy="195" r="2" fill="#FFFFFF" opacity="0.6" />
                </>
              )}
              {avatar.accessory === "necklace" && (
                <>
                  <path d="M 120 260 Q 150 270, 180 260" stroke="#FFD700" strokeWidth="3" fill="none" />
                  <circle cx="150" cy="272" r="6" fill="#FFD700" stroke="#F59E0B" strokeWidth="1" />
                  <circle cx="150" cy="272" r="3" fill="#FFFFFF" opacity="0.6" />
                </>
              )}
            </svg>
          </div>
        </div>

        <button
          onClick={saveAvatar}
          className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          Salvar Avatar
        </button>
      </div>

      {/* Customization Options */}
      <div className="space-y-4">
        {/* Skin Tone */}
        <CustomizationSection
          icon={<User className="w-5 h-5" />}
          title="Tom de Pele"
          options={skinTones.map(tone => ({
            label: tone.name,
            value: tone.color,
            color: tone.color,
          }))}
          selected={avatar.skinTone}
          onSelect={(value) => setAvatar({ ...avatar, skinTone: value })}
          type="color"
        />

        {/* Hair Style */}
        <CustomizationSection
          icon={<Sparkles className="w-5 h-5" />}
          title="Estilo de Cabelo"
          options={hairStyles.map(style => ({
            label: style.name,
            value: style.id,
          }))}
          selected={avatar.hairStyle}
          onSelect={(value) => setAvatar({ ...avatar, hairStyle: value })}
          type="button"
        />

        {/* Hair Color */}
        <CustomizationSection
          icon={<Palette className="w-5 h-5" />}
          title="Cor do Cabelo"
          options={hairColors.map(color => ({
            label: color.name,
            value: color.color,
            color: color.color,
          }))}
          selected={avatar.hairColor}
          onSelect={(value) => setAvatar({ ...avatar, hairColor: value })}
          type="color"
        />

        {/* Eye Color */}
        <CustomizationSection
          icon={<Eye className="w-5 h-5" />}
          title="Cor dos Olhos"
          options={eyeColors.map(color => ({
            label: color.name,
            value: color.color,
            color: color.color,
          }))}
          selected={avatar.eyeColor}
          onSelect={(value) => setAvatar({ ...avatar, eyeColor: value })}
          type="color"
        />

        {/* Eyebrow Style */}
        <CustomizationSection
          icon={<Eye className="w-5 h-5" />}
          title="Estilo de Sobrancelha"
          options={eyebrowStyles.map(style => ({
            label: style.name,
            value: style.id,
          }))}
          selected={avatar.eyebrowStyle}
          onSelect={(value) => setAvatar({ ...avatar, eyebrowStyle: value })}
          type="button"
        />

        {/* Nose Style */}
        <CustomizationSection
          icon={<User className="w-5 h-5" />}
          title="Estilo de Nariz"
          options={noseStyles.map(style => ({
            label: style.name,
            value: style.id,
          }))}
          selected={avatar.noseStyle}
          onSelect={(value) => setAvatar({ ...avatar, noseStyle: value })}
          type="button"
        />

        {/* Mouth Style */}
        <CustomizationSection
          icon={<Smile className="w-5 h-5" />}
          title="Estilo de Boca"
          options={mouthStyles.map(style => ({
            label: style.name,
            value: style.id,
          }))}
          selected={avatar.mouthStyle}
          onSelect={(value) => setAvatar({ ...avatar, mouthStyle: value })}
          type="button"
        />

        {/* Facial Hair */}
        <CustomizationSection
          icon={<User className="w-5 h-5" />}
          title="Barba/Bigode"
          options={facialHairOptions.map(option => ({
            label: option.name,
            value: option.id,
          }))}
          selected={avatar.facialHair}
          onSelect={(value) => setAvatar({ ...avatar, facialHair: value })}
          type="button"
        />

        {/* Top Style */}
        <CustomizationSection
          icon={<Shirt className="w-5 h-5" />}
          title="Estilo de Roupa"
          options={topStyles.map(style => ({
            label: style.name,
            value: style.id,
          }))}
          selected={avatar.topStyle}
          onSelect={(value) => setAvatar({ ...avatar, topStyle: value })}
          type="button"
        />

        {/* Top Color */}
        <CustomizationSection
          icon={<Palette className="w-5 h-5" />}
          title="Cor da Roupa"
          options={topColors.map(color => ({
            label: color.name,
            value: color.color,
            color: color.color,
          }))}
          selected={avatar.topColor}
          onSelect={(value) => setAvatar({ ...avatar, topColor: value })}
          type="color"
        />

        {/* Accessories */}
        <CustomizationSection
          icon={<Sparkles className="w-5 h-5" />}
          title="Acessórios"
          options={accessories.map(acc => ({
            label: acc.name,
            value: acc.id,
          }))}
          selected={avatar.accessory}
          onSelect={(value) => setAvatar({ ...avatar, accessory: value })}
          type="button"
        />

        {/* Background */}
        <CustomizationSection
          icon={<Palette className="w-5 h-5" />}
          title="Fundo"
          options={backgrounds.map(bg => ({
            label: bg.name,
            value: bg.gradient,
            gradient: bg.gradient,
          }))}
          selected={avatar.background}
          onSelect={(value) => setAvatar({ ...avatar, background: value })}
          type="gradient"
        />
      </div>
    </div>
  );
}

function CustomizationSection({
  icon,
  title,
  options,
  selected,
  onSelect,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  options: Array<{ label: string; value: string; color?: string; gradient?: string }>;
  selected: string;
  onSelect: (value: string) => void;
  type: "color" | "button" | "gradient";
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-purple-500">{icon}</div>
        <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`relative p-3 rounded-xl transition-all ${
              selected === option.value
                ? "ring-2 ring-purple-500 scale-105"
                : "hover:scale-105"
            }`}
            style={
              type === "color"
                ? {
                    backgroundColor: option.color,
                    border: "2px solid #E5E7EB",
                  }
                : type === "gradient"
                ? {
                    background: option.gradient,
                    border: "2px solid #E5E7EB",
                  }
                : undefined
            }
          >
            {type === "button" && (
              <span className="text-xs font-medium text-gray-900 dark:text-white text-center block">
                {option.label}
              </span>
            )}
            {(type === "color" || type === "gradient") && selected === option.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
