import { useState } from "react";
import DashBoard from "./DashBoard";
import "./SignIn.css";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ read login status from localStorage
  const [isSignedin, setIsSignedin] = useState(
    localStorage.getItem("user") ? true : false
  );

  const handleSignIn = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (response.ok) {
        const user = await response.json();

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login Successful");
        setIsSignedin(true);
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  // ✅ Stay on dashboard after refresh
  if (isSignedin) {
    return <DashBoard />;
  }

  return (
    <div className="signin-wrapper">
      <form className="signin-box" onSubmit={handleSignIn}>
        <h1>Welcome Back</h1>
        <p className="subtitle">Please sign in to continue</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
