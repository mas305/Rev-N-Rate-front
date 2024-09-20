/* eslint-disable */
import { useLocation } from "react-router-dom";
import Header from "../Componants/Header";
import BrandState from "../Componants/BrandState";
import Heading from "../Componants/Headnig";
import PrimaryButton from "../Componants/PrimaryButton";
import Title from "../Componants/Title";
import Footer from "../Componants/Footer";
import { IoCall } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import { TbWorld } from "react-icons/tb";
import { AuthContext } from "../Context/AuthContext";
import BrandReviewCard from "../Componants/Cards/BrandReviewCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion for animation

function BrandReviewsScreen() {
  const { userId } = useContext(AuthContext); // Current user context
  const location = useLocation();
  const [reviews, setReviews] = useState([]); // State to store reviews data
  const [reviewsLoading, setReviewsLoading] = useState(true); // Loading state for reviews
  const { brand } = location.state || {}; // Destructure brand from location state

  // Fetch the brand reviews based on the brand ID
  const fetchBrandReviews = () => {
    if (brand && brand.brandId) {
      axios({
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`, // Authorization header for the API request
        },
        method: "get",
        url: `${
          import.meta.env.VITE_APP_MAIN_API_LINK
        }/api/reviews/brandReviews/${brand.brandId}`,
      })
        .then((response) => {
          if (Array.isArray(response.data.Data)) {
            setReviews(response.data.Data); // Update reviews state with fetched data
          }
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          setReviews([]); // Fallback for error
        })
        .finally(() => {
          setReviewsLoading(false); // Stop the loading state
        });
    }
  };

  // Fetch reviews on component mount or when the brand changes
  useEffect(() => {
    fetchBrandReviews();
  }, [brand]);

  // Render a message if no brand data is available
  if (!brand) {
    return <div>No brand data available</div>;
  }

  return (
    <motion.div
      className="bg-slate-100"
      initial={{ opacity: 0 }} // Initial animation state
      animate={{ opacity: 1 }} // Final animation state
      transition={{ duration: 0.5 }} // Transition duration
    >
      <Header />

      {/* Brand Image */}
      <motion.img
        className="w-full h-72 md:h-96 lg:h-530px xl:h-530px object-cover"
        src={brand.photos}
        alt={brand.brandName}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Brand Name & Logo Section */}
      <motion.div
        className="w-full h-72 -mt-16 md:-mt-32 grid grid-cols-3 gap-4 justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Brand Logo */}
        <div className="w-full h-full flex col-span-3 md:col-span-2 justify-between md:justify-start items-center px-8">
          <div
            className="w-36 h-36 lg:w-64 lg:h-64 md:w-48 md:h-48 rounded-full bg-white"
            style={{
              backgroundImage: `url(${brand.logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col items-start justify-center mx-4 mt-0 md:mt-10">
            <Heading
              className="text-orange-500 my-3"
              value1={brand.brandName}
            />
            <div className="w-full flex">
              <BrandState className="w-full justify-start" value="open" />
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="flex items-center justify-center col-span-3 md:col-span-1 md:pr-12 md:pl-0 px-12">
          <PrimaryButton
            className="text-xl lg:text-2xl xl:text-2xl font-bold md:mt-12"
            name="Add Review"
            to={userId ? `/addbrandreview/${brand.brandId}` : `/login`}
          />
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="grid grid-cols-3 mx-12 py-4 gap-x-9 mb-12">
        {/* Reviews Section */}
        <motion.div
          className="grid col-span-3 xl:col-span-2 lg:col-span-2 md:col-span-3 gap-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full">
            <div className="flex items-end justify-between">
              <Title
                className="text-xl md:text-3xl xl:text-4xl font-bold"
                title="Reviews"
              />
            </div>

            <hr className="h-0.5 my-2 bg-black" />

            {/* Reviews Display */}
            {reviews.length === 0 ? (
              <div className="text-lg text-center py-4">
                No available reviews
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.3 }}
              >
                {reviews.map((review) => (
                  <BrandReviewCard
                    key={review.reviewId}
                    reviewId={review.reviewId}
                    content={review.comments}
                    rate={review.quality}
                    date={review.date}
                    brand={brand.brandName}
                    details={review.details}
                    service={review.service}
                    photos={review.photos}
                    dislikes={review.dislikes}
                    likes={review.likes}
                    brandId={
                      review.Brand ? review.Brand.brandId : brand.brandId
                    }
                    brandImage={review.Brand ? review.Brand.image : brand.logo}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Brand Info Section */}
        <motion.div
          className="grid sticky top-4 grid-cols-1 col-span-3 lg:col-span-1 xl:col-span-1 p-2 gap-12 mt-12 self-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col border-2 rounded-2xl p-4 border-black">
            <Title
              className="text-3xl lg:text-4xl text-orange-500 font-bold text-center"
              title="Info"
            />
            <div className="flex flex-col items-start w-full gap-20 py-10">
              <div className="flex gap-3">
                <i className="text-3xl">
                  <TbWorld />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href=""
                >
                  {brand.website || "Website Not Available"}
                </a>
              </div>
              <div className="flex gap-3">
                <i className="text-3xl">
                  <ImLocation2 />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href=""
                >
                  {brand.location || "Location Not Available"}
                </a>
              </div>
              <div className="flex gap-3">
                <i className="text-3xl">
                  <IoCall />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href=""
                >
                  {brand.contact || "Contact Not Available"}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default BrandReviewsScreen;
