import React from 'react';

import { GoArrowRight } from "react-icons/go";
import PropTypes from 'prop-types';

const Header = ({ orders }) => (
    <div className='w-full h-current-cmd-header p-2 items-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow flex'>{`Table ${orders[0].nb}`}</div>
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
        <div className="flex text-20px text-white font-light">{text}</div>
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

const Order = ({ order, border, config }) => (
    <div className={`w-full h-auto p-2 ${border ? 'border-t border-t-kitchen-yellow' : ''}`}>
        {order.plat && order.price && <Food name={order.plat} price={order.price} />}
        {order.details && order.details.map((detail, index) => (
            <Detail key={index} text={detail} />
        ))}
        {order.sups && order.sups.map((sup, index) => (
            <Sup key={index} text={sup} />
        ))}
        {order.note && <Note text={order.note} />}
        {!config.payement && order.stop && <Stop />}
    </div>
)

const Content = ({ orders, stop, config }) => (
    <div className='w-full h-current-cmd-content flex flex-col overflow-auto scrollbar-hide'>
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

function Footer({ config, orders, setOrders, setConfig, price, priceLess, payList }) {
    if (!config.payement) {
        return (
            <div className='w-full h-current-cmd-footer border-t border-kitchen-yellow flex flex-row gap-px bg-kitchen-yellow'>
                <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={() => { const newOrders = [...orders]; newOrders[1] = [...newOrders[1], { stop: true }]; console.log(newOrders); setOrders(newOrders); }}>STOP</div>
                {config.firstSend ? <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={() => { setConfig(prevConfig => ({ ...prevConfig, firstSend: false })); }}>Envoyer</div> : <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer' onClick={() => { const newOrders = [...orders]; const index = newOrders[1].findIndex(item => item.stop === true); if (index !== -1) { newOrders[1] = newOrders[1].filter((_, i) => i !== index); setOrders(newOrders); } }}>Demander la suite</div>}
            </div>
        )
    } else {
        return (
            <div className='w-full border-t border-kitchen-yellow flex flex-col gap-px p-2'>
                <div className='flex flex-row justify-between w-full'>
                    <div className='text-white font-normal'>Total</div>
                    <div className='text-white'>{price.toFixed(2).toString()}€</div>
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
        )
    }
}

function Currentcommand({ orders, config, setConfig, setOrders, price, priceLess, payList }) {
    return (
        <div className='h-full w-1/4 bg-kitchen-blue float-right flex flex-col'>
            <div className='w-full h-85 float-right px-2 gap-3 flex flex-col'>
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

Currentcommand.propTypes = {
    orders: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    setConfig: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
}

export default Currentcommand;
