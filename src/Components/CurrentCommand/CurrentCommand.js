import { GoArrowRight } from "react-icons/go";

const Header = ({ cmd }) => (
    <div className='w-full h-13 p-2 align-center text-white font-bold text-4xl border-b-4 border-b-kitchen-yellow'>{cmd}</div>
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

const Order = ({ order, border }) => (
    <div className={`w-full h-auto p-2 ${border ? 'border-t-2 border-t-kitchen-yellow' : ''}`}>
        {order.plat && order.price && <Food name={order.plat} price={order.price} />}
        {order.details && order.details.map((detail, index) => (
            <Detail key={index} text={detail} />
        ))}
        {order.sups && order.sups.map((sup, index) => (
            <Sup key={index} text={sup} />
        ))}
        {order.note && <Note text={order.note} />}
        {order.stop && <Stop />}
    </div>
)

const Content = ({ orders, stop }) => (
    <div className='w-full h-95 flex flex-col overflow-auto scrollbar-hide'>
        {
            orders.map((order, index) => {
                if (index === 0) {
                    return <Order key={index} order={order} border={false} />
                }
                if (order.stop === true) {
                    stop = true;
                    return <Order key={index} order={order} border={false} />
                }
                if (stop === true) {
                    stop = false;
                    return <Order key={index} order={order} border={false} />
                }
                else {
                    stop = false;
                    return <Order key={index} order={order} border={true} />
                }
        })}
    </div>
)

function Currentcommand({ orders }) {
    console.log(orders);
    return (
        <div className='h-full w-1/4 bg-kitchen-blue float-right p-2 gap-3 flex flex-col'>
            <Header cmd={`Table ${orders[0].nb}`} />
            <Content orders={orders[1]} stop={false} />
        </div>
    )
}

export default Currentcommand;
