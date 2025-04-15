import React from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function ModalNewOrder({setModalOpen, setOrders, setConfig, setSelectedOrder}) {

    const navigate = useNavigate();

    const clearOrder = (orderType) => {
        if (orderType === "direct") {
            setOrders([{nb: "DIRECT"}, [], {channel: "Sur place"}, {orderId: null}]);
        } else {
          fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders/number?channel=${orderType}`,
          {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }})
          .then((response) => {
            if (response.status === 401) {
              navigate("/", {state: {error: "Unauthorized access. Please log in."}});
              throw new Error("Unauthorized access. Please log in.");
            }
            return response.json();
          })
          .then(data => {
            if (orderType === "eatin") {
              setOrders([{nb: `Table ${data}`}, [], {channel: "Sur place"}, {orderId: null}]);
            }
            if (orderType === "togo") {
              setOrders([{nb: `N°${data}`}, [], {channel: "A emporter"}, {orderId: null}]);
            }
          })
        }
        // } else if (orderType === "OnSite") {
        //     setOrders([{nb: ""}, [], {channel: "Sur place"}, {orderId: null}]);
        // } else {
        //     setOrders([{nb: ""}, [], {channel: "A emporter"}, {orderId: null}]);
        // }
        setConfig({payement: false, firstSend: true, id_order: null});
        setSelectedOrder("");
        setModalOpen(false);
    }

    return (
        <div className="fixed  flex justify-center bottom-[97px] right-1/4">
          <div className="bg-kitchen-blue rounded-tl-xl p-2 h-fit">
            <div className="space-y-2">
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("direct")}>
                DIRECT
              </div>
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("eatin")}>
                Sur place
              </div>
              <div className="w-80 py-3 text-center bg-kitchen-yellow rounded-lg text-kitchen-blue text-xl font-bold" onClick={() => clearOrder("togo")}>
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