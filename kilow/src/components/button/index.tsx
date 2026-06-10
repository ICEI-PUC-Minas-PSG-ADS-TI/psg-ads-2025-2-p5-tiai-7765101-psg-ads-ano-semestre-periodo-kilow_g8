import React from "react";

interface PropsButton {
    text: string;
    isEnabled: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ handleClick, isEnabled, text }: PropsButton) {
    return (

        <button
        onClick={handleClick}
        disabled={!isEnabled} 
        style={{
          padding: "10px 20px",
          backgroundColor: isEnabled ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isEnabled ? "pointer" : "not-allowed"
        }}
      >
        {text}
      </button>
  );
}

