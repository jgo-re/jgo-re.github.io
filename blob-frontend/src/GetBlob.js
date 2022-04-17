import { useEffect, useState } from "react";

function GetBlob(key) {
  const [value, setValue] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://blob-api-go.herokuapp.com/b/${key}`)
    .then(response => response.json())
    .then(response => {
      setValue(decodeURI(response.Value));
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => {
        setLoading(false);
      }
    );
    
  } , [key]);

  return { value, loading, error}
}

export default GetBlob;