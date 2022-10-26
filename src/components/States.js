import "../App.css";
import { useState, useEffect } from "react";

export function States() {
  const [states, setStates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/task-states/find-all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {states.map((item, key) => {
            return (
              <div>
                <li key={key}>{item.stateDescription}</li>
                <input
                  type={"checkbox"}
                  checked={item.active == "S" ? true : false}
                />
              </div>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export function SaveState() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crear estado</h1>
        <br />
        <p>Descripción</p>
        <input id="stateDescription"></input>
        <button
          onClick={() => {
            const data = {
                'stateDescription': document.getElementById('stateDescription').value,
                'active': 'S',
                'creationDate': '2022-10-26'
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
            fetch(
              "http://localhost:8080/task-states/save", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }}
        >
          Guardar
        </button>
      </header>
    </div>
  );
}
