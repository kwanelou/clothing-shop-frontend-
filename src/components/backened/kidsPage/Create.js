import React from "react";
import Sidebar from "../../everywhere/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { token } from "../../everywhere/http";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("RAW DATA:", data);

      const formData = new FormData();

      formData.append("title", data.title || "");
      formData.append("price", data.price || "");
      formData.append("status", data.status || 1);
      formData.append("content", data.content || "");
      formData.append("kids_desc", data.kids_desc || "");

      const file = data?.image?.[0];

      if (file instanceof File) {
        formData.append("image", file);
      }

      const response = await fetch("http://127.0.0.1:8000/api/kids", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("SUCCESS:", result);

      if (result.status) {
        reset();
        toast.success(result.message);
        navigate("/showkids");
      } else {
        toast.error(result.message || "Failed to create kids cloth");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <Sidebar />
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Create New Kids Clothe</h4>

                  <Link to="/showkids" className="btn btn-outline-primary btn-sm">
                    Back
                  </Link>
                </div> 

                <hr />

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className={`form-control ${errors.image ? "is-invalid" : ""}`}
                      {...register("image")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className={`form-control ${errors.price ? "is-invalid" : ""}`}
                      {...register("price", {
                        required: "Price is required",
                      })}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                      {...register("status", {
                        required: "Status is required",
                      })}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      {...register("content")}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      rows="3"
                      className={`form-control ${errors.kids_desc ? "is-invalid" : ""}`}
                      {...register("kids_desc", {
                        required: "kids_description is required",
                      })}
                    ></textarea>

                    {errors.kids_desc && (
                      <div className="invalid-feedback">
                        {errors.kids_desc.message}
                      </div>
                    )}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;