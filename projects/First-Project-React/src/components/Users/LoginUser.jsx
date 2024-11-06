import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";

const LoginUser = () => {
    const [message, setMessage] = useState(""); // Estado para el mensaje de respuesta

    const onLoginUser = async (values) => {
        try {
            const bodyLoginUser = btoa(`${values.username}:${values.password}`);

            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${bodyLoginUser}`
                }
            });

            const data = await response.json(); // Convertimos la respuesta a JSON
            console.log(data)

            if (response.ok && data.Token) {
                // Inicio de sesión exitoso
                localStorage.setItem('token', data.Token);
                setMessage("Inicio de sesión exitoso!");
            } else {
                // Mostrar solo el mensaje del backend
                localStorage.clear() //borra el token si lo hubiese
                setMessage(data.Mensaje);
            }
        } catch (error) {
            // Capturamos cualquier otro error de red u otro tipo
            setMessage("Error en la conexión al servidor.");
        }
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Campo requerido password")
            .min(5, "Esta contraseña debe ser mayor a 5 caracteres"),
        username: Yup.string()
            .min(5, "minimo 5 caracteres")
            .max(25, "maximo 25 caracteres")
            .required('Campo requerido usuario')
    });

    return (
        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => onLoginUser(values)}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && <div>{errors.username}</div>}

                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && <div>{errors.password}</div>}

                    <button type="submit" disabled={!isValid || !values.username || !values.password}>
                        Iniciar Sesión
                    </button>

                    {/* Mensaje del backend */}
                    {message && <div>{message}</div>}
                </form>
            )}
        </Formik>
    );
};

export default LoginUser;
