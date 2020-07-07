import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './PokemonSearch.css';

const PokemonSearch = () => {
    const history = useHistory();
    const [ search, setSearch ] = useState('');

    const handlePesquisa = () => {
        if (search) {
            history.push(`/search/${search}`);
            setSearch('');
            //window.location.reload();
        } else {
            alert('Informe um termo para realizar a pesquisa.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return(
        <>
            <form className="form-inline mt-2 mt-md-0">
                <div className="form-group mb-2">
                    <input 
                        className="form-control mr-2" 
                        name="pesquisar"
                        type="text" 
                        placeholder="o que deseja encontrar?" 
                        aria-label="Search" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                </div>
                <button className="btn btn-outline-success mb-2" type="button" onClick={handlePesquisa}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>            
              </form>
        </>
    )
}

export default PokemonSearch;