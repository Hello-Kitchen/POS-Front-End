import React from 'react';
import { useNavigate } from "react-router-dom";

import { GoArrowRight } from "react-icons/go";
import PropTypes from 'prop-types';

const Header = ({ orders }) => (
    <div className='w-full p-2 items-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow flex'>{`Table ${orders[0].nb}`}</div>
)

const Food = ({ name, price }) => (
    <div className='w-full flex flex-row justify-between'>
        <div className='flex text-24px text-white font-light'>1x {name}</div>
        <div className='flex text-24px justify-end text-white font-light'>{price}€</div>
    </div>
)

const Detail = ({ text }) => (
    <div className="w-full flex flex-row gap-2 pl-3 items-center">
        <GoArrowRight color="white" />
        <div className="flex text-20px text-white font-light">{text}</div>
    </div>
)

const Sup = ({ text }) => (
    <div className="w-full flex flex-row gap-2 pl-3 items-center">
        <div className="flex text-20px text-white font-light">{text.type === 'ADD' ? `Supplement ${text.ingredient}` : text.type === 'ALL' ? `Allergie ${text.ingredient}` : text.type === 'DEL' ? `Sans ${text.ingredient}` : ``}</div>
    </div>
)

const Note = ({ text }) => (
    <div className="w-full flex flex-row gap-2 pl-3 items-center">
        <div className="flex text-20px text-white font-light">NOTE {text}</div>
    </div>
)

const Stop = () => (
    <div className='w-full h-5 gap-2 flex flex-row items-center'>
        <div className='w-1/3 h-2/3 bg-kitchen-yellow'></div>
        <div className='w-1/3 h-full flex items-center justify-center font-bold text-kitchen-yellow text-4xl'>STOP</div>
        <div className='w-1/3 h-2/3 bg-kitchen-yellow'></div>
    </div>
)

/**
 * Component : Component used by the Content component. Displays the content of the related order
 * 
 * @component Order
 * @param {Object} orders current order
 * @param {Boolean} border boolean used to separate orders
 * @param {Object} config state of the current order
 */
const Order = ({ order, border, config }) => (
    <div className={`w-full h-auto p-2 ${border ? 'border-t border-t-kitchen-yellow' : ''}`}>
        {order.plat && order.price && <Food name={order.plat} price={order.price} />}
        {order.details && order.details.map((detail, index) => (
            <Detail key={index} text={detail} />
        ))}
        {order.mods_ingredients && order.mods_ingredients.map((sup, index) => (
            <Sup key={index} text={sup} />
        ))}
        {order.note && order.note.map((note, index) => (
            <Note key={index} text={note} />
        ))}
        {!config.payement && order.stop && <Stop />}
    </div>
)

/**
 * Component : Component used by the CurrentCommand. Displays the content of the current orders
 * 
 * @component Content
 * @param {[Object]} orders arrays of current order
 * @param {Boolean} stop boolean used to know if the order has a stop
 * @param {Object} config state of the current order
 */
const Content = ({ orders, stop, config }) => (
    <div className={!config.payement ? 'w-full flex flex-col overflow-auto scrollbar-hide' : 'w-full min-h-[h-current-cmd-content] flex flex-col overflow-auto scrollbar-hide border-b-4 border-kitchen-yellow box-border border-solid'}>
        {
            orders[1].map((order, index) => {
                if (index === 0) {
                    return <Order key={index} order={order} border={false} config={config} />
                }
                if (!config.payement && order.stop === true) {
                    stop = true;
                    return <Order key={index} order={order} border={false} config={config} />
                }
                if (config.payement && order.stop === true)
                    return null
                if (!config.payement && stop === true) {
                    stop = false;
                    return <Order key={index} order={order} border={false} config={config} />
                }
                else {
                    stop = false;
                    return <Order key={index} order={order} border={true} config={config} />
                }
            })}
    </div>
)

/**
 * Component : Footer Component of the CurrentCommand component. Displays the informations of the command, not the content, and handles PUT databases calls when the order is complete.
 * 
 * @component Footer
 * @param {Object} config state of the current order
 * @param {[Object]} orders arrays of current order
 * @param {Function} setOrders state function to update the current orders
 * @param {Function} setConfig state function to update the config of the current order
 * @param {Number} price full price of the current order
 * @param {Number} priceLess full price of the current order
 * @param {[Number]} payList List of all current transactions
 */
