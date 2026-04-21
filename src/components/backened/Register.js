import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../backened/context/Auth";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.status) {
        toast.error(result.message || "Registration failed");
        return;
      }

      const Userinfo = {
        user: result.user,
        token: result.token,
      };

      localStorage.setItem("userinfo", JSON.stringify(Userinfo));
      login(Userinfo);

      toast.success("Account created successfully");

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
      <div className="container my-5 d-flex justify-content-center">
        <div className="register-form my-5" style={{ width: "450px" }}>
          <div className="card border-0 shadow">
            <div className="card-body p-4">

              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3 text-center">Create Account</h4>

                {/* NAME */}
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirm_password && (
                    <p className="text-danger">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>

                <button className="btn btn-primary w-100">
                  Register
                </button>

                <p className="text-center mt-3 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;