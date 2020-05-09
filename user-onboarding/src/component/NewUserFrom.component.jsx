import React, {useState, useEffect} from 'react'
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// * S6d add status has props
// * S4a pass in props 
const NewUserFrom = ({errors, touched, values, status}) => {

    // * S6 add State
    const [users, setUsers] = useState([])
    console.log(users)

    // * S6c create useEffect from setStatus, if change, useEffect is going to be called
    useEffect(() => {
        // * S6e check if status is there
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    // * S1 Create From, Field
    return (
        <div>
            <h1>New User</h1>
            <Form>
                <Field 
                component='input'
                type='text'
                name='firstName'
                placeholder='First Name'
                />
                
                {/* S4b if touched has been touched and if errorrs render out message */}
                {touched.firstName && errors.firstName && (
                    <p>{errors.firstName}</p>
                )}

                <Field 
                component='input'
                type='text'
                name='lastName'
                placeholder='Last Name'
                />

                {touched.lastName && errors.lastName && (
                    <p>{errors.lastName}</p>
                )}

                <Field 
                component='input'
                type='text'
                name='email'
                placeholder='e.g. email@mail.com'
                />

                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <Field 
                    component="input"
                    type="text"
                    name="password"
                    placeholder="Password must be 8 characters or longer"
                />

                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}

                <label>
                    Term of Service
                    <Field 
                    type='checkbox'
                    name='termOfService'
                    checked={values.termOfService}
                    />
                
               {touched.termOfService && errors.termOfService && (
                <p>{errors.termOfService}</p>
               )}

                </label>
            <button>Submit!</button>   
            
                 {/* S6f ooutput value on page */}
                 {users.map(user => (
                     <div key={user.id}>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>                    
                    </div>
                ))}
                </Form>
        </div>
    )
}

// * S2 Create HOF withFormik
const formikHOC = withFormik({

    // * S3 Setup props to values state through Formik
    mapPropsToValues({firstName, lastName, email, password, termOfService}) {
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            password: password || "",
            termOfService: termOfService || false
        }
    },
    // * S4 Yup schema
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Names must be between 1 and 20 characters.')
            .max(20, 'Names must be between 1 and 20 characters.')
            .required('Please enter First Name.'),
        lastName: Yup.string()
            .min(2, 'Names must be between 1 and 20 characters.')
            .max(20, 'Names must be between 1 and 20 characters.')
            .required('Please enter Last Name.'),
        email: Yup.string()
            .email('Email not valid.')
            .required('Please include an email address.'),
        password: Yup.string()
            .min(8, "Password must be 8 character or longer")
            .required('Please include your password.'),
        termOfService: Yup.boolean()
            .oneOf([true], 'Must Accept Terms'),
    }),
    // * S6a pass an object destruct {setStatus}
    // * S5 Setup axios post is expecting data
    handleSubmit(values, { setStatus, resetForm })  {
        axios.post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("handleSubmit: then: res: ", res) 
                setStatus(res.data);
                resetForm()
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
    }
})

// * S2a  Create HOC withFormik
const NewUserFromWithFormik = formikHOC(NewUserFrom)


export default NewUserFromWithFormik

// export default withFormik({})(AnimalForm)
