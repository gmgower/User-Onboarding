import React from 'react'
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


// * S4a pass in props 
const NewUserFrom = ({errors, touched, values}) => {
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
                placeholder='Email'
                />

                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <Field 
                    component="input"
                    type="text"
                    name="password"
                    placeholder="Password"
                />

                <label>
                    Term of Service
                    <Field 
                    type='checkbox'
                    name='termOfService'
                    checked={values.termOfService}

                    />
                </label>
            <button>Submit!</button>    
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
        firstName: Yup.string().required('Please enter First Name.'),
        lastName: Yup.string().required('Please enter Last Name.'),
        email: Yup.string().email('Please enter email address.')
    }),
    // * S5 Setup axios post is expecting data
})

// * S2a  Create HOF withFormik
const NewUserFromWithFormik = formikHOC(NewUserFrom)


export default NewUserFromWithFormik
