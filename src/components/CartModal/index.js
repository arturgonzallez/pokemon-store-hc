import React from 'react';

const CartModal = ({itens, total, handleSuccess}) => {
    return (
        <div id="cartModal" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Finalizar Compra</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Você está comprando <b>{itens.length}</b> ite{(itens.length > 1) ? 'ns' : 'm'}.</p>
                        <p>O valor da sua compra é <b>R$ {total}</b>.</p>
                        <p>Para concluir clique no botão prosseguir.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Voltar</button>
                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleSuccess}>Prosseguir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartModal;