import React from "react";
import MenuListLine from "../../Components/MenuListLine/MenuListLine";
import AccountManagement from "./AccountManagement";
import MenuManagement from "./MenuManagement";
import UserManagement from "./UserManagement";

/**
 * ManagerView component renders a user interface for managing different aspects of the application.
 * It provides a menu system with options to navigate between account management, menu management,
 * and user management functionalities.
 *
 * @component
 * @returns {JSX.Element} The rendered ManagerView component.
 *
 * @example
 * // Usage in a React application
 * import ManagerView from './ManagerView';
 * 
 * function App() {
 *   return <ManagerView />;
 * }
 *
 * @description
 * - The component maintains two pieces of state:
 *   - `managerMenuOpen` (boolean): Tracks whether the manager menu is open or closed.
 *   - `submenuOpened` (string): Tracks which submenu is currently open.
 * - The main menu provides options to open submenus for "Gestion du compte" (Account Management)
 *   and "menuManagement" (Menu Management).
 * - Submenus render their respective components (`AccountManagement` or `MenuManagement`) and
 *   provide a back button to return to the main menu.
 */
function ManagerView(){

    const [managerMenuOpen, setManagerMenuOpen] = React.useState(false);
    const [submenuOpened, setSubmenuOpened] = React.useState('');

    return (
        <div className="flex flex-col h-full w-full">
            {submenuOpened === '' && (
                <div className="flex flex-col h-full">
                    {managerMenuOpen ? (
                        <div className="w-full">
                            <MenuListLine title={"Menu manager"} onClick={() => setManagerMenuOpen(false)} open={true}/>
                            <MenuListLine title={"Gestion du menu"} onClick={() => setSubmenuOpened('Gestion du menu')}/>
                            <MenuListLine title={"Gestion des utilisateurs"} onClick={() => setSubmenuOpened('Gestion des utilisateurs')} />
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
            {submenuOpened === 'Gestion du menu' && (
                <MenuManagement onClickBack={() => setSubmenuOpened('')}/>
            )}
            {submenuOpened === 'Gestion des utilisateurs' && (
                <UserManagement onClickBack={() => setSubmenuOpened('')}/>
            )}
        </div>
    );
};

export default ManagerView;