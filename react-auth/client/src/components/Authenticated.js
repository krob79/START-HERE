import {useContext} from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from "react-router-dom";

const Authenticated = () => {
  const { authUser } = useContext(UserContext);
  console.log(authUser);
  return (
    <div>
      {authUser === null ?
        <>
        <Navigate to="/signin" replace />
        </>
        :
        <>
          <div className="bounds">
            <div className="grid-100">
              <h1>{authUser.name} is Authenticated</h1>
              <p>Your username is {authUser.username}</p>
              <p>Head over to Settings to change up your preferences</p>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default Authenticated;