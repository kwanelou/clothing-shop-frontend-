import React, { useEffect, useState } from "react";
import Sidebar from "../../everywhere/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { token } from "../../everywhere/http";
import { toast } from "react-toastify";


const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/services/${params.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      const result = await response.json();
      console.log("SERVICE DATA:", result);

      if (result.status) {
        const service = result.data;

        setValue("title", service.title);
        setValue("slug", service.slug);
        setValue("status", service.status);
        setValue("content", service.content);
        setValue("short_desc", service.short_desc);

        setPreviewImage(`http://127.0.0.1:8000/uploads/services/${service.image}`);
      } else {
        toast.error(result.message || "Service not found");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("Failed to load service");
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("UPDATED DATA:", data);

      const formData = new FormData();

      formData.append("title", data.title || "");
      formData.append("slug", data.slug || "");
      formData.append("status", data.status || 1);
      formData.append("content", data.content || "");
      formData.append("short_desc", data.short_desc || "");
      formData.append("_method", "PUT");

      const file = data?.image?.[0];

      if (file instanceof File) {
        formData.append("image", file);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/services/${params.id}`,
        {
          method: "Put",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("UPDATE RESPONSE:", result);

      if (result.status) {
        toast.success(result.message || "Service updated successfully");

        setTimeout(() => {
          navigate("/showService");
        }, 1500);
      } else {
        toast.error(result.message || "Failed to update service");
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
                  <h4 className="mb-0">Edit Service</h4>

                  <Link
                    to="/showService"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Back
                  </Link>
                </div>

                <hr />

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Current Image</label>

                    {previewImage && (
                      <div className="mb-2">
                        <img
                          src={previewImage}
                          alt="Service"
                          className="img-thumbnail"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      className={`form-control ${errors.image ? "is-invalid" : ""}`}
                      {...register("image")}
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
                      Update Service
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

export default Edit;