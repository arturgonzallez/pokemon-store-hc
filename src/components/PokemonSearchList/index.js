
import React, { useEffect, useState, useContext } from "react";
import PokemonService from '../../services/PokemonService';
import './PokemonSearchList.css';
import { useParams } from "react-router-dom";
import StoreContext from "../../contexts/Store";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const PokemonSearchList = props => {
  const [pokemon, setPokemon] = useState([]);
  const [title, setTitle] = useState('Resultado para pesquisa');
  const { keySearch } = useParams();

  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    loadPokemon(keySearch);
  }, [keySearch]);

  const loadPokemon = async (keyPokemonSearch) => {
    setTitle(`Resultado da pesquisa para "${keyPokemonSearch}"`);

    try {      
      let response = await PokemonService.findByName(keyPokemonSearch);
        
      if (response.status === 404) {
        setPokemon([]);
      } else {
        setPokemon([response.data]);
      }    
  
    } catch(err) {
      console.log(err);
    }
  };

  const returnPrice = (item) => {
    let price = item.id * 10.99;

    return price.toLocaleString('pt-BR');
  }

  const handleItem = (item) => () => {
    item.price = returnPrice(item);

    dispatch({ type: 'addToCart', item});
  }

  return (
    <>
      <h4>{title}</h4>

      <div className="list row center">
            {pokemon &&
              pokemon.map((item, index) => (
                <div className="col-md-3" key={index}>
                    <img className="card-img-top"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                        alt={item.name} />
                    <div className="card-body">
                      {item.name}
                      <br />
                      <p>R$ {returnPrice(item)}</p>
                      <button type="button" name="addItem" 
                            className="btn btn-success btn-sm"
                            onClick={handleItem(item)}><FontAwesomeIcon icon={faCartPlus} /> Comprar</button>
                    </div>
                  </div>                  
              ))}

          { pokemon.length === 0 ? 'Nenhum resultado encontrado' : '' }
      </div>
    </>
  );
};

export default PokemonSearchList;