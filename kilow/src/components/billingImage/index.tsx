import React from 'react';
import { colors } from '../theme';

interface BillingImageComponentProps extends React.SVGProps<SVGSVGElement> {
  consumptionLevel?: number;
  className?: string;
}
export const BillingImageComponent: React.FC<BillingImageComponentProps> = ({
  consumptionLevel = 100,
  className = '',
  width = '100%',
  height = '100%',
  ...rest
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: colors.lightOrange,
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <svg
        viewBox="0 0 196 316"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        {...rest} // Distribui as props nativas do SVG diretamente na tag
      >
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#faf9f6" />
          </linearGradient>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#192c3a" />
            <stop offset="100%" stopColor="#1e3d52" />
          </linearGradient>
          <filter id="sh">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="9"
              floodColor="#192c3a"
              floodOpacity="0.13"
            />
          </filter>
        </defs>

        {/* Paper Background */}
        <rect
          x="6"
          y="14"
          width="184"
          height="296"
          rx="10"
          fill="url(#pg)"
          filter="url(#sh)"
        />

        {/* Top fold */}
        <path
          d="M6 24 Q98 8 190 24"
          stroke="#ece9e1"
          strokeWidth={1.5}
          fill="none"
        />
        <path
          d="M6 14 Q6 14 14 14 L182 14 Q190 14 190 14 L190 24 Q98 10 6 24 Z"
          fill="#f0ede5"
        />

        {/* Header */}
        <rect x="6" y="14" width="184" height="52" rx="10" fill="url(#hg)" />
        <rect x="6" y="50" width="184" height="16" fill="#1e3d52" />

        {/* Lightning bolt (Ícone de energia) */}
        <circle
          cx="26"
          cy="40"
          r="13"
          fill="rgba(255,210,63,.18)"
          stroke="rgba(255,210,63,.28)"
          strokeWidth={1}
        />
        <path d="M26 29 L20 40 H26 L20 51 L33 39 H27 L33 29 Z" fill="#ffd23f" />

        {/* Linhas de simulação de texto do cabeçalho */}
        <rect
          x="46"
          y="28"
          width="80"
          height="7"
          rx="3.5"
          fill="#ffd23f"
          opacity="0.88"
        />
        <rect
          x="46"
          y="40"
          width="58"
          height="4.5"
          rx="2.25"
          fill="rgba(255,255,255,.22)"
        />
        <rect
          x="46"
          y="50"
          width="40"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,.12)"
        />

        {/* Referências do canto superior direito */}
        <rect
          x="142"
          y="27"
          width="44"
          height="4"
          rx="2"
          fill="rgba(255,255,255,.17)"
        />
        <rect
          x="142"
          y="36"
          width="36"
          height="4"
          rx="2"
          fill="rgba(255,255,255,.12)"
        />
        <rect
          x="142"
          y="45"
          width="42"
          height="4"
          rx="2"
          fill="rgba(255,255,255,.08)"
        />

        {/* Badge de verificação verde */}
        <circle cx="178" cy="26" r="14" fill="#16a34a" />
        <path
          d="M170 26 L175 31 L186 20"
          stroke="white"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Dados do Consumidor */}
        <rect x="14" y="80" width="42" height="3.5" rx="1.75" fill="#c5bfb0" />
        <rect
          x="14"
          y="88"
          width="96"
          height="5.5"
          rx="2.75"
          fill="#192c3a"
          opacity="0.6"
        />
        <rect x="14" y="98" width="74" height="3.5" rx="1.75" fill="#c5bfb0" />
        <rect x="14" y="107" width="84" height="3.5" rx="1.75" fill="#ddd9d0" />

        <rect x="122" y="80" width="28" height="3.5" rx="1.75" fill="#c5bfb0" />
        <rect
          x="122"
          y="88"
          width="60"
          height="5.5"
          rx="2.75"
          fill="#192c3a"
          opacity="0.4"
        />
        <rect x="122" y="98" width="52" height="3.5" rx="1.75" fill="#ddd9d0" />
        <rect
          x="122"
          y="107"
          width="58"
          height="3.5"
          rx="1.75"
          fill="#c5bfb0"
        />

        <line
          x1="14"
          y1="121"
          x2="182"
          y2="121"
          stroke="#e8e4dc"
          strokeWidth={1}
        />

        {/* Rótulo da Secção: CONSUMO */}
        <rect
          x="14"
          y="128"
          width="60"
          height="3.5"
          rx="1.75"
          fill="#7aabcc"
          opacity="0.8"
        />

        {/* Linhas de consumo */}
        <rect x="14" y="138" width="76" height="3.5" rx="1.75" fill="#c5bfb0" />
        <rect
          x="122"
          y="138"
          width="54"
          height="3.5"
          rx="1.75"
          fill="#c5bfb0"
        />
        <rect x="14" y="147" width="62" height="3.5" rx="1.75" fill="#ddd9d0" />
        <rect
          x="122"
          y="147"
          width="42"
          height="3.5"
          rx="1.75"
          fill="#ddd9d0"
        />

        {/* Barra Destacada de kWh (Dinâmica com base na prop) */}
        <rect
          x="8"
          y="156"
          width="180"
          height="17"
          rx="5"
          fill="rgba(45,93,123,.08)"
        />
        <rect
          x="14"
          y="161"
          width="54"
          height="4.5"
          rx="2.25"
          fill="#2d5d7b"
          opacity="0.72"
        />

        {/* Manipulação condicional da largura usando a prop consumorLevel */}
        <rect
          x="122"
          y="160"
          width={consumptionLevel > 200 ? 55 : 30}
          height="4"
          rx="2"
          fill="#2d5d7b"
          opacity={consumptionLevel > 200 ? 0.8 : 0.45}
        />
        <rect
          x="155"
          y="160"
          width="30"
          height="4"
          rx="2"
          fill="#2d5d7b"
          opacity="0.65"
        />

        <rect x="14" y="180" width="66" height="3.5" rx="1.75" fill="#ddd9d0" />
        <rect
          x="122"
          y="180"
          width="50"
          height="3.5"
          rx="1.75"
          fill="#ddd9d0"
        />

        <line
          x1="14"
          y1="193"
          x2="182"
          y2="193"
          stroke="#e8e4dc"
          strokeWidth={1}
        />

        {/* Bloco do Valor Total (Pode mudar de cor se o consumo for excessivo) */}
        <rect
          x="8"
          y="197"
          width="180"
          height="26"
          rx="6"
          fill={consumptionLevel > 300 ? '#ef4444' : '#ffd23f'}
          opacity={0.15}
        />
        <rect x="14" y="203" width="48" height="5" rx="2.5" fill="#192c3a" />
        <rect
          x="108"
          y="202"
          width="76"
          height="9"
          rx="4.5"
          fill="#192c3a"
          opacity="0.82"
        />

        {/* Linhas inferiores */}
        <rect x="14" y="232" width="56" height="3.5" rx="1.75" fill="#ddd9d0" />
        <rect
          x="122"
          y="232"
          width="46"
          height="3.5"
          rx="1.75"
          fill="#ddd9d0"
        />
        <rect x="14" y="241" width="70" height="3.5" rx="1.75" fill="#e5e2da" />
        <rect
          x="122"
          y="241"
          width="36"
          height="3.5"
          rx="1.75"
          fill="#e5e2da"
        />
        <rect x="14" y="250" width="48" height="3.5" rx="1.75" fill="#eae7e0" />

        <rect x="14" y="262" width="168" height="0.8" fill="#e8e4dc" />

        {/* Código de Barras Simulado */}
        <g fill="#c5bfb0" opacity="0.5">
          <rect x="16" y="266" width="2" height="18" rx="1" />
          <rect x="20" y="266" width="3" height="18" rx="1" />
          <rect x="25" y="266" width="1.5" height="18" rx=".75" />
          <rect x="28" y="266" width="4" height="18" rx="1" />
          <rect x="34" y="266" width="2" height="18" rx="1" />
          <rect x="38" y="266" width="3" height="18" rx="1" />
          <rect x="43" y="266" width="1.5" height="18" rx=".75" />
          <rect x="46" y="266" width="2" height="18" rx="1" />
          <rect x="50" y="266" width="4" height="18" rx="1" />
          <rect x="56" y="266" width="1.5" height="18" rx=".75" />
          <rect x="59" y="266" width="3" height="18" rx="1" />
          <rect x="64" y="266" width="2" height="18" rx="1" />
          <rect x="68" y="266" width="4" height="18" rx="1" />
          <rect x="74" y="266" width="1.5" height="18" rx=".75" />
          <rect x="77" y="266" width="2" height="18" rx="1" />
          <rect x="81" y="266" width="3" height="18" rx="1" />
          <rect x="86" y="266" width="1.5" height="18" rx=".75" />
          <rect x="89" y="266" width="4" height="18" rx="1" />
          <rect x="95" y="266" width="2" height="18" rx="1" />
          <rect x="99" y="266" width="3" height="18" rx="1" />
          <rect x="104" y="266" width="1.5" height="18" rx=".75" />
          <rect x="107" y="266" width="2" height="18" rx="1" />
          <rect x="111" y="266" width="4" height="18" rx="1" />
          <rect x="117" y="266" width="1.5" height="18" rx=".75" />
          <rect x="120" y="266" width="3" height="18" rx="1" />
          <rect x="125" y="266" width="2" height="18" rx="1" />
          <rect x="129" y="266" width="4" height="18" rx="1" />
          <rect x="135" y="266" width="1.5" height="18" rx=".75" />
          <rect x="138" y="266" width="2" height="18" rx="1" />
          <rect x="142" y="266" width="3" height="18" rx="1" />
          <rect x="147" y="266" width="1.5" height="18" rx=".75" />
          <rect x="150" y="266" width="4" height="18" rx="1" />
          <rect x="156" y="266" width="2" height="18" rx="1" />
          <rect x="160" y="266" width="3" height="18" rx="1" />
          <rect x="165" y="266" width="1.5" height="18" rx=".75" />
          <rect x="168" y="266" width="2" height="18" rx="1" />
          <rect x="172" y="266" width="3" height="18" rx="1" />
          <rect x="177" y="266" width="2" height="18" rx="1" />
        </g>

        {/* Bottom curl */}
        <path
          d="M6 296 Q98 310 190 296"
          stroke="#ece9e1"
          strokeWidth={1.2}
          fill="none"
        />

        {/* Marca de água KiloW */}
        <circle
          cx="98"
          cy="304"
          r="11"
          fill="rgba(45,93,123,.07)"
          stroke="#ddd9d0"
          strokeWidth={1}
        />
        <path
          d="M98 296 L93 304 H98 L93 312 L104 303 H99 L104 296 Z"
          fill="#2d5d7b"
          opacity={0.4}
        />
      </svg>
    </div>
  );
};
