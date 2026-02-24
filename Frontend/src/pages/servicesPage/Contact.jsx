import React, { useState } from 'react';
import { 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaHeadphones,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaWhatsapp,
  FaPhoneAlt,
  FaClock as FaClockAlt,
  FaEnvelopeOpenText,
  FaHeadset,
  FaTruck,
  FaShieldAlt
} from 'react-icons/fa';
import { MdSupportAgent, MdEmail, MdPhone, MdAccessTime, MdLocationOn } from 'react-icons/md';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-purple-600" />,
      title: "Visit Us",
      details: ["123 Audio Street", "Music City, MC 12345", "United States"],
      bgColor: "bg-purple-50"
    },
    {
      icon: <FaPhone className="text-2xl text-blue-600" />,
      title: "Call Us",
      details: ["+92 3308419436", "+92 3402425689"],
      bgColor: "bg-blue-50"
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-600" />,
      title: "Email Us",
      details: ["hafizahteshamali363617@gmail.com", "aliahtesham946@gmail.com"],
      bgColor: "bg-green-50"
    },
    {
      icon: <FaClock className="text-2xl text-orange-600" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday: 10AM - 6PM", "Sunday: Closed"],
      bgColor: "bg-orange-50"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping available for 1-2 business days."
    },
    {
      question: "What is your return policy?",
      answer: "30-day money-back guarantee on all products. Free returns within the US."
    },
    {
      question: "Do you offer warranty?",
      answer: "Yes, all products come with a 1-year manufacturer warranty. Extended warranty available."
    },
    {
      question: "Are your products authentic?",
      answer: "100% genuine products directly from authorized distributors."
    }
  ];

  const storeFeatures = [
    { icon: <FaTruck className="text-xl" />, text: "Free Shipping over $50" },
    { icon: <FaShieldAlt className="text-xl" />, text: "2 Year Warranty" },
    { icon: <FaHeadset className="text-xl" />, text: "24/7 Customer Support" },
    { icon: <FaCheckCircle className="text-xl" />, text: "100% Authentic" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-[#fec856] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Contact <span className="text-yellow-300">Us</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl">
              We're here to help you with any questions
            </p>
            <p className="text-lg max-w-2xl opacity-90">
              Reach out to us anytime. Our team is ready to assist you with your audio needs.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="flex flex-wrap justify-center gap-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl mb-4 shadow-md">
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send Us a <span className="text-purple-600">Message</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span>Message sent successfully! We'll contact you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <HiOutlineChatBubbleLeftRight className="absolute left-3 top-4 text-gray-400 text-xl" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaPaperPlane className="text-lg" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96">
            {/* Quick Support */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white mb-8">
              <FaHeadset className="text-5xl mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
              <p className="text-purple-100 mb-6">
                Our customer support team is available around the clock to assist you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-yellow-300" />
                  <span>+92 3308419436</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-yellow-300" />
                  <span>hafizahteshamali363617@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-yellow-300 text-xl" />
                  <span>+92 3402425689</span>
                </div>
              </div>
            </div>

            {/* Store Features */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Shop With Us</h3>
              <div className="space-y-4">
                {storeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transform hover:scale-110 transition-all">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transform hover:scale-110 transition-all">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transform hover:scale-110 transition-all">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transform hover:scale-110 transition-all">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transform hover:scale-110 transition-all">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find quick answers to common questions about our products and services
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full md:w-[calc(50%-12px)] bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-start gap-2">
                  <span className="text-purple-600 text-xl">•</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Visit Our <span className="text-purple-600">Store</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Come visit our physical store to experience our products firsthand.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">123 Audio Street, Music City, MC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaClockAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Store Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 9AM - 8PM</p>
                    <p className="text-gray-600">Sat: 10AM - 6PM</p>
                    <p className="text-gray-600">Sun: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Store Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 h-96 lg:h-auto bg-gray-200">
              {/* Replace with actual map integration */}
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500">123 Audio Street, Music City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Our support team is available 24/7 to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
              <FaHeadphones />
              Live Chat
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <FaEnvelopeOpenText />
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;