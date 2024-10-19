import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading({id}) {
  
  const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/${process.env.REACT_APP_NBR_RESTAURANT}`, {headers: {
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
    }, [id, navigate]);


}

  //   //fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/pos/${id}`).then(response => {
  //   //reprendre la ligne du dessous, valeur en brut en dessous

export default Loading;