import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Tableau de Bord Persistant</h1>
      <Outlet />
    </>
  )
};

export default Layout;
