import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Homepage from "./pages/Homepage";
import PrimarySearchAppBar from "./Components/Header";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // or another theme
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

function App() {
  return (
    <>
      <div>
        <PrimarySearchAppBar />
        <Homepage />
      </div>
    </>
  );
}

export default App;