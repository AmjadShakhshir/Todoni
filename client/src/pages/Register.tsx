import { ChangeEvent, useState } from "react"
import useAppDispatch from "../hooks/useAppDispatch";
import { register } from "../redux/Reducers/usersReducer";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState({
        name: '',
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
        console.log(data)
        dispatch(register({
            name: data.name,
            email: data.email,
            password: data.password
        }))

        setRedirect(true)
    }

    if (redirect) {
        navigate('/login')
    }
    return (
        <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <input
                        name="name"
                        type="name"
                        className="form-control"
                        id="floatingInput"
                        placeholder="John Dilma"
                        onChange={handleChange}
                    />

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
                    
                    <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                </form>
            </main>
    )
}

export default Register