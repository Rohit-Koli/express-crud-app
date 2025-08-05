import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    birthday: "",
    bio: "",
    hobbies: "",
    skills: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.age || parseInt(form.age) < 1 || parseInt(form.age) > 120) newErrors.age = "Age must be between 1 and 120.";
    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (form.hobbies && !form.hobbies.includes(",")) newErrors.hobbies = "Enter at least two hobbies separated by comma.";
    if (form.skills && !form.skills.includes(",")) newErrors.skills = "Enter at least two skills separated by comma.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "hobbies" || key === "skills") {
        formData.append(key, JSON.stringify(value.split(",").map((v) => v.trim())));
      } else {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    await axios.post("http://localhost:3000/user/setUser", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

        <select
          name="gender"
          onChange={handleSelectChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          pattern="^\d{10}$"
          maxLength={10}
          minLength={10}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input name="birthday" type="date" placeholder="Birthday" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <textarea name="bio" placeholder="Bio" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input name="hobbies" placeholder="Hobbies (comma separated)" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}

        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />

        <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
