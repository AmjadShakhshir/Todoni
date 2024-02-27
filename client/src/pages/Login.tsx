import { ChangeEvent, useEffect, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { login } from "../redux/Reducers/usersReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login({
            email: data.email,
            password: data.password
        }))
        setRedirect(true)
    }

    useEffect(() => {
        if (redirect) {
            navigate('/')
        }
    }, [redirect, navigate]);
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleChange}
                />
                
                <input
                    name="password"
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login