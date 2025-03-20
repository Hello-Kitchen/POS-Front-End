import React from "react";
import MenuListLine from "../../Components/MenuListLine/MenuListLine";
import AccountManagement from "./AccountManagement";

function ManagerView(){

    const [managerMenuOpen, setManagerMenuOpen] = React.useState(false);
    const [submenuOpened, setSubmenuOpened] = React.useState('');

    return (
        <div className="flex flex-col h-full">
            {submenuOpened === '' && (
                <div className="flex flex-col h-full">
                    {managerMenuOpen ? (
                        <div className="w-full">
                            <MenuListLine title={"Menu manager"} onClick={() => setManagerMenuOpen(false)} open={true}/>
                            <MenuListLine title={"Gestion du menu"} />
                            <MenuListLine title={"Gestion des utilisateurs"} />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="w-full">
                                <MenuListLine title={"Gestion du compte"} onClick={() => setSubmenuOpened('Gestion du compte')}/>
                            </div>
                            <div className="w-full mt-auto"> 
                                <MenuListLine title={"Menu manager"} separatorBottom={false} separatorTop={true} onClick={() => setManagerMenuOpen(true)}/>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {submenuOpened === 'Gestion du compte' && (
                <AccountManagement onClickBack={() => setSubmenuOpened('')}/>
            )}
        </div>
    );
};

export default ManagerView;