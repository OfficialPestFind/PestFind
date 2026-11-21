import React, { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

// ======================================================
// INITIAL FORM DATA
// ======================================================

const initialFormData = {
  agencyName: "",
  contactPerson: "",
  mobile: "",
  email: "",
  cityPincode: "",
  yearsInBusiness: "",
  serviceAreas: "",
};

// ======================================================
// COMPONENT
// ======================================================

const AgencyRequestForm = () => {
  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let finalValue = value;

    // Mobile - numbers only
    if (name === "mobile") {
      finalValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    // Years in business - numbers only
    if (name === "yearsInBusiness") {
      finalValue = value
        .replace(/\D/g, "")
        .slice(0, 2);
    }

    // Agency name / contact person
    if (
      name === "agencyName" ||
      name === "contactPerson"
    ) {
      finalValue = value
        .replace(/[^a-zA-Z0-9\s&.'-]/g, "")
        .replace(/\s{2,}/g, " ");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    const agencyName =
      formData.agencyName.trim();

    const contactPerson =
      formData.contactPerson.trim();

    const mobile =
      formData.mobile.trim();

    const email =
      formData.email.trim();

    const cityPincode =
      formData.cityPincode.trim();

    const years =
      formData.yearsInBusiness.trim();

    const serviceAreas =
      formData.serviceAreas.trim();

    // Agency name
    if (!agencyName) {
      newErrors.agencyName =
        "Agency name is required.";
    } else if (agencyName.length < 2) {
      newErrors.agencyName =
        "Please enter a valid agency name.";
    }

    // Contact person
    if (!contactPerson) {
      newErrors.contactPerson =
        "Contact person is required.";
    } else if (contactPerson.length < 2) {
      newErrors.contactPerson =
        "Please enter a valid name.";
    }

    // Mobile
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // Email
    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    // City / Pincode
    if (!cityPincode) {
      newErrors.cityPincode =
        "City / Pincode is required.";
    }

    // Years
    if (
      years &&
      Number(years) > 99
    ) {
      newErrors.yearsInBusiness =
        "Please enter a valid number of years.";
    }

    // Service areas
    if (!serviceAreas) {
      newErrors.serviceAreas =
        "Please enter your service areas and treatments.";
    } else if (serviceAreas.length < 5) {
      newErrors.serviceAreas =
        "Please provide some service details.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // CLOSE POPUP
  // ======================================================

  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      title: "",
      message: "",
    });
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(
        collection(
          db,
          "agencyRequests"
        ),
        {
          agencyName:
            formData.agencyName.trim(),

          contactPerson:
            formData.contactPerson.trim(),

          mobile:
            formData.mobile,

          email:
            formData.email
              .trim()
              .toLowerCase(),

          cityPincode:
            formData.cityPincode.trim(),

          yearsInBusiness:
            formData.yearsInBusiness
              ? Number(
                  formData.yearsInBusiness
                )
              : null,

          serviceAreas:
            formData.serviceAreas.trim(),

          createdAt:
            serverTimestamp(),
        }
      );

      console.log(
        "Agency request saved successfully!"
      );

      console.log(
        "Document ID:",
        docRef.id
      );

      // Reset form
      setFormData(initialFormData);

      setErrors({});

      // Success popup
      setPopup({
        show: true,
        type: "success",
        title: "Application Submitted",
        message:
          "Thank you for your interest in partnering with PestFind. We have received your agency details and our team will review your application and contact you.",
      });

    } catch (error) {
      console.error(
        "Error saving agency request:",
        error
      );

      // Error popup
      setPopup({
        show: true,
        type: "error",
        title: "Submission Failed",
        message:
          "We couldn't submit your agency request right now. Please check your connection and try again.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  // ======================================================
  // INPUT STYLE
  // ======================================================

  const inputClass = (field) => `
    w-full
    h-[48px]
    rounded-[14px]
    border
    px-4
    text-[16px]
    text-[#1F2A26]
    bg-white
    outline-none
    transition-all
    duration-200
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-[#D5DED9] focus:border-[#007A43]"
    }
  `;

  // ======================================================
  // JSX
  // ======================================================

  return (
    <>
      <div className="w-fit rounded-4xl bg-white px-6 py-8">

        {/* =========================
            HEADER
        ========================= */}

        <div>
          <h3 className="font-bold leading-[1.05] tracking-[-1.2px] text-[#14231D] sm:text-[36px]">
            Grow With PestFind.
          </h3>

          <p className="mt-7 max-w-[500px] text-[16px] leading-[1.5] text-[#697871]">
            Share your agency details. We'll review the
            information and contact you.
          </p>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-5"
        >

          {/* =========================
              ROW 1
          ========================= */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Agency Name */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                Agency name *
              </label>

              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                maxLength={100}
                placeholder=""
                className={inputClass(
                  "agencyName"
                )}
              />

              {errors.agencyName && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.agencyName}
                </p>
              )}
            </div>

            {/* Contact Person */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                Contact person *
              </label>

              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                maxLength={60}
                placeholder=""
                className={inputClass(
                  "contactPerson"
                )}
              />

              {errors.contactPerson && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.contactPerson}
                </p>
              )}
            </div>

          </div>

          {/* =========================
              ROW 2
          ========================= */}

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Mobile */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                Mobile *
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                placeholder=""
                className={inputClass(
                  "mobile"
                )}
              />

              {errors.mobile && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
                placeholder=""
                className={inputClass(
                  "email"
                )}
              />

              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

          </div>

          {/* =========================
              ROW 3
          ========================= */}

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* City / Pincode */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                City / Pincode *
              </label>

              <input
                type="text"
                name="cityPincode"
                value={formData.cityPincode}
                onChange={handleChange}
                maxLength={80}
                placeholder=""
                className={inputClass(
                  "cityPincode"
                )}
              />

              {errors.cityPincode && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.cityPincode}
                </p>
              )}
            </div>

            {/* Years */}

            <div>
              <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
                Years in business
              </label>

              <input
                type="text"
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={2}
                placeholder=""
                className={inputClass(
                  "yearsInBusiness"
                )}
              />

              {errors.yearsInBusiness && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.yearsInBusiness}
                </p>
              )}
            </div>

          </div>

          {/* =========================
              SERVICE AREAS
          ========================= */}

          <div className="mt-3">

            <label className="mb-2 block text-[12px] font-bold text-[#4C5B55]">
              Service areas & treatments
            </label>

            <textarea
              name="serviceAreas"
              value={formData.serviceAreas}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              placeholder="e.g. Thane, Kalyan; Cockroach, Termite"
              className={`
                w-full
                resize-none
                rounded-[14px]
                border
                px-4
                py-3
                text-[16px]
                leading-[1.4]
                text-[#1F2A26]
                outline-none
                transition-all
                duration-200
                ${
                  errors.serviceAreas
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D5DED9] focus:border-[#007A43]"
                }
              `}
            />

            {errors.serviceAreas && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.serviceAreas}
              </p>
            )}

          </div>

          {/* =========================
              SUBMIT
          ========================= */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              mt-3
              h-[50px]
              w-full
              rounded-[14px]
              bg-[#F76500]
              text-[16px]
              font-extrabold
              text-white
              transition-all
              duration-200
              hover:bg-[#e85b00]
              hover:shadow-lg
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Agency Request →"}
          </button>

        </form>
      </div>

      {/* ==================================================
          POPUP
      ================================================== */}

      {popup.show && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          onClick={closePopup}
        >
          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-[460px] rounded-[28px] bg-white p-7 text-center shadow-2xl sm:p-9"
          >

            {/* Icon */}

            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                popup.type === "success"
                  ? "bg-[#E7F4EE]"
                  : "bg-red-50"
              }`}
            >
              {popup.type === "success" ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#007A43"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="12"
                    cy="16"
                    r="1"
                    fill="#DC2626"
                  />

                  <path
                    d="M10.3 3.8L2.8 17C2.1 18.2 3 19.7 4.4 19.7H19.6C21 19.7 21.9 18.2 21.2 17L13.7 3.8C13 2.6 11 2.6 10.3 3.8Z"
                    stroke="#DC2626"
                    strokeWidth="1.8"
                  />
                </svg>
              )}
            </div>

            {/* Title */}

            <h3
              id="popup-title"
              className="mt-5 text-2xl font-bold text-[#14231D]"
            >
              {popup.title}
            </h3>

            {/* Message */}

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {popup.message}
            </p>

            {/* Success reference */}

            {popup.type === "success" && (
              <div className="mt-5 rounded-2xl bg-[#F4F8F6] px-4 py-3">
                <p className="text-xs font-semibold text-[#4C5B55]">
                  Our team will review your details and
                  contact you soon.
                </p>
              </div>
            )}

            {/* Button */}

            <button
              type="button"
              onClick={closePopup}
              className={`mt-6 w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 ${
                popup.type === "success"
                  ? "bg-[#007A43] hover:bg-[#006A3A]"
                  : "bg-[#F76500] hover:bg-[#e85b00]"
              }`}
            >
              {popup.type === "success"
                ? "Done"
                : "Try Again"}
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default AgencyRequestForm;