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

        // ✅ PRICE ADDED
        setValue("price", service.price);

        setPreviewImage(
          `http://127.0.0.1:8000/uploads/services/${service.image}`
        );
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

      // ✅ PRICE ADDED
      formData.append("price", data.price || 0);

      formData.append("_method", "PUT");

      const file = data?.image?.[0];

      if (file instanceof File) {
        formData.append("image", file);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/services/${params.id}`,
        {
          method: "PUT",
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
                  {/* IMAGE */}
                  <div className="mb-3">
                    <label className="form-label">Current Image</label>

                    {previewImage && (
                      <div className="mb-2">
                        <img
                          src={previewImage}
                          alt="Service"
                          className="img-thumbnail"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      className={`form-control ${
                        errors.image ? "is-invalid" : ""
                      }`}
                      {...register("image")}
                    />
                  </div>

                  {/* TITLE */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("title", { required: true })}
                    />
                  </div>

                  {/* SLUG */}
                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("slug", { required: true })}
                    />
                  </div>

                  {/* STATUS */}
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" {...register("status")}>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  {/* CONTENT */}
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("content")}
                    />
                  </div>

                  {/* SHORT DESC */}
                  <div className="mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      {...register("short_desc")}
                    ></textarea>
                  </div>

                  {/* ✅ PRICE ADDED HERE */}
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      {...register("price", { required: true })}
                    />
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