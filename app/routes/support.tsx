
import React, { useState } from "react";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Support - Monlam
      </h1>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              How can I search for words in the Monlam Dictionary?
            </h3>
            <p className="text-gray-600">
              Use the search bar at the top of the dictionary page. Simply type
              the word you're looking for, and results will appear instantly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              How can I toggle between dark and light modes?
            </h3>
            <p className="text-gray-600">
              Use the theme switch button in the top-right corner to switch
              between dark and light modes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              How can I get a random word?
            </h3>
            <p className="text-gray-600">
              Click the "Shuffle" button on the dictionary page to explore a
              random word.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Contact Us
        </h2>
        <form
          className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;

