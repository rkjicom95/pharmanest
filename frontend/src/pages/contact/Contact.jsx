import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { sendMessage } from "../../features/message/messageSlice";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../../../admin-panel/src/utils/toastMessage";

const Contact = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data sent", form);
    dispatch(sendMessage(form));
    showSuccess("Message sent successfully");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center bg-teal-500 text-white py-16 text-center pr-10">
        {" "}
        <h1 className="text-2xl font-bold mb-2">Get in Touch With Us</h1>
        <p className="text-lg opacity-90 w-[60%]">
          We’re always here to listen, assist, and connect with you. Whether you
          have a question, feedback, or a business inquiry, our team is ready to
          provide you with the best possible support. Reach out through the form
          below or use our direct contact details to connect with us. We value
          every message and look forward to building meaningful connections with
          you.
        </p>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-medium mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-normal mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block font-normal mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block font-normal mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Message subject"
                required
              />
            </div>
            <div>
              <label className="block font-normal mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Write your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white rounded-lg py-2 font-semibold hover:bg-teal-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center bg-blue-50 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-teal-600 text-xl" />
              <p className="text-lg">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-teal-600 text-xl" />
              <p className="text-lg">support@yourcompany.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-teal-600 text-xl" />
              <p className="text-lg">123 Business Street, Tech City, India</p>
            </div>
          </div>

          {/* Social Icons */}
          {/* <div className="mt-8 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
            >
              <FaLinkedin />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
