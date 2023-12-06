import React, { useState, useEffect } from "react";
import "./App.css";
import facade from "../../fetchJWT/apiFacade";

function App() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData("hotels", "GET").then((data) => setDataFromServer(data));
  }, [isLoggedIn]);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      setIsLoggedIn
    );
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <header>
      <h1 className="sm:hidden">JWT Demo</h1>
      <h1 className="hidden sm:block">JSON Web Token (JWT) Demo</h1>
      </header>
      <hr className="m-5" />
      <div>
        {isLoggedIn ? (
          <div>
            <p className="m-3 sm:text-xl text-green-500">Du er logget ind som: [ <span className="text-yellow-600">{facade.getUserRoles()}</span> ]</p>
            <div>
              <p className="p-3 text-xl"><strong>Hotels:</strong></p>
              <ul className="list-disc mx-auto">
              {dataFromServer.map((hotel) => (
                <li className="p-1" key={hotel.id}>{hotel.hotelName}</li>
                ))}
                </ul>
            </div>
            <button className="m-5 w-1/2" onClick={() => facade.logout(setIsLoggedIn)}>
              Log out
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl">Log venligst på</p>
            <form onChange={onChange} className="flex flex-col gap-5 p-4">
              <input placeholder="Username" id="username" className="px-4 py-2 rounded-lg"/>
              <input placeholder="Password" id="password" className="px-4 py-2 rounded-lg" />
              <button onClick={performLogin} className="rounded-lg" >Login</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
