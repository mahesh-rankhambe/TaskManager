import { useState } from 'react';
import './SignUp.css';
import SignIn from './SignIn.jsx'

const SignUp = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const[isSignedUp,setIsSignedUp]=useState(false);
    const handleSignUp =async (e)=>{
        e.preventDefault();

        const userData={
            name: name,
            email: email,
            password: password
        }
        const response =await fetch("http://localhost:8080/save",
           { method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(userData)
           });
           if(response.ok)
           {
            alert("SignUp Successfull")
            setIsSignedUp(true)
           }
           else{
            alert("Signup fail")
           }
          
    }
     if (isSignedUp)
           {
            return(
                <SignIn />
            )
           }
  return (
   <div className="signup-container">
  <form className="signup-form" onSubmit={handleSignUp}>
    <h2>Create Account</h2>

    <div className="form-group">
      <input
        type="text"
        value={name}
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <input
        type="email"
        value={email}
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group">
      <input
        type="password"
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button type="submit" className="signup-btn">
      Sign Up
    </button>
  </form>
</div>

  )
}

export default SignUp