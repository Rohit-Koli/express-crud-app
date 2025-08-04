import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/getUser?id=${id}`)
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/user/updateUser?id=${id}`, form);
    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          type="number"
          placeholder="Age"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
