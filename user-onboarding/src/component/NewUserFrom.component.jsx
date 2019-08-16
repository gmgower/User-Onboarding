import React from 'react'
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewUserFrom = () => {
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
                
            </Form>

        </div>
    )
}

// Create 
const formikHOC = withFormik({
    mapPropsToValues({firstName}) {
        return {
            firstName: firstName || "",
            
        }
    }
})


const NewUserFromWithFormik = formikHOC(NewUserFrom)


export default NewUserFromWithFormik
