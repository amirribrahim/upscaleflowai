import { useState } from "react";

export default function ProceedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    alert("Your package selection is submitted!");
    setIsOpen(false);
    // Here you can send the form data via email / API
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 px-10 py-4 rounded-full shadow-lg bg-gradient-to-r from-primary to-blue-700 text-white font-bold text-lg hover:scale-105 transition"
      >
        Proceed with Package
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Confirm Your Package
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <input
                type="text"
                name="location"
                placeholder="Location / City"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <textarea
                name="notes"
                placeholder="Additional Notes / Requests"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />

              <button
                type="submit"
                className="w-full mt-4 px-6 py-3  text-white font-bold rounded-full shadow-lg hover:scale-105 transition"
                style={{
          background: 'linear-gradient(to right, #3B82F6, black)'
        }}
              >
                Confirm Selection
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
