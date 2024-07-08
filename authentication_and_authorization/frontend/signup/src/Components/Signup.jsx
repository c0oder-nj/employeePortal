import React, { useState } from 'react'

const Signup = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })


    const setUserMethod = (e) => {
        let name = e.target.name;
        let value = e.target.value;


        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(JSON.stringify(user))
        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify(user)
            }).then((response)=>{
                return response.json();
            });
            // console.log(response);
            console.log(document.cookie);
            document.cookie= 'accessToken='+response.accessToken;
        } catch (error) {
            
        }
    }

  return (
    <div className="container w-25 p-5 mt-5 border border-primary-subtle rounded bg-light">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" value={user.username} onChange={setUserMethod}/>
                <div id="username" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={setUserMethod}/>
            </div>
            {/* <div classNameName="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Signup
