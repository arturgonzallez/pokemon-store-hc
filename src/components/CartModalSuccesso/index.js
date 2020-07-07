import React from 'react';

const CartModalSucesso = ({itens, total}) => {
    return (
        <div id="cartModalSucesso" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">

                    </div>
                    <div className="modal-body center">
                        <h1>Parabéns!</h1>
                        <p>Compra realizada.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartModalSucesso;