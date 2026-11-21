import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const initialFormData = {
  treatment: "",
  propertyType: "",
  propertySubType: "",
  propertySize: "",
  address: "",
  pincode: "",
  priceRange: "",
  name: "",
  mobile: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
};

const propertySubTypes = {
  Residential: [
    "Apartment / Flat",
    "Independent House",
    "Villa",
    "Row House",
    "PG / Hostel",
  ],
  Commercial: [
    "Office",
    "Retail Shop",
    "Warehouse",
    "Factory",
    "Clinic / Salon",
  ],
  Restaurant: [
    "Restaurant",
    "Cafe",
    "Fast Food",
    "Cloud Kitchen",
    "Bakery",
    "Food Court / Kiosk",
  ],
};

const propertyPriceRanges = {
  Residential: ["₹1,000 – ₹2,500", "₹2,500 – ₹5,000", "₹5,000+"],
  Commercial: ["As per the sq. ft."],
  Restaurant: ["As per the sq. ft."],
};

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayLocalDate = () => formatLocalDate(new Date());

const getOneMonthFromToday = () => {
  const today = new Date();
  const targetMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const lastDayOfTargetMonth = new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth() + 1,
    0
  ).getDate();

  targetMonth.setDate(
    Math.min(today.getDate(), lastDayOfTargetMonth)
  );

  return formatLocalDate(targetMonth);
};

const baseInputClass =
  "block h-[50px] w-full min-w-0 rounded-xl sm:rounded-[15px] border border-[#D5DED9] bg-white px-3.5 sm:px-4 text-base text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#007A43] focus:ring-2 focus:ring-[#007A43]/10 disabled:cursor-not-allowed disabled:bg-gray-100";

const labelClass =
  "mb-2 block text-[11px] font-extrabold tracking-[0.5px] text-[#4D5C56]";

