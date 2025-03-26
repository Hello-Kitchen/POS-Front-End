import React from 'react';

import PropTypes from 'prop-types';

function ModalNewOrder({setModalOpen, setOrders, setConfig, setSelectedOrder}) {
    const clearOrder = (orderType) => {
        if (orderType === "DIRECT") {
            setOrders([{nb: "DIRECT"}, [], {channel: "DIRECT"}, {orderId: null}]);
        } else if (orderType === "OnSite") {
            setOrders([{nb: ""}, [], {channel: "Sur place"}, {orderId: null}]);
        } else {
            setOrders([{nb: ""}, [], {channel: "A emporter"}, {orderId: null}]);
        }
        setConfig({payement: false, firstSend: true, id_order: null});
        setSelectedOrder("");
        setModalOpen(false);
    }

    return (
        <div className="fixed  flex justify-center bottom-[97px] right-1/4">
          <div className="bg-kitchen-blue rounded-tl-xl p-2 h-fit">
            <div className="space-y-2">
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("DIRECT")}>
                DIRECT
              </div>
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("OnSite")}>
                Sur place
              </div>
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("Away")}>
                A emporter
              </div>
            </div>
          </div>
        </div>
      );
}

ModalNewOrder.propTypes = {
    setModalOpen: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    setSelectedOrder: PropTypes.func.isRequired,
}

export default ModalNewOrder;