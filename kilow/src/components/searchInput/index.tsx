import React from "react";
import Image from 'next/image';
import { Div } from './style';

interface PropsInput {
    type: string;
    value: string;
    placeholder: string;
    // Aqui dizemos: "É uma função que recebe o evento e não retorna nada"
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function searchInput({ placeholder, type, value, onChange }: PropsInput) {
    return (
        <Div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                border-radius='10px'
                style={{
                    border: '3px solid #fffdf7',
                    fontFamily: 'Open Sans',
                    fontSize: '20px',
                    color: '#9e9e9e',
                    backgroundColor: '#fffdf7',
                    width: '600px'

                }} />
            <Image
                src={'/assets/icon-search.png'}
                alt="icone"
                width={30}
                height={30}
            />
        </Div>

    )
}