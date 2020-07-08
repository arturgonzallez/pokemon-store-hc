import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <h4>Página não encontrada</h4>
            <Link to="/">Voltar para a página inicial</Link>
        </>
    );
}

export default PageNotFound;