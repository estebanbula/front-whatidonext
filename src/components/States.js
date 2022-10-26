import "../App.css";
import { useState, useEffect } from "react";

export function States() {
  const [states, setStates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/task-states/find-all")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tr>
            <th>State name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
          {states.map((item, key) => {
            return (
              <tr id="rowState">
                <td key={key}>{item.stateDescription}</td>
                <td>
                <p style={ item.active == "S" ? {color: 'green'} : {color: 'red'}}>
                    {item.active == "S" ? "Activo" : "Inactivo"}</p>
                </td>
                <td><EditState item={item}/></td>
                <td><DeleteState stateId={item.taskId}/></td>
              </tr>
            );
          })}
        </table>
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
              stateDescription:
                document.getElementById("stateDescription").value,
              active: "S",
              creationDate: "2022-10-26",
            };
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            };
            fetch("http://localhost:8080/task-states/save", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
              window.location.reload();
          }}
        >
          Guardar
        </button>
      </header>
    </div>
  );
}

function DeleteState({stateId}) {
    return <button onClick={() => {
        const requestOptions = {
            method: 'DELETE'
        }
        fetch("http://localhost:8080/task-states/delete/"+stateId, requestOptions)
        .then(() => console.log("Delete successful"))
        .catch((err) => console.error(err))
    }}>
        Eliminar
    </button>
}

function EditState({item}) {
    return <button onClick={() => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = 'text';
        input.id = 'newStateDescription';
        input.value = item.stateDescription;
        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.id = 'newActiveValue';
        checkbox.checked = item.active == 'S';
        const button = document.createElement("button");
        button.textContent = 'Guardar';
        td.appendChild(input);
        td.appendChild(checkbox);
        td.appendChild(button);
        const container = document.getElementById("rowState");
        container.appendChild(td)
        button.addEventListener('click', () => {
            const data = {
                'stateId': item.stateId,
                'stateDescription': document.getElementById("newStateDescription").value,
                'creationDate': item.creationDate,
                'active': document.getElementById("newActiveValue").checked ? 'S' : 'N',
            }
            debugger
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            fetch("http://localhost:8080/task-states/update", requestOptions)
            .then((response) => response.json())
            .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        window.location.reload();
        })
    }}>Editar</button>
}