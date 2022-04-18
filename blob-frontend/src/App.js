import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import GetBlob from "./GetBlob";
import "./App.css";

const API_URL = "https://blob-api-go.herokuapp.com/b/";

export default () => {
  return (
    <Router>
      <h1 className="nice-font">Blob.</h1>
      <Routes>
        <Route path="/" element={<Blob />} />
      </Routes>
    </Router>
  );
};

function Blob() {
  const [searchParams, setSearchParams] = useSearchParams();

  if (searchParams.has("b")) {
    return ViewBlob(searchParams.get("b"));
  }

  return NewBlob();
}

function NewBlob() {
  console.log("New Blob");
  return (
    <>
      <p>
        Save a blob of text for 15 mins by entering it in the box below and
        pressing 'Save Blob'.
      </p>
      <textarea />
      <button onClick={CallCreateBlob}>Save Blob</button>
    </>
  );
}

function CallCreateBlob(e) {
  const btn = e.currentTarget;
  const textarea = document.querySelector("textarea");
  let val = textarea.value;
  if (val == "") return;

  textarea.disabled = true;
  btn.disabled = true;

  let json = `{"Value":"${encodeURI(val)}"}`;

  fetch(API_URL, { method: "POST", body: json })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      window.location = `/?b=${response}`;
    })
    .catch((error) => {
      btn.disabled = false;
      textarea.disabled = false;
      alert("Something went wrong! Please try again later.");
    });
}

function ViewBlob(key) {
  console.log("View Blob");

  var { value, loading, error } = GetBlob(key, API_URL);
  console.log(value);

  if (loading) {
    return <textarea value={value} readOnly={true} />;
  }

  if (error) {
    window.location = `/`;
  }

  return (
    <>
      <textarea value={value} readOnly={false} />
      <div className="wrapper">
        <button onClick={CopyBlob}>Copy Blob</button>
        <button onClick={MakeNewBlob}>Make New Blob</button>
        <button onClick={CopyLink}>Copy Blob Link</button>
      </div>
    </>
  );
}

function CopyBlob() {
  let val = document.querySelector("textarea").value;
  navigator.clipboard.writeText(val);
}

function MakeNewBlob() {
  window.location = `/`;
}

function CopyLink() {
  navigator.clipboard.writeText(window.location.href);
}
