import { useEffect, useState } from "react";

function GetBlob(key, url) {
  const [value, setValue] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}${key}`)
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
    
  } , [key, url]);

  return { value, loading, error}
}

export default GetBlob;