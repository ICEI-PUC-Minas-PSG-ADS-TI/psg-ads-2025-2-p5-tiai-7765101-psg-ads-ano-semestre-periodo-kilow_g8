import React from "react";
import { DivContainer, Label } from "./style";

interface PropsInput {
    label: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({ label, placeholder, type, value, onChange }: PropsInput) {
    return (
        <DivContainer>
            <Label>{label}</Label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                border-radius='10px'
                style={{
                    borderRadius: '10px',
                    width: '641px',
                    height: '60px',
                    border: '1px solid #EEEBE4',
                    backgroundColor: '#EEEBE4',
                    fontFamily: 'Open Sans',
                    fontSize: '18px',
                    color: '#9E9E9E',
                    padding: '5px 20px'
                }}/>
        </DivContainer>

    )
}