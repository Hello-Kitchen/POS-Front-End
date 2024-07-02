function handleClick (event) {
    let elements = document.getElementsByClassName("mods-pay");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("border-2")
        elements[i].classList.remove("border-kitchen-blue")
        elements[i].classList.remove("select-mod")
    }
    event.currentTarget.classList.add('border-2')
    event.currentTarget.classList.add('border-kitchen-blue')
    event.currentTarget.classList.add('select-mod')
}

function Button({ button }) {
    return (
        <div className='flex w-full h-1/4 bg-kitchen-yellow rounded-3xl text-kitchen-blue justify-center items-center font-bold shadow-md text-2xl font-bold cursor-pointer mods-pay' onClick={handleClick} >{button}</div>
    )
}

function ModsPay({ buttons }) {
    return (
        <div className='h-full w-1/2 p-2 flex flex-col gap-3'>
            {
                buttons.map((button, i) => {
                    return (
                        <Button key={i} button={button} ></Button>
                    )
                })
            }
        </div>
    )
}

export default ModsPay;