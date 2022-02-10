import React from 'react';
import './App.css';

function App() {

  React.useEffect(() => {
    //Initialize values
  }, []);

  function getTemperatures() {
    //Refresh
  }

  const [temperature, updateTemperature] = React.useState(0);
  const [recentTemps, updateRecentTemps] = React.useState([])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Lab 4.
        </p>
        <span>Current temperature: {temperature} degrees</span>
        <button onClick={getTemperatures}>Refresh</button>
        <br />
        <span>Recent temperatures</span>
        <ol>
          {/* {recentTemps.map(temp => {`<li>${temp}</li>`})} */}
        </ol>
      </header>
    </div>
  );
}

export default App;
