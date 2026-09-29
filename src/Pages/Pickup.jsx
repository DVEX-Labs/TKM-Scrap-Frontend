import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  phone: Yup.number().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  pickupImage: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= 1024 * 1024
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

const initialValues = {
  full_name: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  state: "",
  zipcode: "",
  pickupImage: null,
};

const handleLocation = async (setFieldValue) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
        `  https://nominatim.openstreetmap.org/reverse`,
          {
            params: { lat: latitude, lon: longitude, format: "json" },
          }
        );
        const { address } = response.data;
        setFieldValue("address", address.road || "");
        setFieldValue(
          "city",
          address.city || address.town || address.village || ""
        );
        setFieldValue("country", address.country || "");
        setFieldValue("state", address.state || "");
        setFieldValue("zipcode", address.postcode || "");
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

const handleSubmit = async (values, { setSubmitting }, navigate) => {
  try {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("zipcode", values.zipcode);
    formData.append("pickupImage", values.pickupImage);
  
    const response = await axios.post(
      `${API_BASE_URL}/pickup`,
      formData
    );

    console.log("Server Response:", response.data);
    if (response.status === 200) {
      navigate("/");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  setSubmitting(false);
  console.log("Form submission complete");
};

const Pickup = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Page Header */}
      <div className="w-full bg-[#0F172A] pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            DOORSTEP SERVICE
          </h4>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Schedule a Pickup
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Fill out the details below and our team will arrive at your location to weigh and collect your scrap.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mt-[-40px] relative z-20">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, navigate)}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Side: Info & Auto-location */}
                <div className="w-full lg:w-1/3">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Your Details</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                    Provide accurate location details so our pickup executives can reach you without delay.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => handleLocation(setFieldValue)}
                    className="w-full flex items-center justify-center gap-2 bg-[#E8F5E9] hover:bg-[#D8FACF] text-[#18931D] font-bold py-4 rounded-xl transition-colors border border-green-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Use Current Location
                  </button>
                </div>

                {/* Right Side: Form Fields */}
                <div className="w-full lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <Field
                        type="text"
                        name="full_name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                        placeholder="John Doe"
                      />
                      <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <Field
                        type="number"
                        name="phone"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                        placeholder="Enter 10-digit number"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                      <Field
                        type="text"
                        name="address"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                        placeholder="House No, Building, Street"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                      <Field
                        type="text"
                        name="city"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State / Province</label>
                      <Field
                        type="text"
                        name="state"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                      <Field
                        type="text"
                        name="country"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                      />
                      <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                      <Field
                        type="text"
                        name="zipcode"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                      />
                      <ErrorMessage name="zipcode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Upload Image of Items (Max 1MB)</label>
                      <input
                        type="file"
                        name="pickupImage"
                        accept="image/jpeg, image/png"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#18931D] transition-all font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#E8F5E9] file:text-[#18931D] hover:file:bg-[#D8FACF]"
                        onChange={(event) => {
                          setFieldValue(
                            "pickupImage",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <ErrorMessage name="pickupImage" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button
                        type="submit"
                        className="w-full bg-[#18931D] hover:bg-[#15801A] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(24,147,29,0.25)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Booking..." : "Confirm Pickup Request"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Pickup;
