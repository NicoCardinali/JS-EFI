import { Formik, Field, ErrorMessage } from "formik"
import { createRoutesFromChildren } from "react-router-dom";
import * as Yup from 'yup';

const CreateUser = () =>{


    const RegisterUser = async (values) =>{

        const token = localStorage.getItem("token");

        const bodyRegisterUser = {
            username:values.username,
            password:values.password
        }

        console.log("bodyRegisterUser", bodyRegisterUser)
        const response = await fetch('http://127.0.0.1:5000/users',{
            method:'POST',
            body: JSON.stringify(bodyRegisterUser),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        
            
        })

        console.log(response)

}

    const ValidationSchema = Yup.object().shape({
        password:Yup.string()
        .required("Campo requerido password")
        .min(5, "Esta contraseña debe ser mayor a 5 caracteres"),
        username:Yup.string()
        .min(5,"minimo 5 caracteres")
        .max(25,"maximo 25 caracteres")
        .required('Campo requerido usuario')
    })

    

    return(

        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}   
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                /* and other goodies */
            }) => (
                console.log(values),
                <form>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button type="button" onClick={() => RegisterUser(values)} disabled={values.username === '' || values.password === '' || !isValid}>
                        Crear Usuario
                    </button>
                </form>
            )}
        </Formik>

    )

}
export default CreateUser