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

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchKid();
  }, []);

  // GET DATA
  const fetchKid = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/kids/${params.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      const result = await res.json();
      console.log("GET RESULT:", result);

      const kid = result.data;

      if (!kid) {
        toast.error("Data not found");
        return;
      }

      setValue("title", kid.title || "");
      setValue("price", kid.price || "");
      setValue("status", kid.status ?? 1);
      setValue("content", kid.content || "");
      setValue("kids_desc", kid.kids_desc || "");

      if (kid.image) {
        setPreviewImage(
          `http://127.0.0.1:8000/uploads/Kids/${kid.image}`
        );
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
      toast.error("Failed to load data");
    }
  };

  // UPDATE DATA
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("title", data.title || "");
      formData.append("price", data.price || "");
      formData.append("status", data.status || 1);
      formData.append("content", data.content || "");
      formData.append("kids_desc", data.kids_desc || "");

      const file = data?.image?.[0];

      if (file instanceof File) {
        formData.append("image", file);
      }

      const res = await fetch(
        `http://127.0.0.1:8000/api/kids/${params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      console.log("UPDATE RESULT:", result);

      if (result.status) {
        toast.success(result.message || "Updated successfully");

        setTimeout(() => {
          navigate("/showkids");
        }, 1000);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <div className="container my-5">
        <div className="row g-4">
          {/* SIDEBAR */}
          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body">
                <Sidebar />
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-3">
                  <h4>Edit Kids Cloth</h4>

                  <Link
                    to="/showkids"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Back
                  </Link>
                </div>

                <hr />

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* IMAGE */}
                  <div className="mb-3">
                    <label className="form-label">Image</label>

                    {previewImage && (
                      <div className="mb-2">
                        <img
                          src={previewImage}
                          alt="preview"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      className="form-control"
                      {...register("image")}
                    />
                  </div>

                  {/* TITLE */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("title")}
                    />
                  </div>

                  {/* PRICE */}
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("price")}
                    />
                  </div>

                  {/* STATUS */}
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      {...register("status")}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  {/* CONTENT */}
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      {...register("content")}
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      {...register("kids_desc")}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
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