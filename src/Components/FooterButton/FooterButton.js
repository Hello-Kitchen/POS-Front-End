const ButtonTables = () => (
    <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
        <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="imageTables" patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href="./lampe.jpg" x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill="url(#imageTables)" />
        </svg>
        <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>TABLES</div>
    </div>
);

const ButtonCommandes = () => (
    <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
        <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="imageCommandes" patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href="./book.jpg" x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill="url(#imageCommandes)" />
        </svg>
        <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>COMMANDES</div>
    </div>
);

const ButtonTransactions = () => (
    <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
        <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="imageTransactions" patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href="./ticket.jpg" x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill="url(#imageTransactions)" />
        </svg>
        <div className='text-24px font-bold text-white flex justify-center items-center truncate w-full'>TRANSACTIONS</div>
    </div>
);

const ButtonManager = () => (
    <div className='w-1/4 bg-kitchen-blue p-0.5 flex flex-col justify-center items-center gap-1.5'>
        <svg viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="imageManager" patternUnits="userSpaceOnUse" width="24" height="24">
                    <image href="./sac.jpg" x="0" y="0" width="24" height="24" />
                </pattern>
            </defs>
            <circle r="10" cx="12" cy="12" fill="url(#imageManager)" />
        </svg>
        <div className='text-24px font-bold text-white flex justify-center items-center overflow-hidden w-full'>MANAGER</div>
    </div>
);

const buttonComponents = {
    tables: ButtonTables,
    commandes: ButtonCommandes,
    transactions: ButtonTransactions,
    manager: ButtonManager,
};

export default buttonComponents;
