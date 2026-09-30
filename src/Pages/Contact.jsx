import { useState } from "react";
import axios from "axios";
import PageHero from "../Components/PageHero";
import { API_BASE_URL } from "../config";
import {
  validateIndianPhone,
  validateIndianPincode,
  validateOptionalEmail,
} from "../utils/validation";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    const phoneCheck = validateIndianPhone(phone);
    if (!phoneCheck.valid) {
      nextErrors.phone = phoneCheck.error;
    }

    const emailCheck = validateOptionalEmail(email);
    if (!emailCheck.valid) {
      nextErrors.email = emailCheck.error;
    }

    if (!address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!location.trim()) {
      nextErrors.location = "Location is required.";
    }

    const pincodeCheck = validateIndianPincode(pincode);
    if (!pincodeCheck.valid) {
      nextErrors.pincode = pincodeCheck.error;
    }

    if (!message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    if (!validateForm()) return;

    const phoneCheck = validateIndianPhone(phone);
    const pincodeCheck = validateIndianPincode(pincode);
    const emailCheck = validateOptionalEmail(email);

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/contact`, {
        name: name.trim(),
        phone: phoneCheck.value,
        address: address.trim(),
        location: location.trim(),
        pincode: pincodeCheck.value,
        email: emailCheck.value,
        message: message.trim(),
      });

      const whatsappText = [
        `Name: ${name.trim()}`,
        `Phone: +91 ${phoneCheck.value}`,
        `Address: ${address.trim()}`,
        `Location: ${location.trim()}`,
        `Pincode: ${pincodeCheck.value}`,
        emailCheck.value ? `Email: ${emailCheck.value}` : null,
        message.trim() ? `Message: ${message.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      window.open(
        `https://wa.me/917406941223?text=${encodeURIComponent(whatsappText)}`,
        "_blank",
        "noopener,noreferrer"
      );

      setName("");
      setPhone("");
      setAddress("");
      setLocation("");
      setPincode("");
      setEmail("");
      setMessage("");
      setErrors({});
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have questions about our scrap pickup service? Want to partner with us for your residential society? We're here to help."
      />

      <div className="max-w-[1240px] mx-auto px-6 mt-[-40px] relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Send a Message</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Enter your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 font-semibold">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={`w-full bg-gray-50 border rounded-r-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                      errors.phone ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Enter your phone number"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                    errors.address ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your address"
                />
                {errors.address && <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                      errors.location ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Enter your location"
                  />
                  {errors.location && <p className="mt-1.5 text-sm text-red-500">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-bold text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                      errors.pincode ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Enter pincode"
                    maxLength={6}
                    inputMode="numeric"
                  />
                  {errors.pincode && <p className="mt-1.5 text-sm text-red-500">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-gray-400 font-medium">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium resize-none ${
                    errors.message ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="How can we help you today?"
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
              </div>

              {submitStatus === "success" && (
                <p className="text-sm font-medium text-[#18931D]">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm font-medium text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#18931D] hover:bg-[#15801A] disabled:opacity-70 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(24,147,29,0.25)] hover:-translate-y-1"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="w-full lg:w-2/5 bg-[#F4FAF5] p-8 md:p-12 border-l border-green-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">Contact Information</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#18931D]/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Our Location</p>
                  <p className="text-gray-600 leading-relaxed font-medium">TKM Shop<br />Kannur, Kerala</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#18931D]/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Phone Number</p>
                  <p className="text-gray-600 font-medium">+91 74069 41223</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#18931D]/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Email Address</p>
                  <p className="text-gray-600 font-medium">support@ecoscrap.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.7073238626027!2d75.3673323!3d11.8702336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422b9b2aca753%3A0x380605a11ce24f6c!2sKannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Eco Scrap location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
