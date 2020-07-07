import React, { useEffect, useState, useContext } from "react";
import PokemonService from '../../services/PokemonService';
import TypeService from '../../services/TypeService';
import './PokemonList.css';
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import StoreContext from "../../contexts/Store";

const PokemonList = React.memo(props => {
  const [pokemon, setPokemon] = useState([]);
  const [btnPrevious, setBtnPrevious] = useState(null);
  const [btnNext, setBtnNext] = useState(null);
  const [title, setTitle] = useState('em destaque');
  const { id } = useParams();

  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    loadPokemon(id, null, null);
  }, [id]);

  const loadPokemon = async (id, limit, offset) => {
    try {      
      if (id) {
        let response = await PokemonService.get(id);
        let responseType = await TypeService.get(id);
    
        if (response.data.pokemon.length > 20) {
          response.data.pokemon = response.data.pokemon.slice(0, 20);
        }
    
        setPokemon(response.data.pokemon);
        setTitle(`${responseType.data.name}`);
      } else {
        let response = await PokemonService.getAll(limit, offset);
  
        setPokemon(response.data.results);
        setBtnPrevious(response.data.previous);
        setBtnNext(response.data.next);
        setTitle('em destaque');
      }
  
    } catch(err) {
      console.log(err);
    }
  };

  const returnName = (item) => {
    return item.name ?? item.pokemon.name;
  }

  const returnId = (item) => {
    let url = null;

    if (item.pokemon) {
      url = item.pokemon.url;
    } else {
      url = item.url;
    }

    if (url) {
      let url_arr = url.split("/");
      let id = url_arr[url_arr.length - 2];
  
      return id;
    }

    return null;
  }

  const returnPrice = (item) => {
    let price = returnId(item) * 10.99;

    return price.toLocaleString('pt-BR');
  }
  
  const handleItem = (item) => () => {
    item.id = returnId(item);
    item.name = returnName(item);
    item.price = returnPrice(item);

    dispatch({ type: 'addToCart', item});
  }

  const handlePrevious = () => {
    if (btnPrevious) {
      return (
        <>
          <button type="button" 
                className="btn btn-outline-info btn-sm mr-1"
                onClick={e => handlePreviousClick(e)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
        </>
      );
    }

    return (<></>);
  };

  const handleNext = () => {
    if (btnNext) {
      return (
        <>
          <button type="button" 
                className="btn btn-outline-info btn-sm ml-1"
                onClick={e => handleNextClick(e)}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
        </>
      );
    }

    return (<></>);
  };

  const handlePreviousClick = (e) => {
    e.preventDefault();
    const query = btnPrevious.split('?');
    const query2 = query[query.length - 1].split('&');

    let limit = query2[1].split('=');
    let offset = query2[0].split('=');
    let _limit = limit[1];
    let _offset = offset[1];
    
    loadPokemon(id, _limit, _offset);
  }

  const handleNextClick = (e) => {
    e.preventDefault();
    const query = btnNext.split('?');
    const query2 = query[query.length - 1].split('&');
    
    let limit = query2[1].split('=');
    let offset = query2[0].split('=');
    let _limit = limit[1];
    let _offset = offset[1];
    
    loadPokemon(id, _limit, _offset);
  }

  return (
    <>
      <h4>{title}</h4>
      <div className="row">
        <div className="col-md-12 center">
          {handlePrevious()}

          {handleNext()}
        </div>
      </div>
      <div className="list row center">
          {pokemon &&
            pokemon.map((item, index) => (
              <div className="col-md-3" key={index}>
                    <img className="card-img-top"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${returnId(item)}.png`}
                      alt={returnName(item)} />
                  <div className="card-body">
                    {returnName(item)}
                    <br />
                    <p>R$ {returnPrice(item)}</p>
                    <button type="button" name="addItem" 
                          className="btn btn-success btn-sm"
                          onClick={handleItem(item)}><FontAwesomeIcon icon={faCartPlus} /> Comprar</button>
                  </div>
                
                </div>                 
            ))}
      </div>
      <div className="row">
        <div className="col-md-12 center">
          {handlePrevious()}

          {handleNext()}
        </div>
      </div>
      <br></br>
    </>
  );
});

export default PokemonList;
