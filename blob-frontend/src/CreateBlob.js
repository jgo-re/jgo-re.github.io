import React, { useEffect, useState } from "react";

function CreateBlob(key) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setLoading(true);
    // fetch(`http://localhost:8000/b/${key}`)
    // .then(response => response.json())
    // .then(response => {
    //   setValue(response.Value);
    // })
    // .catch(error => {
    //   setError(error);
    // })
    // .finally(() => {
    //     setLoading(false);
    //   }
    // );
  } , [key]);

  return { value, loading, error}
}

export default CreateBlob;