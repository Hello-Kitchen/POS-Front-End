import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading({id}) {
  
  const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/0`).then(response => {
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