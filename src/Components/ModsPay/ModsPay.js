function Button({ button }) {
    return (
        <div className='flex w-full h-1/4 bg-kitchen-yellow rounded-3xl text-kitchen-blue justify-center items-center font-bold shadow-md text-2xl font-bold'>{button}</div>
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