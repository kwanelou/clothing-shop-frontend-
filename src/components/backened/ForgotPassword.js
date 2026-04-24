import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password reset link sent to your email");
      } else {
        toast.error(result.message || "Failed to send reset link");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow border-0" style={{ width: "400px" }}>
          <div className="card-body p-4">
            <h4 className="text-center mb-4">Forgot Password</h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Send Link
              </button>

              <Link to="/login" className="btn btn-outline-secondary w-100">
                Continue with Password
              </Link>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;