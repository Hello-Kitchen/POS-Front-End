import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Component : Page, Component used to fetch all data related to a restaurant, stocks them in the local storage
 * 
 * @component Loading
 * @param {Number} id id of a restaurant
 */
function Loading({id}) {
  
  const navigate = useNavigate();

    //useEffect used to fetch all data of a restaurant based on an id.
    //Will stock it as an object in the local storage under "data"
    //Then redirect to the dashboard once it's loaded.
    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/1`).then(response => {
          response.json().then(data => {
            localStorage.setItem("data", JSON.stringify(data));
          }).then(() => {
            navigate("/dashboard");
          });
        }).catch(error => {
          console.log(error);
        });
    }, [id, navigate]);


}

  //   //fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/${id}`).then(response => {
  //   //reprendre la ligne du dessous, valeur en brut en dessous

export default Loading;