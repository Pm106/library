import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and Email are required!");
      return;
    }

    if (form.id === null) {
      const newItem = { ...form, id: Date.now() };
      setItems([...items, newItem]);
    } else {
      setItems(items.map((item) => (item.id === form.id ? form : item)));
    }

    setForm({ id: null, name: "", email: "", phone: "", age: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>LIBRARY SUBSCRIPTION</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name*"
        />
        <br />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email*"
        />
        <br />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <br />
        <input
          name="age"
          type="number"
          min="0"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <br />
        <button type="submit">{form.id === null ? "Add" : "Update"}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> —-Email {item.email}{" "} Phone 
            {item.phone && ` — ${item.phone}`} Age{item.age && ` — ${item.age} years `}
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
