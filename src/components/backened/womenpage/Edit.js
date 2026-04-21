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
    setValue,
  } = useForm();

  useEffect(() => {
    fetchWomen();
  }, []);

  // GET SINGLE WOMEN DATA
  const fetchWomen = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/womens/${params.id}`,
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

      const women = result?.data;

      if (!women) {
        toast.error("Data not found");
        return;
      }

      setValue("title", women.title || "");
      setValue("price", women.price || "");
      setValue("status", women.status ?? 1);
      setValue("content", women.content || "");
      setValue("description", women.description || "");

      if (women.image) {
        setPreviewImage(
          `http://127.0.0.1:8000/uploads/Womens/${women.image}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data");
    }
  };

  // UPDATE DATA
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("status", data.status);
      formData.append("content", data.content || "");
      formData.append("description", data.description);

      const file = data?.image?.[0];

      if (file instanceof File) {
        formData.append("image", file);
      }

      const res = await fetch(
        `http://127.0.0.1:8000/api/womens/${params.id}`,
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
          navigate("/womenpage");
        }, 1000);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
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
                  <h4>Edit Women Cloth</h4>
                  <Link to="/womenpage" className="btn btn-outline-primary btn-sm">
                    Back
                  </Link>
                </div>

                <hr />

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* IMAGE */}
                  <div className="mb-3">
                    <label>Image</label>

                    {previewImage && (
                      <div className="mb-2">
                        <img
                          src={previewImage}
                          alt="preview"
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </div>
                    )}

                    <input type="file" className="form-control" {...register("image")} />
                  </div>

                  {/* TITLE */}
                  <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control" {...register("title")} />
                  </div>

                  {/* PRICE */}
                  <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control" {...register("price")} />
                  </div>

                  {/* STATUS */}
                  <div className="mb-3">
                    <label>Status</label>
                    <select className="form-select" {...register("status")}>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  {/* CONTENT */}
                  <div className="mb-3">
                    <label>Content</label>
                    <textarea className="form-control" {...register("content")} />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" {...register("description")} />
                  </div>

                  <button className="btn btn-primary w-100">
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