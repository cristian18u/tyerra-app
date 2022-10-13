import axios from "axios"
import { useState } from "react"

function Login({ setSession }) {

    const [input, setInput] = useState({ username: "", password: "" })

    async function login(input) {
        console.log(input)
        const res = await axios.post("http://localhost:3000/auth/login", input)
        console.log(res.data)
        setSession(res.data?.access_token)
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        login(input);
        setInput({
            username: "",
            password: "",
        });
    }

    return (
        <div>
            <form className="formulation1" onSubmit={handleSubmit}>
                <label>username</label>
                <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <label>password</label>
                <input
                    type="text"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    name="login"
                />
            </form>
        </div>
    )
}

export default Login;