function Footer({ config, orders, setOrders, setConfig, price, priceLess, payList }) {
  
    const navigate = useNavigate();

    async function sendFirstOrder() {
        if (orders[1].length < 1)
            return;
        let stopCounter = 1;
        const orderedFood = [];
    
        const promises = orders[1].map(async (order) => {
            if (order.stop) {
                stopCounter++;
                return;
            }
            let newObj = Object.keys(order).reduce((acc, key) => {
                if (key !== "plat" && key !== "price") {
                    acc[key] = order[key];
                }
                return acc;
            }, {});
            newObj['part'] = stopCounter;
            newObj['is_ready'] = false;
            orderedFood.push(newObj);
        });
    
        await Promise.all(promises);
    
        let obj = {
            date: new Date().toISOString(),
            channel: orders[3].channel,
            number: (orders[3].channel === "En salle") ? `Table ${orders[0].nb}` : `${orders[0].nb}`,
            part: 1,
            food_ordered: orderedFood,
            served: false,
        };

        console.log(obj);
        const data = fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/1/orders/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify(obj)
        })
        .then(response => {
            if (response.status === 401) {
              navigate("/", {state: {error: "Unauthorized access. Please log in."}});
              throw new Error("Unauthorized access. Please log in.");
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
        });
        
        setConfig(prevConfig => ({ ...prevConfig, firstSend: false, id_order: data.id }));
    }

    async function sendOtherOrder() {
        const newOrders = [...orders];
        const index = newOrders[1].findIndex(item => item.stop === true);
        if (index !== -1) {
            fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/orders/next/${config.id_order}`, {
                method: 'PUT',
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(response => {
                if (response.status === 401) {
                  navigate("/", {state: {error: "Unauthorized access. Please log in."}});
                  throw new Error("Unauthorized access. Please log in.");
                }
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
            newOrders[1] = newOrders[1].filter((_, i) => i !== index);
            setOrders(newOrders);
        }
    }

    if (!config.payement) {
        return (
            <div className='w-full h-current-cmd-footer border-t border-kitchen-yellow flex flex-row gap-px bg-kitchen-yellow'>
                <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={() => { if(orders[1].length < 1) return; const newOrders = [...orders]; newOrders[1] = [...newOrders[1], { stop: true }]; console.log(newOrders); setOrders(newOrders); }}>STOP</div>
                {config.firstSend ? <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={sendFirstOrder}>Envoyer</div> : <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={sendOtherOrder}>Demander la suite</div>}
            </div>
        )
    } else {
        return (
            <div className='w-full flex-1 min-h-[20%] flex p-2 overflow-auto scrollbar-hide'>
                <div className='w-full flex flex-col gap-px pt-2 justify-start'>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='text-white font-normal text-20px'>Total</div>
                        <div className='text-white font-normal text-20px'>{price.toFixed(2).toString()}€</div>
                    </div>
                    {payList}
                    {priceLess < 0 ? (
                        <div className='flex flex-row justify-between w-full'>
                            <div className='text-white font-bold text-24px'>Montant dû</div>
                            <div className='text-white font-bold text-24px'>{(priceLess * (-1)).toFixed(2).toString()}€</div>
                        </div>
                    ) : (
                        <div className='flex flex-row justify-between w-full'>
                            <div className='text-white font-bold text-24px'>Reste a payer</div>
                            <div className='text-white font-bold text-24px'>{priceLess.toFixed(2).toString()}€</div>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
}

/**
 * Component : Main Component displaying all the information of the current command.
 * 
 * @component CurrentCommand
 * @param {[Object]} orders arrays of current order
 * @param {Object} config state of the current order
 * @param {Function} setConfig state function to update the config of the current order
 * @param {Function} setOrders state function to update the current orders
 * @param {Number} price full price of the current order
 * @param {Number} priceLess full price of the current order
 * @param {[Number]} payList List of all current transactions
 */
function CurrentCommand({ orders, config, setConfig, setOrders, price, priceLess, payList }) {
    return (
        <div className='h-full w-1/4 bg-kitchen-blue float-right flex flex-col justify-between'>
            <div className={!config.payement ? 'w-full max-h-[85%] float-right px-2 gap-3 flex flex-col' : 'w-full max-h-[80%] float-right px-2 gap-3 flex flex-col'}>
                <Header orders={orders} />
                <Content orders={orders} stop={false} config={config} setOrders={setOrders} setConfig={setConfig} />
            </div>
            <Footer config={config} orders={orders} setOrders={setOrders} setConfig={setConfig} price={price} priceLess={priceLess} payList={payList} />
        </div>
    )
}

Header.propTypes = {
    orders: PropTypes.array.isRequired,
}

Food.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
}

Detail.propTypes = {
    text: PropTypes.string.isRequired,
}

Sup.propTypes = {
    text: PropTypes.string.isRequired,
}

Note.propTypes = {
    text: PropTypes.string.isRequired,
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    border: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
}

Content.propTypes = {
    orders: PropTypes.array.isRequired,
    stop: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
}

Footer.propTypes = {
    orders: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
}

CurrentCommand.propTypes = {
    orders: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
}

export default CurrentCommand;
