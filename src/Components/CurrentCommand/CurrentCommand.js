import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { GoArrowRight } from "react-icons/go";
import PropTypes from 'prop-types';

const Header = ({ orders }) => {
    const orderNumber = () => {
        if (orders.channel === "Sur place" && orders.number !== "DIRECT") {
            return `Table ${orders.number}`;
        } else if (orders.channel === "Sur place" && orders.number === "DIRECT") {
            return `Direct`;
        } else if (orders.channel === "A emporter") {
            return `N°${orders.number}`;
        } else {
            return `${orders.number}`;
        }
    }

    return (
        <div className='w-full p-2 items-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow flex'>{orderNumber()}</div>
    );
};

function Food({ name, price, quantity }) {
    return (
        <div className='w-full flex flex-row justify-between'>
            <div className='flex text-24px text-white font-light'>{quantity}x {name}</div>
            <div className='flex text-24px justify-end text-white font-light'>{price * quantity}€</div>
        </div>
    )
}

const Detail = ({ text }) => (
    <div className="w-full flex flex-row gap-2 pl-3 items-center">
        <GoArrowRight color="white" />
        <div className="flex text-20px text-white font-light">{text}</div>
    </div>
)

const Sup = ({ text }) => (
    <div className="w-full flex flex-row gap-2 pl-3 items-center">
        <div className={`flex text-20px text-white font-light w-full ${text.suppPrice ? 'justify-between' : ''}`}>
            <div>
            {text.type === 'ADD' ? `Supplement ${text.ingredient}` : text.type === 'ALE' ? `Allergie ${text.ingredient}` : text.type === 'DEL' ? `Sans ${text.ingredient}` : ``}
            </div>
            <div>
                {text.suppPrice ? `${text.suppPrice}€` : ''}
            </div>
        </div>
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

function Edit({ order, setOrders }) {

    const addOrderQuantity = () => {
        setOrders((prevOrders) => {
            return {
                ...prevOrders, food: prevOrders.food.map((item) => {
                    if (item === order) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                })
            };
        });
    };
    const delOrderQuantity = () => {
        setOrders((prevOrders) => {
            return {
                ...prevOrders, food: prevOrders.food.map((item) => {
                    if (item === order) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                }).filter((item) => item.quantity > 0)
            };
        });
    };

    const modifyFoodOrder = () => {
        setOrders((prevOrders) => {
            if (prevOrders.tmp && Object.keys(prevOrders.tmp).length > 0) {
                return { ...prevOrders, tmp: prevOrders.tmp };
            }
            return { ...prevOrders, tmp: order };
        });
    };

    return (
        <div className='w-full h-10 pl-1 mt-2 flex flex-row justify-center self-center items-center bg-white rounded-lg'>
            <button onClick={() => addOrderQuantity()} className='text-2xl font-semibold text-white w-1/5 h-5/6 mr-1 bg-kitchen-button-darkgreen rounded-l-md'>+</button>
            <button onClick={() => delOrderQuantity()} className='text-2xl font-semibold text-white w-1/5 h-5/6 bg-kitchen-button-red'>-</button>
            <button onClick={() => modifyFoodOrder()} className='text-2xl font-semibold text-kitchen-blue w-3/5 h-5/6 bg-white'>Modifier</button>
        </div>
    )
}

/**
 * Component : Component used by the Content component. Displays the content of the related order
 *
 * @component Order
 * @param {Object} orders current order
 * @param {Boolean} border boolean used to separate orders
 * @param {Object} config state of the current order
 * @param {function} setOrders state function used to update the current order when the food is added
 */

function Order({ order, border, config, setOrders }) {

    const [edit, setEdit] = useState(false)

    const handleOrderEdit = () => {
        if (edit === false)
            setEdit(true);
        else
            setEdit(false);
    };
    return (
        <div className={`w-full h-auto p-2 ${border ? 'border-t border-t-kitchen-yellow' : ''}`}>
            <div onClick={() => handleOrderEdit()}>
                {order.name && order.price && order.quantity && <Food name={order.name} price={order.price} quantity={order.quantity} />}
                {order.details && order.details.map((detail, index) => (
                    <Detail key={index} text={detail} />
                ))}
                {order.mods_ingredients && order.mods_ingredients.map((sup, index) => (
                    <Sup key={index} text={sup} />
                ))}
                {order.note && <Note text={order.note} />}
                {!config.payement && order.stop && <Stop />}
            </div>
            {edit && <Edit order={order} setOrders={setOrders} />}
        </div>
    )
}

export function mergeAllDuplicatesBetweenStops(items) {
    const result = [];
    let currentGroup = [];

    for (const item of items) {
        if (item.stop) {
            if (currentGroup.length > 0) {
                result.push(...mergeAllDuplicatesInGroup(currentGroup));
            }
            result.push(item);
            currentGroup = [];
        } else {
            currentGroup.push(item);
        }
    }

    if (currentGroup.length > 0) {
        result.push(...mergeAllDuplicatesInGroup(currentGroup));
    }

    return result;
}

function mergeAllDuplicatesInGroup(group) {
    const itemMap = new Map();

    for (const item of group) {
        const key = createItemKey(item);

        if (itemMap.has(key)) {
            const existing = itemMap.get(key);
            existing.quantity += item.quantity;
        } else {
            itemMap.set(key, { ...item });
        }
    }

    return Array.from(itemMap.values());
}

function createItemKey(item) {
    return JSON.stringify({
        name: item.name,
        price: item.price,
        details: item.details ? [...item.details].sort() : [],
        mods_ingredients: item.mods_ingredients ? [...item.mods_ingredients].sort() : [],
        category: item.category
    });
}

/**
 * Component : Component used by the CurrentCommand. Displays the content of the current orders
 *
 * @component Content
 * @param {[Object]} orders arrays of current order
 * @param {Boolean} stop boolean used to know if the order has a stop
 * @param {Object} config state of the current order
 * @param {Function} setOrders state function to update the current orders
 */
const Content = ({ orders, stop, config, setOrders }) => (

    <div className={!config.payement ? 'w-full max-h-none sm:max-h-[60vh] flex flex-col' : 'w-full max-h-none sm:max-h-[60vh] flex flex-col border-b-4 border-kitchen-yellow box-border border-solid'}>
        {
            orders.food.map((order, index) => {
                if (index === 0) {
                    return <Order key={index} order={order} border={false} config={config} setOrders={setOrders} />
                }
                if (!config.payement && order.stop === true) {
                    stop = true;
                    return <Order key={index} order={order} border={false} config={config} setOrders={setOrders} />
                }
                if (config.payement && order.stop === true)
                    return null
                if (!config.payement && stop === true) {
                    stop = false;
                    return <Order key={index} order={order} border={false} config={config} setOrders={setOrders} />
                }
                else {
                    stop = false;
                    return <Order key={index} order={order} border={true} config={config} setOrders={setOrders} />
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
        if (orders.food.length < 1)
            return;
        let stopCounter = 1;
        const orderedFood = [];

        const promises = orders.food.map(async (order) => {
            const number = order.quantity;
            let cleanOrder = {
                food: order.food,
                name: order.name,
                details: order.details,
                mods_ingredients: order.mods_ingredients,
                note: order.note,
                price: order.price,
            }
            for (let i = 0; i !== number; i++) {
                if (order.stop) {
                    stopCounter++;
                    return;
                }
                let newObj = Object.keys(cleanOrder).reduce((acc, key) => {
                    if (key !== "name") {
                        if (key === "price") {
                            acc[key] = String(cleanOrder[key])
                        } else {
                            acc[key] = cleanOrder[key];
                        }
                    }
                    return acc;
                }, {});
                newObj['part'] = stopCounter;
                newObj['is_ready'] = false;
                orderedFood.push(newObj);
            }
        });
        await Promise.all(promises);

        let obj = {
            date: new Date().toISOString(),
            channel: orders.channel,
            number: orders.number,
            part: 1,
            food_ordered: orderedFood,
            served: false,
        };

        if (orders.orderId !== null) {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders/${orders.orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify(obj)
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                        throw new Error("Unauthorized access. Please log in.");
                    }
                    setConfig(prevConfig => ({ ...prevConfig, firstSend: false, id_order: orders.orderId }));
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders${orders.tableId ? `?idTable=${orders.tableId}` : ''}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify(obj)
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                        throw new Error("Unauthorized access. Please log in.");
                    }
                    return response.json();
                })
                .then(data => {
                    setConfig(prevConfig => ({ ...prevConfig, firstSend: false, id_order: data.orderId }));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    async function sendOtherOrder() {
        const newOrders = { ...orders, food: [...orders.food] };
        const index = newOrders.food.findIndex(item => item.stop === true);
        if (index !== -1) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/orders/next/${config.id_order}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/", { state: { error: "Unauthorized access. Please log in." } });
                        throw new Error("Unauthorized access. Please log in.");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            newOrders.food = newOrders.food.filter((_, i) => i !== index);
            setOrders(newOrders);
        }
    }

    const addStop = () => {
        if (orders.food.length < 1)
            return;
        const newOrders = { ...orders };
        newOrders.food = [...newOrders.food, { stop: true }];
        setOrders(newOrders);
    }

    if (!config.payement) {
        return (
            <div className='w-full h-current-cmd-footer border-t border-kitchen-yellow flex flex-row gap-px bg-kitchen-yellow'>
                <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={() => (addStop())}>STOP</div>
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
        <div className='h-full w-full bg-kitchen-blue float-right flex flex-col justify-between overflow-hidden'>
            <div className={!config.payement ? 'w-full max-h-[85%] float-right px-2 gap-3 flex flex-col' : 'w-full max-h-[80%] float-right px-2 gap-3 flex flex-col'}>
                <Header orders={orders} />
                <div className='overflow-y-scroll scrollbar-hide'>
                    <Content orders={orders} stop={false} config={config} setOrders={setOrders} setConfig={setConfig} />
                </div>
            </div>
            <Footer config={config} orders={orders} setOrders={setOrders} setConfig={setConfig} price={price} priceLess={priceLess} payList={payList} />
        </div>
    )
}

Header.propTypes = {
    orders: PropTypes.object.isRequired,
}

Food.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
}

Detail.propTypes = {
    text: PropTypes.string.isRequired,
}

Sup.propTypes = {
    text: PropTypes.object.isRequired,
}

Note.propTypes = {
    text: PropTypes.string.isRequired,
}

Edit.propTypes = {
    order: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    border: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
}

Content.propTypes = {
    orders: PropTypes.object.isRequired,
    stop: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
}

Footer.propTypes = {
    orders: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    setOrders: PropTypes.func.isRequired,
    setConfig: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
}

CurrentCommand.propTypes = {
    orders: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
}

export default CurrentCommand;
