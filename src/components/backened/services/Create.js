import React from "react";
import Sidebar from "../../everywhere/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { token } from "../../everywhere/http";
import { Toast } from "react-bootstrap";
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
      formData.append("slug", data.slug || "");
      formData.append("status", data.status || 1);
      formData.append("content", data.content || "");
      formData.append("short_desc", data.short_desc || "");
      formData.append("price", data.price || 0);

      const file = data?.image?.[0];

      if (!(file instanceof File)) {
        console.error("❌ Invalid image file:", file);
        return;
      }

      formData.append("image", file);

      const response = await fetch("http://127.0.0.1:8000/api/services", {
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

        // Redirect to show page after successful creation
        toast.success("result.message");
        navigate("/showService");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("result.message");
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
                  <h4 className="mb-0">Create New Service</h4>

                  <Link to="/showService" className="btn btn-outline-primary btn-sm">
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
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />
                    {errors.image && (
                      <div className="invalid-feedback">
                        {errors.image.message}
                      </div>
                    )}
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
              step="0.01"
              className="form-control"
              {...register("price", {
                required: "Price is required",
              })}
            />
          </div>

                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                      {...register("slug", {
                        required: "Slug is required",
                      })}
                    />
                    {errors.slug && (
                      <div className="invalid-feedback">
                        {errors.slug.message}
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
                    <input
                      type="text"
                      className="form-control"
                      {...register("content")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      rows="3"
                      className={`form-control ${errors.short_desc ? "is-invalid" : ""}`}
                      {...register("short_desc", {
                        required: "Short description is required",
                      })}
                    ></textarea>

                    {errors.short_desc && (
                      <div className="invalid-feedback">
                        {errors.short_desc.message}
                      </div>
                    )}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Create Service
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