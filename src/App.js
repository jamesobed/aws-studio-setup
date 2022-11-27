import "./App.css";
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from "./models";

function App() {
  async function getTodos() {
    const models = await DataStore.query(Todo);
    console.log(models);
  }
  async function addTodo() {
    await DataStore.save(
      new Todo({
        name: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet",
      })
    );
  }
  async function updateTodo() {
    const current = await DataStore.query(
      Todo,
      "5e926d67-fdcc-42b8-9fb5-a8dce5f2ae17"
    );
    await DataStore.save(
      Todo.copyOf(current, (todo) => {
        todo.name = "Update tested";
      })
    );
  }
  async function deleteTodo() {
    const modelToDelete = await DataStore.query(
      Todo,
      "5e926d67-fdcc-42b8-9fb5-a8dce5f2ae17"
    );
    DataStore.delete(modelToDelete);
  }

  return (
    <div className="App">
      <h1>Amplify DataStore</h1>
      <button onClick={addTodo}>create todo</button>
      <br />
      <br />
      <button onClick={getTodos}>show todo</button>
      <br />
      <br />
      <button onClick={updateTodo}>update todo</button>
      <br />
      <br />
      <button onClick={deleteTodo}>delete todo</button>
    </div>
  );
}

export default App;
