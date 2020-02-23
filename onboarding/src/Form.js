import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Forms = ({ values, errors, touched, status }) =>{
const [users, setUsers] = useState([]);

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

  
    return (
      <div className="loginForm">
       
     	<Form>
			<div>
			   {touched.username && errors.username && <p>{errors.username}</p>}
			<Field type="text" placeholder= 'name' name ="username"/>	<br/>
			</div>
			<div>
			   {touched.email && errors.email && <p>{errors.email}</p>}
			<Field type="email" placeholder = 'email' name ="email"/>	<br/>
			</div>
			<div>
			   {touched.password && errors.password && <p>{errors.password}</p>}
			<Field type="password" placeholder = 'password' name ="password"/> <br/>
			</div>
			<label>
			   {touched.terms && errors.terms && <p>{errors.terms}</p>}
			<Field type="checkbox" name ="terms" checked={values.terms}/>
			Accept Terms
			</label><br/>
		
			<button type = "submit"> Add user </button> 
		</Form>
		  <ul>
          {users.map(p => { 

              return <li> {p.username} <br/>  {p.email} <br/>  {p.password} <br/> {p.key}</li>
          })}
        </ul>

      </div>
    );



}
const FormikForm = withFormik({

  mapPropsToValues({key, username, email, password, terms }) {
    return {
    	key: Date.now(),
      username: username || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };

  },

  //   //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
      username: Yup.string()
      .min(2, "name not valid")
      .required("name is required"),
      terms: Yup.boolean()
        .oneOf([true], "Must accept terms")
        .required('terms required'),
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }

  })(Forms);

export default FormikForm