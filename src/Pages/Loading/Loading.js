import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        const { innerWidth: width, innerHeight: height } = window;
        const tables = data.tables.map((table) => {
          return {
            type: table.type,
            id: table.name,
            left: width / (data.width / table.x),
            top: height / (data.height / table.y),
            plates: table.plates,
            w: table.type === "rectangle" ? 200 : 100,
            h: 100,
            time: table.time,
            orderId: table.orderId ? table.orderId : null,
            fused: false
          }
        })
        setTableBoard(tables);
      })
      .catch((error) => {
        console.log(error);
      });
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