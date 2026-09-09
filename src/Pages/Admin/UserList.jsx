import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/image.png"; // Make sure the path to the logo is correct

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStartDateChange = async (e) => {
    setStartDate(e.target.value);
    const searchDate = e.target.value;
    const filteredData = filterdata.filter((person) =>
      person.createdAt && person.createdAt.startsWith(searchDate)
    );
    setUserData(filteredData);
  };

  async function fetchUser() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7000/Users");
      if (response.data && response.data.userData) {
        setUserData(response.data.userData);
        setFilterdata(response.data.userData);
      }
    } catch (error) {
      console.log(
        error,
        "error in fetching user data from backend to frontend"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function deleteDoc(id) {
    try {
      const response = await axios.post(
        `http://localhost:7000/admin/User/delete?id=${id}`
      );
      if (response.status === 200) {
        setUserData(userData.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error, "error in delete doc check into the delete btn");
    }
  }

  const downloadPDF = (user) => {
    const input = document.getElementById(`user-${user._id}`);
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
  
      const img = new Image();
      img.src = Logo;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/png");
  
        pdf.addImage(imgData, 'PNG', 10, 10, 50, 20);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 128, 0);
        pdf.setFontSize(20);
        pdf.text("User Order Details", pdfWidth / 2, 40, { align: "center" });
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(`Name: ${user.full_name}`, 10, 60);
        pdf.text(`Phone: ${user.phone}`, 10, 70);
        pdf.text(`Location: ${user.address}`, 10, 80);
        pdf.text(`Country: ${user.country}`, 10, 90);
        pdf.text(
          `Date/Time: ${new Date(user.createdAt).toLocaleString()}`,
          10,
          100
        );
  
        pdf.save(`${user.full_name}_details.pdf`);
      };
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">All Orders & Pickups</h2>
          <p className="text-sm text-gray-500">Manage pickup requests from users</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
          Loading orders...
        </div>
      ) : userData.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg space-y-3">
          <div className="text-4xl">📋</div>
          <h3 className="text-lg font-semibold text-gray-700">No Orders Found</h3>
          <p className="text-sm text-gray-500">
            There are currently no pickup requests registered in the database.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Image</th>
                <th className="px-4 py-3 text-center">Phone</th>
                <th className="px-4 py-3 text-center">Location</th>
                <th className="px-4 py-3 text-center">Country</th>
                <th className="px-4 py-3 text-center">Date / Time</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userData.map((user, index) => (
                <tr
                  key={user._id || index}
                  id={`user-${user._id}`}
                  className="hover:bg-gray-50 transition text-sm"
                >
                  <td className="px-4 py-3 text-center font-medium text-gray-800">{user.full_name}</td>
                  <td className="px-4 py-3 text-center">
                    {user.pickupImage ? (
                      <img
                        src={"http://localhost:7000/assets/pickupImage/" + user.pickupImage}
                        className="w-20 h-20 object-cover rounded-md mx-auto border"
                        alt="Pickup"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{user.phone}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{user.address}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{user.country}</td>
                  <td className="px-4 py-3 text-center text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => downloadPDF(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md transition"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => deleteDoc(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