const PestRequestForm = ({ selectedTreatment }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const today = getTodayLocalDate();
  const maxDate = getOneMonthFromToday();

  // Checklist PDF location
  const checklistUrl = `${
    import.meta.env.BASE_URL
  }PestFind_Enhanced_Illustrated_Checklist_Final.pdf`;

  // Handle selected treatment
  useEffect(() => {
    if (!selectedTreatment) return;

    setFormData((prev) => ({
      ...prev,
      treatment: selectedTreatment,
    }));

    setErrors((prev) => ({
      ...prev,
      treatment: "",
    }));

    setStep(1);
  }, [selectedTreatment]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    let finalValue = value;

    if (name === "mobile") {
      finalValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pincode") {
      finalValue = value.replace(/\D/g, "").slice(0, 6);
    }

    if (name === "name") {
      finalValue = value
        .replace(/[^a-zA-Z\s.'-]/g, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);
    }

    if (name === "propertySize") {
      finalValue = value.replace(/\D/g, "").slice(0, 7);
    }

    // Reset dependent fields when property type changes
    if (name === "propertyType") {
      setFormData((prev) => ({
        ...prev,
        propertyType: finalValue,
        propertySubType: "",
        priceRange: "",
      }));

      setErrors((prev) => ({
        ...prev,
        propertyType: "",
        propertySubType: "",
        priceRange: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // STEP 1 VALIDATION
  const validateStep1 = () => {
    const newErrors = {};
    const propertySize = Number(formData.propertySize);

    if (!formData.treatment) {
      newErrors.treatment =
        "Please select a treatment or pest type.";
    }

    if (!formData.propertyType) {
      newErrors.propertyType =
        "Please select a property type.";
    }

    if (!formData.propertySubType) {
      newErrors.propertySubType =
        "Please select a property sub-type.";
    }

    if (!formData.propertySize) {
      newErrors.propertySize =
        "Please enter the property area.";
    } else if (propertySize <= 0) {
      newErrors.propertySize =
        "Area must be greater than 0 sq.ft.";
    } else if (propertySize > 1000000) {
      newErrors.propertySize =
        "Please enter a valid property area.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // STEP 2 VALIDATION
  const validateStep2 = () => {
    const newErrors = {};
    const cleanAddress = formData.address.trim();
    const pincode = formData.pincode.trim();

    if (!cleanAddress) {
      newErrors.address = "Address is required.";
    } else if (cleanAddress.length < 10) {
      newErrors.address = "Please enter a complete address.";
    } else if (cleanAddress.length > 200) {
      newErrors.address =
        "Address cannot exceed 200 characters.";
    }

    if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode =
        "Pincode must contain exactly 6 digits.";
    }

    if (!formData.priceRange) {
      newErrors.priceRange =
        "Please select a price range.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // STEP 3 VALIDATION
  const validateStep3 = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const mobile = formData.mobile.trim();
    const email = formData.email.trim();
    const preferredDate = formData.preferredDate;

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    } else if (
      !/^[A-Za-z]+(?:[.'-]?[A-Za-z]+)*(?:\s+[A-Za-z]+(?:[.'-]?[A-Za-z]+)*)*$/.test(
        name
      )
    ) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!preferredDate) {
      newErrors.preferredDate =
        "Please select a preferred date.";
    } else if (preferredDate < today) {
      newErrors.preferredDate =
        "Preferred date cannot be in the past.";
    } else if (preferredDate > maxDate) {
      newErrors.preferredDate =
        "Please select a date within the next month.";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime =
        "Please select a preferred time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // NEXT STEP
  const nextStep = () => {
    const isValid =
      step === 1 ? validateStep1() : validateStep2();

    if (!isValid) return;

    setStep((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // PREVIOUS STEP
  const previousStep = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  // CLOSE POPUP
  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      title: "",
      message: "",
    });
  };

  // FORM SUBMISSION
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(
        collection(db, "pestRequests"),
        {
          requestId: "",
          treatment: formData.treatment.trim(),
          propertyType: formData.propertyType,
          propertySubType: formData.propertySubType,
          propertySize: Number(formData.propertySize),
          address: formData.address.trim(),
          pincode: formData.pincode,
          priceRange: formData.priceRange,
          name: formData.name.trim(),
          mobile: formData.mobile,
          email: formData.email.trim().toLowerCase(),
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          createdAt: serverTimestamp(),
        }
      );

      console.log(
        "Form saved successfully! Document ID:",
        docRef.id
      );

      // Reset form after successful submission
      setFormData(initialFormData);
      setErrors({});
      setStep(1);

      // Show success popup with checklist download
      setPopup({
        show: true,
        type: "success",
        title: "Request Submitted",
        message:
          "Your pest service request has been successfully submitted. Our team will review your request and coordinate with a suitable service partner.",
      });

    } catch (error) {
      console.error("Error saving form:", error);

      setPopup({
        show: true,
        type: "error",
        title: "Submission Failed",
        message:
          "We couldn't submit your request right now. Please check your internet connection and try again.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  // INPUT ERROR CLASS
  const getInputClass = (fieldName, extraClass = "") =>
    `${baseInputClass} ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        : ""
    } ${extraClass}`;

  // ERROR MESSAGE
  const ErrorMessage = ({ field }) =>
    errors[field] ? (
      <p
        className="mt-1.5 text-xs leading-5 text-red-600"
        role="alert"
      >
        {errors[field]}
      </p>
    ) : null;

  return (
    <>
      <section
        id="pest-request-form"
        className="w-full min-w-0 rounded-2xl bg-gray-300 px-3 py-4 sm:rounded-3xl sm:px-5 sm:py-6 lg:px-8"
      >
        <div className="mx-auto flex w-full min-w-0 justify-center">
          <div className="w-full min-w-0 max-w-2xl overflow-hidden rounded-2xl bg-white px-4 py-5 shadow-sm ring-1 ring-black/5 sm:rounded-3xl sm:px-6 sm:py-7 lg:px-8">

            {/* HEADER */}
            <header className="flex items-start justify-between gap-3 sm:gap-5">
              <div className="min-w-0 flex-1">
                <p className="mb-1.5 text-[10px] font-extrabold tracking-[1.3px] text-[#007A43] sm:text-xs sm:tracking-[2px]">
                  FAST REQUEST{" "}
                  <span aria-hidden="true">•</span>{" "}
                  NO ENDLESS SEARCHING
                </p>

                <h2 className="text-xl font-bold leading-tight text-[#14231D] sm:text-2xl">
                  Get matched in 1 minute
                </h2>

                <p className="mt-2 text-sm leading-5 text-gray-500 sm:mt-3 sm:text-[15px] sm:leading-6">
                  Tell us about your place. We do the rest.
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-[#E7F4EE] px-3 py-2 text-xs font-bold text-[#007A43] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                Step {step}/3
              </div>
            </header>

            {/* PROGRESS BAR */}
            <div
              className="mt-5 flex gap-1.5 sm:mt-6 sm:gap-2"
              aria-label={`Step ${step} of 3`}
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 sm:h-2 ${
                    item <= step
                      ? "bg-[#007A43]"
                      : "bg-[#E7ECE9]"
                  }`}
                />
              ))}
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-5 sm:mt-6"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5">

                  {/* TREATMENT */}
                  <div className="min-w-0">
                    <label
                      htmlFor="treatment"
                      className={labelClass}
                    >
                      TREATMENT / PEST TYPE *
                    </label>

                    <select
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.treatment)}
                      className={getInputClass(
                        "treatment",
                        "appearance-auto"
                      )}
                    >
                      <option value="">Choose treatment</option>
                      <option value="Cockroach Control">Cockroach Control</option>
                      <option value="Termite Control">Termite Control</option>
                      <option value="Bed Bug Control">Bed Bug Control</option>
                      <option value="Rodent Control">Rodent Control</option>
                      <option value="Mosquito Control">Mosquito Control</option>
                      <option value="Ant Control">Ant Control</option>
                      <option value="General Pest Control">General Pest Control</option>
                      <option value="Not Sure">Not Sure</option>
                      <option value="Other">Other</option>
                    </select>

                    <ErrorMessage field="treatment" />
                  </div>

                  {/* PROPERTY TYPE */}
                  <div className="min-w-0">
                    <label
                      htmlFor="propertyType"
                      className={labelClass}
                    >
                      PROPERTY TYPE *
                    </label>

                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.propertyType)}
                      className={getInputClass("propertyType")}
                    >
                      <option value="">Choose property type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Restaurant">Restaurant</option>
                    </select>

                    <ErrorMessage field="propertyType" />
                  </div>

                  {/* PROPERTY SUB TYPE */}
                  {formData.propertyType && (
                    <div className="min-w-0">
                      <label
                        htmlFor="propertySubType"
                        className={labelClass}
                      >
                        PROPERTY SUB-TYPE *
                      </label>

                      <select
                        id="propertySubType"
                        name="propertySubType"
                        value={formData.propertySubType}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.propertySubType)}
                        className={getInputClass("propertySubType")}
                      >
                        <option value="">
                          Choose {formData.propertyType.toLowerCase()} type
                        </option>

                        {propertySubTypes[formData.propertyType]?.map(
                          (subType) => (
                            <option key={subType} value={subType}>
                              {subType}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage field="propertySubType" />
                    </div>
                  )}

                  {/* PROPERTY SIZE */}
                  <div className="min-w-0">
                    <label
                      htmlFor="propertySize"
                      className={labelClass}
                    >
                      AREA / PROPERTY SIZE *
                    </label>

                    <div
                      className={`flex h-[50px] min-w-0 items-center rounded-xl border bg-white transition focus-within:border-[#007A43] focus-within:ring-2 focus-within:ring-[#007A43]/10 sm:rounded-[15px] ${
                        errors.propertySize
                          ? "border-red-500"
                          : "border-[#D5DED9]"
                      }`}
                    >
                      <input
                        id="propertySize"
                        type="number"
                        name="propertySize"
                        value={formData.propertySize}
                        onChange={handleChange}
                        min="1"
                        max="1000000"
                        step="1"
                        inputMode="numeric"
                        placeholder="Enter area"
                        aria-invalid={Boolean(errors.propertySize)}
                        className="h-full min-w-0 flex-1 rounded-l-xl border-0 bg-transparent px-3.5 text-base text-gray-700 outline-none placeholder:text-gray-400 sm:rounded-l-[15px] sm:px-4"
                      />

                      <span className="shrink-0 px-3 text-sm font-semibold text-gray-500 sm:px-4 sm:text-[15px]">
                        sq.ft.
                      </span>
                    </div>

                    <ErrorMessage field="propertySize" />
                  </div>

                  {/* CONTINUE */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full rounded-full bg-[#007A43] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#006A3A] active:scale-[0.99] sm:w-auto sm:py-3"
                    >
                      Continue{" "}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-5">

                  {/* ADDRESS */}
                  <div className="min-w-0">
                    <label
                      htmlFor="address"
                      className={labelClass}
                    >
                      ADDRESS *
                    </label>

                    <input
                      id="address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      minLength={10}
                      maxLength={200}
                      autoComplete="street-address"
                      placeholder="Building, road, landmark"
                      aria-invalid={Boolean(errors.address)}
                      className={getInputClass("address")}
                    />

                    <ErrorMessage field="address" />
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4">

                    {/* PINCODE */}
                    <div className="min-w-0">
                      <label
                        htmlFor="pincode"
                        className={labelClass}
                      >
                        PINCODE *
                      </label>

                      <input
                        id="pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        autoComplete="postal-code"
                        placeholder="400001"
                        aria-invalid={Boolean(errors.pincode)}
                        className={getInputClass("pincode")}
                      />

                      <ErrorMessage field="pincode" />
                    </div>

                    {/* PRICE RANGE */}
                    <div className="min-w-0">
                      <label
                        htmlFor="priceRange"
                        className={labelClass}
                      >
                        {formData.propertyType === "Residential"
                          ? "PRICE RANGE *"
                          : "PRICING OPTION *"}
                      </label>

                      <select
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        disabled={!formData.propertyType}
                        aria-invalid={Boolean(errors.priceRange)}
                        className={getInputClass("priceRange")}
                      >
                        <option value="">
                          {!formData.propertyType
                            ? "Select property type first"
                            : formData.propertyType === "Residential"
                            ? "Choose price range"
                            : "Choose pricing option"}
                        </option>

                        {propertyPriceRanges[formData.propertyType]?.map(
                          (range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage field="priceRange" />
                    </div>
                  </div>

                  {/* NAVIGATION */}
                  <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={previousStep}
                      className="w-full rounded-full bg-[#EDF5F1] px-5 py-3.5 text-sm font-bold text-[#3C6253] transition hover:bg-[#E2EEE8] sm:w-auto sm:py-3"
                    >
                      <span aria-hidden="true">←</span> Back
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full rounded-full bg-[#007A43] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#006A3A] active:scale-[0.99] sm:w-auto sm:py-3"
                    >
                      Continue{" "}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-5">

                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4">

                    {/* NAME */}
                    <div className="min-w-0">
                      <label
                        htmlFor="name"
                        className={labelClass}
                      >
                        NAME *
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        minLength={2}
                        maxLength={50}
                        autoComplete="name"
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        className={getInputClass("name")}
                      />

                      <ErrorMessage field="name" />
                    </div>

                    {/* MOBILE */}
                    <div className="min-w-0">
                      <label
                        htmlFor="mobile"
                        className={labelClass}
                      >
                        MOBILE NUMBER *
                      </label>

                      <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        aria-invalid={Boolean(errors.mobile)}
                        className={getInputClass("mobile")}
                      />

                      <ErrorMessage field="mobile" />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="min-w-0">
                    <label
                      htmlFor="email"
                      className={labelClass}
                    >
                      EMAIL *
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={100}
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className={getInputClass("email")}
                    />

                    <ErrorMessage field="email" />
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4">

                    {/* DATE */}
                    <div className="min-w-0">
                      <label
                        htmlFor="preferredDate"
                        className={labelClass}
                      >
                        PREFERRED DATE *
                      </label>

                      <input
                        id="preferredDate"
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={today}
                        max={maxDate}
                        aria-invalid={Boolean(errors.preferredDate)}
                        className={getInputClass(
                          "preferredDate",
                          "appearance-none"
                        )}
                      />

                      <ErrorMessage field="preferredDate" />
                    </div>

                    {/* TIME */}
                    <div className="min-w-0">
                      <label
                        htmlFor="preferredTime"
                        className={labelClass}
                      >
                        PREFERRED TIME *
                      </label>

                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.preferredTime)}
                        className={getInputClass("preferredTime")}
                      >
                        <option value="">Choose time</option>
                        <option value="Morning 9AM - 12 PM">
                          Morning [9AM - 12 PM]
                        </option>
                        <option value="Afternoon 12 PM - 4 PM">
                          Afternoon [12 PM - 4 PM]
                        </option>
                        <option value="Evening 4 PM - 10 PM">
                          Evening [4 PM - 7 PM]
                        </option>
                      </select>

                      <ErrorMessage field="preferredTime" />
                    </div>
                  </div>

                  {/* NAVIGATION AND SUBMIT */}
                  <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-[#EDF5F1] px-5 py-3.5 text-sm font-bold text-[#3C6253] transition hover:bg-[#E2EEE8] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-3"
                    >
                      <span aria-hidden="true">←</span> Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-[#007A43] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#006A3A] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-3"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Find My Pest Service →"}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* FOOTER */}
            <p className="mt-5 border-t border-gray-100 px-1 pt-4 text-center text-xs leading-5 text-gray-500 sm:mt-6 sm:pt-5">
              Free request{" "}
              <span aria-hidden="true">•</span>{" "}
              No payment{" "}
              <span aria-hidden="true">•</span>{" "}
              Confirmation follows partner acceptance.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS / ERROR POPUP */}
      {popup.show && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-5 backdrop-blur-sm sm:px-5"
          onClick={closePopup}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pest-popup-title"
            aria-describedby="pest-popup-message"
            className="my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 text-center shadow-2xl sm:rounded-3xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >

            {/* POPUP ICON */}
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 ${
                popup.type === "success"
                  ? "bg-[#E7F4EE]"
                  : "bg-red-50"
              }`}
            >
              {popup.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#007A43"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>

            {/* POPUP TITLE */}
            <h3
              id="pest-popup-title"
              className="mt-4 break-words text-xl font-bold text-[#14231D] sm:mt-5 sm:text-2xl"
            >
              {popup.title}
            </h3>

            {/* POPUP MESSAGE */}
            <p
              id="pest-popup-message"
              className="mx-auto mt-3 max-w-sm break-words text-sm leading-6 text-gray-500"
            >
              {popup.message}
            </p>

            {/* SUCCESS CONTENT */}
            {popup.type === "success" && (
              <>
                {/* CONFIRMATION MESSAGE */}
                <div className="mt-5 rounded-xl bg-[#F4F8F6] px-4 py-3 sm:rounded-2xl">
                  <p className="text-xs font-semibold leading-5 text-[#4C5B55]">
                    No payment is required. We'll coordinate the next
                    steps after your request is reviewed.
                  </p>
                </div>

                {/* CHECKLIST DOWNLOAD CARD */}
                <div className="mt-5 rounded-2xl border border-[#D5E9DE] bg-[#F5FAF7] p-4 text-left sm:p-5">

                  <div className="flex items-center gap-3">

                    {/* PDF ICON */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E0F1E7]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#007A43"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="m9 15 3 3 3-3" />
                        <path d="M12 12v6" />
                      </svg>
                    </div>

                    {/* PDF DETAILS */}
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#14231D]">
                        Your Free Pest Protection Checklist
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        5-page illustrated guide for your space.
                      </p>
                    </div>
                  </div>

                  {/* DOWNLOAD BUTTON */}
                  <a
                    href={checklistUrl}
                    download="PestFind_Pest_Protection_Checklist.pdf"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#007A43] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#006A3A] hover:shadow-md active:scale-[0.98]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M12 15V3" />
                    </svg>

                    Download Free Checklist
                  </a>

                  {/* PDF FOOTER */}
                  <p className="mt-2 text-center text-[11px] text-gray-500">
                    Free PDF • 5 Pages • No registration required
                  </p>
                </div>
              </>
            )}

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closePopup}
              className={`mt-5 w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-colors duration-300 sm:mt-6 ${
                popup.type === "success"
                  ? "bg-[#007A43] hover:bg-[#006A3A]"
                  : "bg-[#F76500] hover:bg-[#e85b00]"
              }`}
            >
              {popup.type === "success" ? "Done" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PestRequestForm;