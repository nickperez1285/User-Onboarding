import React, { useState } from 'react';
import './App.css';
import FormikForm from "./Form"


const App=() =>  {

    const [user, setUser ] = useState([{key:1, name:"me" ,email: 'asdasd@asdas.com', password: 'password', terms: true}])
      
      const addUser = person => {
        const newUser=  {
          key: Date.now(),
          name: person.name,
          email: person.email,
          password: person.password,
          terms: person.terms
        }; 
        setUser([...user, newUser]);
      
      };

return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
     <FormikForm /> 

     <ul>
          {user.map(p => { 

              return <li> {p.name} <br/>  {p.email} <br/>  {p.password} <br/> {p.terms}</li>
          })}
        </ul>
    </div>
  )

}

export default App;
