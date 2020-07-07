import React, { useContext, createRef, useRef } from 'react';
import StoreContext from '../../contexts/Store';
import CartModal from '../CartModal';
import $ from 'jquery';
import CartModalSucesso from '../CartModalSuccesso';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const { state, dispatch } = useContext(StoreContext);

    let pokemon = state.products;
    
    const cartRef = createRef();
    useRef(() => {
        pokemon = dispatch({ type: 'getProducts'});
    }, [state.products]);

    const getTotalCart = () => {
        if (!Array.isArray(pokemon)) {
            return 0.00;
        }

        let totalCart = pokemon.reduce((total, item, index) => {
            return (parseFloat(item.price.replace('.','').replace(',','.')) + parseFloat(total)).toFixed(2);
        }, 0.00);

        return parseFloat(totalCart).toLocaleString('pt-BR');
    };    

    const cartFooter = () => {
        if (pokemon.length > 0) {
            return (
                <div className="card-footer center">
                    <button type="button" className="btn btn-info" onClick={handleReady}>FINALIZAR</button>
                </div>
            );
        } else {
            return '';
        }
    } 

    const emptyCart = () => {
        if (pokemon.length > 0) {
            return (
                <button type="button" className="btn btn-danger btn-sm" onClick={handleEmpty}><FontAwesomeIcon icon={faCartArrowDown} /></button>
            );
        } else {
            return '';
        }
    } 

    const handleReady = () => {
        $('#cartModal').modal('toggle');
    }

    const handleSuccess = () => {
        dispatch({ type: 'emptyCart'});
        $('#cartModalSucesso').modal('toggle');
    }

    const handleRemoveItem = (item) => () => {
        dispatch({ type: 'removeItemOfCart', item});
    }

    const handleEmpty = () => {
        dispatch({ type: 'emptyCart'});
    }

    return (
        <>
            <div className="card" ref={cartRef}>
                <div className="card-header center">
                    <h5 className="card-title mt-2">CARRINHO</h5>
                </div>
                <ul className="list-group list-group-flush">
                    {pokemon 
                        && pokemon.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="row">
                                <div className="col-md-2">
                                    <img 
                                        width="50"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                                        alt={item.name} />
                                </div>
                                <div className="col-md-5">
                                    {item.name}
                                </div>
                                <div className="col-md-5 right">
                                    R$ {item.price}
                                    <button type="button" 
                                             name="removeItem" 
                                             className="ml-1 btn btn-sm btn-outline-danger"
                                            onClick={handleRemoveItem(item)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}                   
                </ul>
                <div className="card-body row">
                    <div className="col-md-6">Total: R$ {getTotalCart()}</div>
                    <div className="col-md-6 right">{emptyCart()}</div>
                </div>
                {cartFooter()}
            </div>
            <CartModal itens={pokemon} total={getTotalCart()} handleSuccess={handleSuccess} />
            <CartModalSucesso />
        </>
    );
};

export default Cart;