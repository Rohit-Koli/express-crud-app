import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [image, setImage] = useState<File | null>(null); // ✅ Image state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("age", form.age);
    if (image) {
      formData.append("image", image);
    }

    await axios.post("http://localhost:3000/user/setUser", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" 
          placeholder="Name" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          placeholder="Email" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="age" 
          placeholder="Age" 
          type="number" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
