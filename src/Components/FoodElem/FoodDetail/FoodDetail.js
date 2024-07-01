import { useState } from "react";

function FoodDetail({name, data}) {

    const [fullData, setFullData] = useState(data.map((name => {
        return {
            name: name,
            color: '#4958A6',
            selected: false
        }
    })));

    const handleClick = (name) => {
        setFullData(null)
        setFullData(fullData.map((data => {
            let color = data.color;
            let selected = data.selected;
            if (data.name === name) {
                selected = data.selected ? false : true;
                if (selected) {
                    color = '#FF9900';
                } else {
                    color = '#4958A6';
                }
            }
            return {
                name: data.name,
                color: color,
                selected: selected
            }
        })))
    }

    const choice = fullData.map((elem) =>
        <div key={elem.name} className="w-full" style={{backgroundColor: elem.color}}>
            <button className="h-full w-full" onClick={() => handleClick(elem.name)}>
                <h1 className="text-3xl font-bold text-white">
                    {elem.name}
                </h1>
            </button>
        </div>
    );

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-black">{name}</h1>
            <div className="h-full w-full grid grid-cols-4 content-start">
                {choice}
            </div>
        </div>
    )
}

export default FoodDetail;
