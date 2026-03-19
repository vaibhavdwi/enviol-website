"use client";

import { useState, useEffect } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  // ✅ Generate captcha
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // ✅ Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Disposable email domains (basic block)
  const blockedDomains = ["tempmail.com", "mailinator.com", "10minutemail.com"];

  // ✅ Domain suggestions
  const domainSuggestions = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];

  const handleEmailChange = (e) => {
    let value = e.target.value;

    // autocorrect common typos
    if (value.includes("@gmal.com")) value = value.replace("gmal.com", "gmail.com");
    if (value.includes("@gmial.com")) value = value.replace("gmial.com", "gmail.com");
    if (value.includes("@hotnail.com")) value = value.replace("hotnail.com", "hotmail.com");

    e.target.value = value;

    if (!validateEmail(value)) {
      setEmailError("Invalid email format");
      return;
    }

    const domain = value.split("@")[1];

    if (blockedDomains.includes(domain)) {
      setEmailError("Temporary emails are not allowed");
      return;
    }

    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    // ✅ Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // ✅ Captcha validation
    if (parseInt(captcha) !== num1 + num2) {
      alert("Invalid captcha");
      generateCaptcha();
      return;
    }

    setLoading(true);

    const formData = {
      company: e.target.company.value,
      person: e.target.person.value,
      email,
      phone: e.target.phone.value,
      category: e.target.category.value,
      message: e.target.message.value,
	  
	  // ✅ IMPORTANT FIX
  captchaAnswer: captcha,
  num1,
  num2,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Enquiry submitted successfully!");
        e.target.reset();
        generateCaptcha();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-yellow-50">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          Contact Enviol Polytech Solutions
        </h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h2>

            <p className="mb-6 text-lg">
              Our technical team is ready to support your requirements
              for sustainable polyester and polyether polyols.
            </p>

            <div className="mb-6 text-lg space-y-1">
              <h3 className="font-semibold mb-2">Our Office:</h3>
              <p>Khasra No.164, Prasiddhpur Bhant,</p>
              <p>Near Parshuram Mandir,</p>
              <p>Khanchandpur Road,</p>
              <p>Rania Industrial Area,</p>
              <p>Tehsil Akbarpur,</p>
              <p>Kanpur Dehat, Uttar Pradesh, India - 209304</p>
              <p>Phone: <a href="tel:+919625093722" className="text-primary underline">+91 96250 93722</a></p>
              <p>Email: <a href="mailto:info@enviol.com" className="text-primary underline">info@enviol.com</a></p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-lightbg p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Reach Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="company"
                type="text"
                placeholder="Company Name"
                required
                className="w-full p-3 border rounded"
              />

              <input
                name="person"
                type="text"
                placeholder="Contact Person"
                required
                className="w-full p-3 border rounded"
              />

              {/* EMAIL */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={handleEmailChange}
                  className={`w-full p-3 border rounded ${emailError ? "border-red-500" : ""}`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded"
              />

              {/* CATEGORY */}
              <select
                name="category"
                required
                className="w-full p-3 border rounded"
              >
                <option value="">Select Enquiry Type</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Price Enquiry">Price Enquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Ordering">Ordering</option>
                <option value="Delivery">Delivery</option>
                <option value="Payments">Payments</option>
              </select>

              <textarea
                name="message"
                placeholder="Describe your requirement..."
                rows="4"
                required
                className="w-full p-3 border rounded"
              ></textarea>

              {/* CAPTCHA */}
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  {num1} + {num2} =
                </span>
                <input
                  type="number"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                  className="w-24 p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded font-semibold w-full"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}