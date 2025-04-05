import { Alert, Snackbar, Tab, Tabs } from "@mui/material";
import React from "react";
import ManagerHeader from "./ManagerHeader";
import FoodManagement from "../../Components/Manager/MenuManagement/FoodManagement";
import DetailManagement from "../../Components/Manager/MenuManagement/DetailManagement";
import IngredientManagement from "../../Components/Manager/MenuManagement/IngredientManagement";
import FoodCategoryManagement from "../../Components/Manager/MenuManagement/FoodCategoryManagement";
import PropTypes from 'prop-types';

/**
 * MenuManagement component for managing menu-related functionalities in the application.
 * 
 * @param {Object} props - The props object.
 * @param {Function} props.onClickBack - Callback function triggered when the back button is clicked.
 * 
 * @returns {JSX.Element} The rendered MenuManagement component.
 * 
 * @component
 * 
 * @example
 * // Example usage:
 * <MenuManagement onClickBack={() => console.log('Back button clicked')} />
 * 
 * @description
 * This component provides a tab-based interface for managing different aspects of a menu:
 * - "Plats" (Dishes)
 * - "Details"
 * - "Ingrédients" (Ingredients)
 * - "Catégories" (Categories)
 * 
 * It also includes a Snackbar for displaying alerts based on user actions.
 */
function MenuManagement({onClickBack}) {
  const [alert, setAlert] = React.useState({type: '', message: ''});
  const [selectedTab, setSelectedTab] = React.useState(1);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col w-full h-1/6">
          <ManagerHeader title="Gestion du menu" onClick={onClickBack}/>
          {/* <div className="flex flex-col"> */}
            <Tabs onChange={(event, newValue) => setSelectedTab(newValue)} value={selectedTab}>
              <Tab label="Plats" value={1}/>
              <Tab label="Details" value={2}/>
              <Tab label="Ingrédients" value={3}/>
              <Tab label="Catégories" value={4}/>
            </Tabs>
            {/* </div> */}
        </div>
          <div className="h-5/6 overflow-hidden">
            {selectedTab === 1 && <FoodManagement setAlert={setAlert}/>}
            {selectedTab === 2 && <DetailManagement setAlert={setAlert}/>}
            {selectedTab === 3 && <IngredientManagement setAlert={setAlert}/>}
            {selectedTab === 4 && <FoodCategoryManagement setAlert={setAlert}/>}
          </div>
        </div>
        <Snackbar
          open={!!alert.type}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={() => setAlert({type: '', message: ''})}>
            <div className="flex align-center">
              <Alert
                severity={alert.type}
                onClose={() => {
                  setAlert({type: '', message: ''});
                }}
                open={alert.type}>
                  <p className="text-l">{alert.message}</p>
              </Alert>
            </div>
        </Snackbar>
    </div>
    
  );
}

MenuManagement.propTypes = {
  onClickBack: PropTypes.func.isRequired,
};

export default MenuManagement;
