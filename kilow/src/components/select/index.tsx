import React from 'react';
// import {Container, DivNome, DivCategoria, Texto, DivCadastro, DivCusto
// } from "./style"


function SelectCategories() {
    const categories = [
        "Computadores",
        "Climatização",
        "Monitores",
        "Áudio",
        "Redes"
    ]
    return (
        <select>
            {categories.map((element) => (
                <option value={element} key={1}> {element} </option>
            ))}
        </select>
    )
}