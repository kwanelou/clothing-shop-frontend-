import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from './context/Auth';

const Login = () => {
    const {login} = useContext(AuthContext);
     const navigate = useNavigate();
     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  //login api

  const onSubmit =async (data) => {
     //console.log(data)
     const res =await fetch("http://127.0.0.1:8000/api/authenticate",{
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body:JSON.stringify(data)
     });
     const result = await res.json();
     //use toast method to display the errors message very well
     if (result.status === false) {
  toast.error(result.message);
} else {
  const Userinfo = {
    id: result.id,
    token: result.token,
  };

  localStorage.setItem("userinfo", JSON.stringify(Userinfo));
  login(Userinfo);
  toast.success("Login successful");
  navigate("/dashboard");
}
     //console.log(result);
  }
   
  return (
    <>
    <main>
        <div className='container my-5 d-flex justify-content-center'>
            <div className='login-form my-5'>
                <div className='card border-0 shadow '>
                    <div className='card-border p-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className='mb-3'>Login Here</h4>
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input
                                {
                                    ...register('email',{
                                        required: "this field is required",
                                        pattern:{
                                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:"invalid email address"
                                        }

                                    })
                                }
                                 type='text' placeholder='email' className={`form-control ${errors.email && 'is-invalid'}`}/>
                                 {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                 }

                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input
                                 {
                                    ...register('password',{
                                        required: "please password is required"
                                    })
                                }
                                
                                type='password' placeholder='password' className={`form-control ${errors.password && 'is-invalid'}`}/>
                                {
                                    errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                 }

                            </div>
                            <button type='submit' className='btn btn-danger mb-3'>Login</button>
                        </form>

                    </div>

                </div>

            </div>

        </div>
    </main>
    </>
  )
}

export default Login
