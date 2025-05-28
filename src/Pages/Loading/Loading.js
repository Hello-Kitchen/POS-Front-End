import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Fetches the table board configuration from the backend API and updates the state with the processed table data.
 *
 * @function
 * @param {Function} setTableBoard - The state setter function to update the table board.
 * @returns {void}
 *
 * @example
 * loadTableBoard(setTableBoard);
 */

  const checkTablePos = (table1, table2) => {
    let diffTop = Math.abs(table2.top - table1.top);
    let diffLeft = Math.abs(table2.left - table1.left);
    if (diffTop > diffLeft) {
        return true;
    }
    return false;
  }

  const getTables = (tables, w, h) => {
    const { innerWidth: width, innerHeight: height } = window;
  
    const processTable = (table) => {
      const left = width / (w / table.x);
      const top = height / (h / table.y);
      const isRectangle = table.type === "rectangle";
      let tableWidth = isRectangle ? 200 : 100;
      let tableHeight = 100;

      const currentTable = {
        type: table.type,
        id: table.name,
        left,
        top,
        plates: table.plates,
        w: tableWidth,
        h: tableHeight,
        time: table.time,
        fused: []
      };
      if (table.fused && table.fused.length > 0) {
        currentTable.fused = table.fused.map(child => processTable(child, currentTable));
        currentTable.fused.forEach(fusedTable => {
          if (checkTablePos(currentTable, fusedTable)) {
            currentTable.h += fusedTable.h;
          } else {
            currentTable.w += fusedTable.w;
          }
        });
      }
  
      return currentTable;
    };
  
    return tables.map(table => processTable(table));
  };


export function loadTableBoard (setTableBoard) {
  fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/${localStorage.getItem("restaurantID")}/pos_config/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized access. Please log in.");
      }
      return response.json();
    })
    .then((data) => {
      const tables = getTables(data.tables, data.width, data.height);
      setTableBoard(tables);
    })
    .catch((error) => {
      console.log(error);
    });
}


/**
 * Component : Page, Component used to fetch all data related to a restaurant, stocks them in the local storage
 * 
 * @component Loading
 * @param {function} setTableBoard function used to set the table configuration of the restaurant
 */
function Loading({setTableBoard}) {
  
  const navigate = useNavigate();

    //useEffect used to fetch all data of a restaurant based on an id.
    //Will stock it as an object in the local storage under "data"
    //Then redirect to the dashboard once it's loaded.
    useEffect(() => {

      loadTableBoard(setTableBoard);

      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/${localStorage.getItem("restaurantID")}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      .then((response) => {
        if (response.status === 401) {
          navigate("/", {state: {error: "Unauthorized access. Please log in."}});
          throw new Error("Unauthorized access. Please log in.");
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
    }, [setTableBoard, navigate]);


}

  //   //fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/${id}`).then(response => {
  //   //reprendre la ligne du dessous, valeur en brut en dessous

export default Loading;