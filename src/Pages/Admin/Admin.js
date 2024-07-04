import React from "react";
import LayoutHeader from "../../Components/LayoutHeader/LayoutHeader";
import DBcard from "../../Components/DBcard/DBcard";

const Admin = () => {
    return (
      <div className="bg-kitchen-yellow min-h-screen flex flex-col">
        <div className="w-full">
          <LayoutHeader textLeft="François Dupont" textCenter="Admin" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 p-4">
          <DBcard table="detail" />
          <DBcard table="food" />
          <DBcard table="food_category" />
          <DBcard table="food_ordered" />
          <DBcard table="ingredient" />
          <DBcard table="order" />
          <DBcard table="permission" />
          <DBcard table="restaurant" />
          <DBcard table="user" />
        </div>
      </div>
    );
};

export default Admin;
