import React, { useState, useEffect, useCallback } from 'react';
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
        <button id={value} className={className} onClick={onClick}>{value}</button>
    )
}

function ButtonBox({ children }) {
    return (
        <div className='w-full h-lb grid grid-cols-4 grid-rows-5 gap-2.5 p-2'>
            {children}
        </div>
    )
}

/**
 * Component : Component displaying a calculator, handling all transactions and calculations of when paying the current POS order
 * 
 * @component Calculator
 * @param {Number} priceLess full price of the current order
 * @param {Function} setPriceLess state function to update full price of the current order
 * @param {[Number]} payList List of all current transactions
 * @param {Function} setPayList state function to update the payList
 * @param {Array} payDetail List of all current payed orders
 * @param {Function} setPayDetail state function to update the payDetail
 */
function Calculator({ priceLess, setPriceLess, payList, setPayList, payDetail, setPayDetail }) {
    const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });
    const [display, setDisplay] = useState(false);

    //displays the calculator, with the current price
    const displayCalc = useCallback(() => {
        let elem = document.getElementsByClassName('select-mod')[0];
        if (elem && calc.res !== "Erreur" && priceLess > 0) {
            const text = elem.id;
            if (text === "Titres-Restaurant") {
                setPayDetail([...payDetail, {value: Number(calc.res.toString().split(' ').join('')).toString(), type: "tr"}]);
            } else if (text === "Especes") {
                setPayDetail([...payDetail, {value: Number(calc.res.toString().split(' ').join('')).toString(), type: "cash"}]);
            } else {
                setPayDetail([...payDetail, {value: Number(calc.res.toString().split(' ').join('')).toString(), type: "cb"}]);
            }
            const newDiv = <div key={payList.length} className='flex flex-row justify-between w-full'><div className='text-white font-normal text-20px'>{text}</div><div className='text-white font-normal text-20px'>{Number(calc.res.toString().split(' ').join('')).toFixed(2).toString()}€</div></div>
            setPayList([...payList, newDiv]);
            setPriceLess(prevPriceLess => (Number(prevPriceLess) - Number(calc.res.toString().split(' ').join(''))));
        }
        setDisplay(false);
    }, [calc.res, payList, setPayList, setPriceLess, priceLess, payDetail, setPayDetail]);

    useEffect(() => {
        if (display)
            displayCalc();
    }, [display, displayCalc]);

    //handles all numeric user inputs
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

    //handles all comma user inputs
    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    //handles all calculation signs user inputs
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

    //handles the calculation
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
                        ? "Erreur"
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
        } if (calc.num) {
            setCalc({...calc, res: calc.num, sign: "", num: 0});
        }
        setDisplay(true);
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
                            <Button key={i} className={btn === "=" ? "col-span-2 bg-[rgb(243,61,29)] hover:bg-[rgb(228,39,15)] border-none text-2xl text-white font-bold cursor-pointer rounded-lg outline-none" : "border-none bg-kitchen-blue text-2xl text-white font-bold cursor-pointer rounded-lg outline-none hover:bg-kitchen-yellow"} value={btn} onClick={btn === "C" ? resetClickHandler : btn === "+-" ? invertClickHandler : btn === "%" ? percentClickHandler : btn === "=" ? equalsClickHandler : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler : btn === "." ? commaClickHandler : numClickHandler} ></Button>
                        )
                    })
                }
            </ButtonBox>
        </div>
    )
}

Calculator.propTypes = {
    setPriceLess: PropTypes.func.isRequired,
    priceLess: PropTypes.number.isRequired,
    payList: PropTypes.array.isRequired,
    setPayList: PropTypes.func.isRequired,
    payDetail: PropTypes.array.isRequired,
    setPayDetail: PropTypes.func.isRequired,
}

Screen.propTypes = {
    value: PropTypes.any.isRequired,
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
}

ButtonBox.propTypes = {
    children: PropTypes.array.isRequired,
}

export default Calculator;