import React from 'react';
import PokemonSearch from '../PokemonSearch';
import HeaderMenu from '../HeaderMenu';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to="/">Pokestore HC</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <PokemonSearch />
                    <HeaderMenu />                    
                </div>
            </nav>
        </header>
        </>
    );
}

export default Header;