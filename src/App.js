import React, { useReducer, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PokemonList from './components/PokemonList';
import Cart from './components/Cart';
import PokemonSearchList from './components/PokemonSearchList';
import Footer from './components/Footer';
import Header from './components/Header';

import StoreContext from './contexts/Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    let productsTmp = null;
    if (localStorage.getItem('products') && localStorage.getItem('products').length > 0) {
      productsTmp = JSON.parse(localStorage.getItem('products'));
    } else {
      productsTmp = [];
    }   

    let initialState = { products: productsTmp};

    const addToCart = (item, products) => {
      item.id = parseInt(item.id);
      let exist = products.find(i => i.id === item.id);

      if (!exist) {
        products.push(item);
        toast.success("Item adicionado ao carrinho.");
      } else {
        toast.warn("Este item já se encontra no carrinho.");
      }

      localStorage.setItem('products', JSON.stringify(products));

      return products;
    }

    const getProducts = (list) => {
        return list;
    }

    const removeItemOfCart = (item, products) => {
      let exist = products.find(i => i.id === item.id);

      if (exist) {
        products.pop(exist);
        toast("Item removido do carrinho.");
      }

      localStorage.setItem('products', JSON.stringify(products));

      return products;
    };
    
    const reducer = useCallback((state, action) => {
        switch (action.type) {
            case "addToCart":
              let products = addToCart(action.item, state.products);              
              return { ...state, products };

            case "getProducts":
              return getProducts(state.products);

            case "emptyCart":
              toast("Todos os itens foram removidos do carrinho.");
              return { ...state, products: [] };

            case "removeItemOfCart":
              return { ...state, products: removeItemOfCart(action.item, state.products) };

            default:
              throw new Error();
        }
    }, []);

    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };

  return (
    <Router>
      <StoreContext.Provider value={value}>
      <div>
        <Header />

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8">
              <Switch>
                <Route key="inicio" exact path={["/", "/inicio"]} component={PokemonList}/>
                <Route key="tipos" path="/tipos/:id" component={PokemonList} />
                <Route key="search" path="/search/:keySearch" component={PokemonSearchList} />
              </Switch>
            </div>
            <div className="col-md-4">
              <Cart />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose="2000" />
      </StoreContext.Provider>
    </Router>    
  );
}

export default App;
