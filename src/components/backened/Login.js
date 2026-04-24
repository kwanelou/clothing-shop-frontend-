import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from "../backened/context/Auth"; 

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      // Error handling
      if (!result.status) {
        toast.error(result.message);
        return;
      }

      // User structure
      const Userinfo = {
        user: result.user,
        token: result.token
      };

      localStorage.setItem("userinfo", JSON.stringify(Userinfo));
      login(Userinfo);

      toast.success("Login successful");

      // Redirect by role
      if (result.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <div className='container my-5 d-flex justify-content-center'>
        <div className='login-form my-5' style={{ width: "400px" }}>

          <div className='card border-0 shadow'>
            <div className='card-body p-4'>

              <form onSubmit={handleSubmit(onSubmit)}>

                <h4 className='mb-3 text-center'>Login Here</h4>

                {/* EMAIL */}
                <div className='mb-3'>
                  <label>Email</label>
                  <input
                    type='text'
                    placeholder='email'
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className='text-danger'>{errors.email.message}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className='mb-3'>
                  <label>Password</label>
                  <input
                    type='password'
                    placeholder='password'
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register("password", {
                      required: "Password is required"
                    })}
                  />
                  {errors.password && (
                    <p className='text-danger'>{errors.password.message}</p>
                  )}
                </div>

                <div className='text-end mb-3'>
                    <Link
                      to="/forgot-password"
                      className='text-decoration-none small text-primary'
                    >
                      Forgot Password?
                    </Link>
                  </div>

                <button className='btn btn-danger w-100'>
                  Login
                </button>

                <p className='text-center mt-3 mb-0'>
                  Don't have an account?{" "}
                  <Link to="/register" className='text-decoration-none'>
                    Register
                  </Link>
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Login;