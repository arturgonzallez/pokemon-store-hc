import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TypeService from '../../services/TypeService';

const HeaderMenu = (props) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        loadTypes();
      }, []);
    
    const loadTypes = async () => {
        try {      
            let response = await TypeService.getAll();

            setTypes(response.data.results);
        
        } catch(err) {
            console.log(err);
        }
    };

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

    return (
        <>
            <ul className="navbar-nav mr-auto">
            {types && types.map((item, index) => (
                <li className="nav-item" key={index}>
                    <Link to={`/tipos/${returnId(item)}`} className="nav-link">
                        {item.name}
                    </Link>
                </li>                
            ))}
            </ul>
        </>
    );
}

export default HeaderMenu;