import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const { accentColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  // State
  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value
    }

    const fetchOptions = {
      method:"POST",
      headers:{
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    }

    try{
      const response = await fetch("http://localhost:5000/api/users", fetchOptions);
      console.log(response);

      if(response.status == 201){
        console.log(`SUCCESS FOR ${user.name}!`);
        await actions.signIn(user);
        navigate("/authenticated");
      }else if(response.status == 400){
        const data = await response.json();
        setErrors(data.errors);
      }

    }catch(error){
      navigate("/error");
    }

  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div>
          ) : null }
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              ref={name}
              placeholder="Name" />
            <input
              id="username"
              name="username"
              type="text"
              ref={username}
              placeholder="User Name" />
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="Password" />
            <div className="pad-bottom">
              <button className="button" type="submit" style={{ background: accentColor }}>Sign Up</button>
              <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Don't have a user account? <Link style={{ color: accentColor }} to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;