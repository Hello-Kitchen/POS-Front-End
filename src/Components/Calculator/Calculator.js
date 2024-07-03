import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function Screen({ value }) {
    return (
        <div className='w-full bg-[#0a0b0b2d] h-ls mb-2.5 px-2.5 rounded-lg flex items-center justify-end text-white font-bold box-border'>{value}</div>
    )
}

function Button({ className, value, onClick }) {
    return (
        <button className={className} onClick={onClick}>{value}</button>
    )
}

function ButtonBox({ children }) {
    return (
        <div className='w-full h-lb grid grid-cols-4 grid-rows-5 gap-2.5 p-2'>
            {children}
        </div>
    )
}

function Calculator({ setPriceLess, payList, setPayList }) {
    const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });
    const [display, setDisplay] = useState(false);

    const displayCalc = () => {
        let elem = document.getElementsByClassName('select-mod')[0];
        if (elem && calc.res !== "Can't divide with 0") {
            const text = elem.id;
            const newDiv = <div key={payList.length} className='flex flex-row justify-between w-full'><div className='text-white font-normal'>{text}</div><div className='text-white'>{Number(calc.res.toString().split(' ').join('')).toFixed(2).toString()}€</div></div>
            setPayList([...payList, newDiv]);
            setPriceLess(prevPriceLess => (Number(prevPriceLess) - Number(calc.res.toString().split(' ').join(''))));
        }
        setDisplay(false);
    }

    useEffect(() => {
        if (display)
            displayCalc();
    }, [display]);

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "X"
                            ? a * b
                            : a / b;

            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(calc.res)),
                                Number(removeSpaces(calc.num)),
                                calc.sign
                            )
                        ),
                sign: "",
                num: 0,
            })
            setDisplay(true);
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <div className='h-full w-1/2 bg-[#485461] p-5 flex flex-col gap-4 rounded-lg'>
            <Screen value={calc.num ? calc.num : calc.res} ></Screen>
            <ButtonBox>
                {
                    btnValues.flat().map((btn, i) => {
                        return (
                            <Button key={i} className={btn === "=" ? "grid-cols-[span_2] bg-[rgb(243,61,29)] hover:bg-[rgb(228,39,15)] border-none text-2xl text-white font-bold cursor-pointer rounded-lg outline-none" : "border-none bg-kitchen-blue text-2xl text-white font-bold cursor-pointer rounded-lg outline-none hover:bg-kitchen-yellow"} value={btn} onClick={btn === "C" ? resetClickHandler : btn === "+-" ? invertClickHandler : btn === "%" ? percentClickHandler : btn === "=" ? equalsClickHandler : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler : btn === "." ? commaClickHandler : numClickHandler} ></Button>
                        )
                    })
                }
            </ButtonBox>
        </div>
    )
}

Calculator.propTypes = {
    setPriceLess: PropTypes.func.isRequired,
    payList: PropTypes.array.isRequired,
    setPayList: PropTypes.func.isRequired,
}

Screen.propTypes = {
    value: PropTypes.number.isRequired,
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired || PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

ButtonBox.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Calculator;