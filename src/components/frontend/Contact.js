import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status) {
        alert("Message sent successfully!");
        reset(); // clear form
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container-fluid py-4">

        {/* HEADER */}
        <div className="contact-header text-center">
          <span>Contact Us</span>
          <h2>
            Our dedicated staff are here to help you with your questions
          </h2>
          <p>Fill out the form below and we will respond shortly</p>
        </div>

        <div className="row mt-3">

          {/* LEFT INFO */}
          <div className="col-md-3">
            <div className="card p-4 shadow border-2 contact-details">

              <h5>Call Us</h5>
              <p>(069-182-9936)</p>
              <p>(079-182-9936)</p>

              <h5>Write to us</h5>
              <p>
                <a href="mailto:Kwanelou@gmail.com">
                  Kwanelou@gmail.com
                </a>
              </p>

              <h5>Address</h5>
              <p>Nargis Street 2345-ER6</p>

            </div>
          </div>

          {/* FORM */}
          <div className="col-md-9 ">
            <div className="card shadow border-3 p-5 bg-dark sm ">

              <form onSubmit={handleSubmit(onSubmit)} >

                {/* NAME */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <small className="text-danger">
                      {errors.name.message}
                    </small>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: "Phone is required",
                      minLength: {
                        value: 8,
                        message: "Phone must be at least 8 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone.message}
                    </small>
                  )}
                </div>

                {/* SUBJECT */}
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Your subject here"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <small className="text-danger">
                      {errors.subject.message}
                    </small>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    rows={4}
                    className="form-control form-control-sm"
                    placeholder="Type your message here"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <small className="text-danger">
                      {errors.message.message}
                    </small>
                  )}
                </div>

                <button className="btn btn-danger mt-3 w-100">
                  Submit
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;