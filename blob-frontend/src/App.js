import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useSearchParams } from "react-router-dom";

import GetBlob from './GetBlob'
//import CreateBlob from './CreateBlob'

import './App.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blob/>}/>
      </Routes>
    </Router>
  );
}

export default App;

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
      <textarea defaultValue="Put your blob of text in here ☺."/>
      <button onClick={CallCreateBlob}>Create Blob</button>
      </>
      
  );
}

function CallCreateBlob(){
  let val = document.querySelector('textarea').value;
  let json = `{"Value":"${val}"}`;
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

// function GetBlob(){
//   fetch(`https://blob-api-go.herokuapp.com/b/${key}`)
//     .then(response => response.json())
//     .then(response => {
//       setValue(response.Value);
//     })
//     .catch(error => {
//       setError(error);
//     })
//     .finally(() => {
//         setLoading(false);
//       }
//     );
// }