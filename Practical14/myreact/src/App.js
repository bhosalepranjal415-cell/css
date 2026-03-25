import React, { useState } from "react";

function App() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [submittedData, setSubmittedData] = useState(null);

const handleSubmit = (e) => {
e.preventDefault();

setSubmittedData({
name: name,
email: email,
password: password
});

// Clear inputs after submission
setName("");
setEmail("");
setPassword("");
};

return (
<div style={{ padding: "30px" }}>
<h2>React Form Handling</h2>

<form onSubmit={handleSubmit}>
<label>Name:</label><br />
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
<br /><br />

<label>Email:</label><br />
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<br /><br />

<label>Password:</label><br />
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<br /><br />

<button type="submit">Submit</button>
</form>

<hr />

{submittedData && (
<div>
<h3>Submitted Data</h3>
<p>Name: {submittedData.name}</p>
<p>Email: {submittedData.email}</p>
<p>Password: {submittedData.password}</p>
</div>
)}
</div>
);
}

export default App;