import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import GetBlob from './GetBlob'
import './App.css';

export default () => {
  return (
    <Router>
      <h1 className="nice-font">Blob.</h1>
      <Routes>
        <Route path="/" element={<Blob/>}/>
      </Routes>
    </Router>
  );
}

function Blob(){
  const [searchParams, setSearchParams] = useSearchParams();

  if (searchParams.has('b')) {
    return ViewBlob(searchParams.get('b'));
  }

  return NewBlob();
}

function NewBlob(){
  console.log("New Blob");
  return (
      <>
      <p>Save a blob of text for 15 mins by entering it in the box below and pressing save.</p>
      <textarea/>
      <button onClick={CallCreateBlob}>Create Blob</button>
      </>
  );
}

function CallCreateBlob(){
  let val = document.querySelector('textarea').value;
  let json = `{"Value":"${encodeURI(val)}"}`;
  fetch('https://blob-api-go.herokuapp.com/b/', { method: 'POST', body: json})
  .then(response => response.json())
  .then(response => {
    console.log(response);
    window.location = `/?b=${response}`;
  });
}

function ViewBlob(key){
  console.log("View Blob");

  var {value, loading, error} = GetBlob(key);
  console.log(value);

  if (loading){
    return <textarea value={value} readOnly={true}/>
  } 

  if (error) {
    window.location = `/`;
  } 

  return <textarea value={value} readOnly={false}/>;
}