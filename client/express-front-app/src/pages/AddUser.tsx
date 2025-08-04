import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddUser  = () => {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/user/setUser ", form);
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
        <button 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser ;
