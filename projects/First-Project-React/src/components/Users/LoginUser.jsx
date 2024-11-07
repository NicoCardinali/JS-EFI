import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";

const LoginUser = ({ setIsUserLoggedIn, setMessage }) => {
    const [message, setInternalMessage] = useState(""); // Estado para el mensaje de respuesta

    const onLoginUser = async (values) => {
        try {
            // Verificar si ya hay una sesión activa
            if (localStorage.getItem('isUserLoggedIn') === 'true') {
                setMessage("Ya hay una sesión activa. Primero debes cerrar la sesión anterior.");
                return; // Salir de la función si hay sesión activa
            }

            const bodyLoginUser = btoa(`${values.username}:${values.password}`);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${bodyLoginUser}`,
                }
            });

            const data = await response.json();

            if (response.ok && data.Token) {
                // Guardar el token y marcar al usuario como logueado
                localStorage.setItem('token', data.Token);
                localStorage.setItem('isUserLoggedIn', 'true');
                setIsUserLoggedIn(true);
                setInternalMessage("Inicio de sesión exitoso!"); // Mensaje de éxito
                setMessage(""); // Limpiar cualquier mensaje de error
            } else {
                setIsUserLoggedIn(false);
                localStorage.setItem('isUserLoggedIn', 'false');
                setInternalMessage(data.Mensaje); // Mostrar mensaje del servidor
                setMessage(""); // Limpiar mensaje si el login falla
            }
        } catch (error) {
            setInternalMessage("Error en la conexión al servidor.");
            setMessage(""); // Limpiar mensaje si hay error en la conexión
        }
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Campo requerido password")
            .min(5, "Esta contraseña debe ser mayor a 5 caracteres"),
        username: Yup.string()
            .min(5, "mínimo 5 caracteres")
            .max(25, "máximo 25 caracteres")
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

                    {/* Mostrar mensaje de respuesta */}
                    {message && <div>{message}</div>}
                </form>
            )}
        </Formik>
    );
};

export default LoginUser;
