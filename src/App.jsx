import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import "./custom.css";

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const {
        data: { data },
      } = await axios.get("https://reqres.in/api/users");

      setUsers(data);
    };

    loadUsers();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
  };

  const onChangeHandler = ({ target: { value } }) => {
    let matches = [];

    if (value.length)
      matches = users.filter((user) => {
        const regex = new RegExp(`${value}`, "gi");
        return user.email.match(regex);
      });

    setSuggestions(matches);
    setText(value);
  };

  return (
    <div className="container">
      <input
        className="col-md-12"
        style={{ marginTop: 10 }}
        type="text"
        onChange={onChangeHandler}
        value={text}
        onBlur={() => setTimeout(() => setSuggestions([]), 100)}
      />
      {suggestions &&
        suggestions.map(({ id, email }) => (
          <div
            key={id}
            className="suggestion col-md-12 justify-content-md-center"
            onClick={() => onSuggestHandler(email)}
          >
            {email}
          </div>
        ))}
    </div>
  );
}

export default App;
