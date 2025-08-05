import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
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
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/user/getUser?id=${id}`).then((res) => {
      const data = res.data;
      setForm({
        ...data,
        hobbies: data.hobbies?.join(", ") || "",
        skills: data.skills?.join(", ") || "",
      });
    });
  }, [id]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.age || parseInt(form.age) < 1 || parseInt(form.age) > 120) newErrors.age = "Age must be between 1 and 120.";
    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Phone number must be exactly 10 digits.";
    if (form.hobbies && !form.hobbies.includes(",")) newErrors.hobbies = "Enter at least two hobbies separated by comma.";
    if (form.skills && !form.skills.includes(",")) newErrors.skills = "Enter at least two skills separated by comma.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "hobbies" || key === "skills") {
        formData.append(key, JSON.stringify(value.split(",").map(v => v.trim())));
      } else {
        formData.append(key, value);
      }
    });

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    await axios.put(`http://localhost:3000/user/updateUser?id=${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

        <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

        <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone" required pattern="^\d{10}$" maxLength={10} minLength={10} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input name="birthday" type="date" value={form.birthday?.slice(0, 10)} onChange={handleChange} required placeholder="Birthday" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Hobbies (comma separated)" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}

        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}

        {form.image && (
          <div className="text-center">
            <img src={`http://localhost:3000/uploads/${form.image}`} alt="Current" className="w-24 h-24 mx-auto rounded-full object-cover mb-2" />
            <p className="text-gray-500 text-sm">Current Profile Image</p>
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" />

        <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
