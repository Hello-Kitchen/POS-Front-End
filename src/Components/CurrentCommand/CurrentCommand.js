import React from 'react';

import { GoArrowRight } from "react-icons/go";
import PropTypes from 'prop-types';

const Header = ({ cmd }) => (
    <div className='w-full h-current-cmd-header p-2 items-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow flex'>{cmd}</div>
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
            orders.map((order, index) => {
                if (index === 0) {
                    return <Order key={index} order={order} border={false} config={config} />
                }
                if (!config.payement && order.stop === true) {
                    stop = true;
                    return <Order key={index} order={order} border={false} config={config} />
                }
                if (config.payement && order.stop === true)
                    return
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

function Footer () {
    return (
        <div className='w-full h-current-cmd-footer border-t border-kitchen-yellow flex flex-row gap-px bg-kitchen-yellow'>
            <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer'>STOP</div>
            <div className='w-1/2 h-full bg-kitchen-blue flex items-center justify-center text-white font-bold text-testpx text-center cursor-pointer'>Demander la suite</div>
        </div>
    )
}

function Currentcommand({ orders, config }) {
    return (
        <div className='h-full w-1/4 bg-kitchen-blue float-right gap-3 flex flex-col'>
            <div className='w-full h-full float-right px-2 gap-3 flex flex-col'>
                <Header cmd={`Table ${orders[0].nb}`} />
                <Content orders={orders[1]} stop={false} config={config} />
            </div>
            <Footer />
        </div>
    )
}

Header.propTypes = {
    cmd: PropTypes.string.isRequired
}

Food.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

Detail.propTypes = {
    text: PropTypes.string.isRequired
}

Sup.propTypes = {
    text: PropTypes.string.isRequired
}

Note.propTypes = {
    text: PropTypes.string.isRequired
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    border: PropTypes.bool.isRequired
}

Content.propTypes = {
    orders: PropTypes.array.isRequired,
    stop: PropTypes.bool.isRequired
}

Currentcommand.propTypes = {
    orders: PropTypes.array.isRequired
}

export default Currentcommand;
