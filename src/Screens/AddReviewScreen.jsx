/* eslint-disable */

import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import Header from "../Componants/Header";
import brand1 from "../assets/image1.jpg";
import Heading from "../Componants/Headnig";
import Title from "../Componants/Title";
import Footer from "../Componants/Footer";
import PrimaryButton from "../Componants/PrimaryButton";
import useBrands from "../Context/BrandsContext";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function AddReviewScreen() {
  const { userId } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [comments, setComments] = useState("");
  const [quality, setQuality] = useState(0);
  const [service, setService] = useState(0);
  const [reviewerId] = useState(userId.reviewerId); // userId from AuthContext
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { brandId } = useParams();
  const location = useLocation();
  const { brand } = location.state || {}; // Fetch brand data from route state

  // Handle photo upload and preview generation
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form input
    if (!comments.trim()) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Comments are required.",
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("comments", comments);
    formData.append("quality", quality);
    formData.append("service", service);
    formData.append("reviewerId", reviewerId);
    formData.append("brandLogo", brand ? brand.logo : "");
    if (photo) {
      formData.append("photos", photo);
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_MAIN_API_LINK
        }/api/reviews/addbrandreview/${brandId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Your review has been successfully submitted!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response.data.Message || "An error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <div className="mx-24 mt-24">
        {/* Animated banner using Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full py-12 px-36 h-60"
        >
          <div
            className="w-full h-full rounded-2xl text-center flex justify-center items-center text-4xl font-bold"
            style={{
              backgroundImage: `url(${brand1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p>Share Your Experience</p>
          </div>
        </motion.div>

        <hr className="h-0.5 my-2 bg-black" />

        {/* Form Content with Motion Wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <div className="flex flex-col justify-center gap-8">
            {/* Quality & Service Rating */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col gap-8">
                <Heading className="text-start" value1="Quality" />
                <input
                  type="number"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  max={5}
                  min={0}
                  className="w-full border-2 border-black p-4 rounded-lg text-xl"
                />
              </div>
              <div className="flex flex-col gap-8">
                <Heading className="text-start" value1="Service" />
                <input
                  type="number"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  max={5}
                  min={0}
                  className="w-full border-2 border-black p-4 rounded-lg text-xl"
                />
              </div>
            </div>

            {/* Recommend Section */}
            <form action="#">
              <Title
                className="text-3xl font-semibold mt-9"
                title="Would you recommend the product to your friends?"
              />
              <div className="my-3">
                <label className="text-xl">
                  <input
                    className="w-4 h-4"
                    type="radio"
                    name="recommendation"
                    value="Of course!"
                  />
                  <span className="mx-3">Of Course!</span>
                </label>
                <label className="text-xl">
                  <input
                    className="w-4 h-4"
                    type="radio"
                    name="recommendation"
                    value="Never"
                  />
                  <span className="mx-3">Never</span>
                </label>
                <label className="text-xl">
                  <input
                    className="w-4 h-4"
                    type="radio"
                    name="recommendation"
                    value="Maybe."
                  />
                  <span className="mx-3">Maybe.</span>
                </label>
              </div>
            </form>

            {/* Review Section */}
            <div>
              <Title className="text-3xl font-semibold mt-9" title="Review" />
              <textarea
                className="bg-orange-100 w-full p-4 rounded-xl mt-4"
                id="review"
                name="review"
                rows="4"
                maxLength={200}
                placeholder="Write your opinion..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            {/* Photo Upload & Submit Button with Motion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center justify-center p-4"
            >
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <Title
                  className="text-3xl font-semibold mt-9"
                  title="Upload Photo"
                />
                <input
                  type="file"
                  id="photoUpload"
                  name="photoUpload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="my-4"
                />
                {photoPreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <img
                      src={photoPreview}
                      alt="Selected"
                      className="rounded-xl w-full h-auto"
                    />
                  </motion.div>
                )}
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    className={`bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mt-8 w-full ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default AddReviewScreen;
