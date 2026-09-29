import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async () => {
    const formattedMessage = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    const whatsappNumber = "+917406941223"; 
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; 

    try {
      const response = await fetch(
        `${proxyUrl}https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
          formattedMessage
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Page Header */}
      <div className="w-full bg-white pt-40 pb-20 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.05] blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            GET IN TOUCH
          </h4>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Have questions about our scrap pickup service? Want to partner with us for your residential society? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-[-40px] relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Form Section */}
          <div className="w-full lg:w-3/5 p-8 md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Send a Message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#18931D] focus:border-transparent transition-all font-medium resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#18931D] hover:bg-[#15801A] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(24,147,29,0.25)] hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="w-full lg:w-2/5 bg-[#F4FAF5] p-8 md:p-12 border-l border-green-50">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#18931D]/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Our Location</p>
                  <p className="text-gray-600 leading-relaxed font-medium">TKM Shop<br/>Kannur, Kerala</p>
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
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
