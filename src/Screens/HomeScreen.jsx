/* eslint-disable */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import RevRateLogo from "../assets/logo.svg";
import brand1 from "../assets/image1.jpg";
import offer1 from "../assets/offer1.png";
import offer2 from "../assets/offer2.png";
import category5 from "../assets/category5.jpg";
import Heading from "../Componants/Headnig.jsx";
import CategoryItem from "../Componants/CategoryItem";
import Slider from "react-slick";
import Header from "../Componants/Header.jsx";
import BrandBar from "../Componants/BrandBar.jsx";
import brand2 from "../assets/category1.jpg";
import brand3 from "../assets/home.jpg";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../Context/CategoriesContext.jsx";
import useBrands from "../Context/BrandsContext.jsx";
import useOffers from "../Context/OffersContext.jsx";
import useReviews from "../Context/ReviewsContext.jsx";
import OfferCard from "../Componants/Cards/OfferCard.jsx";
import ReviewCard from "../Componants/Cards/ReviewCard.jsx";
import Footer from "../Componants/Footer.jsx";

// Slider settings for react-slick
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true, // Enable left and right navigation buttons
};

/**
 * HomeScreen Component
 * This component renders the homepage which includes:
 *  - A Hero Section with a slider showcasing brands
 *  - Categories Section
 *  - Offers Section
 *  - Popular Reviews Section
 *  - Footer
 */
export default function HomeScreen() {
  const { allCategories, loading } = useCategories();
  const { allBrands, brandLoading } = useBrands();
  const { allOffers, offersLoading } = useOffers();
  const { popularReviews, popularReviewsLoading } = useReviews();
  const navigate = useNavigate();

  // Check for loading states
  if (loading || brandLoading || offersLoading || popularReviewsLoading) {
    return <div>Loading...</div>;
  }

  // Variants for animation using Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        mass: 0.5,
        damping: 10,
      },
    },
  };

  return (
    <>
      {/* Hero Section with Slider */}
      <motion.div
        className="bg-white flex w-full h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Header />
        <Slider {...settings} className="bg-black w-full overflow-hidden">
          {/* Slide 1 */}
          <motion.div variants={containerVariants}>
            <div
              className="h-screen flex flex-col justify-evenly items-center"
              style={{
                backgroundImage: `url(${brand1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="mt-24 text-7xl md:text-9xl text-shadow-lg font-bold tracking-tight text-orange-400">
                FOOD
              </h2>
              <BrandBar />
            </div>
          </motion.div>

          {/* Slide 2 */}
          <motion.div variants={containerVariants}>
            <div
              className="h-screen flex flex-col justify-evenly items-center"
              style={{
                backgroundImage: `url(${brand2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="mt-24 text-6xl md:text-9xl text-shadow-lg font-bold tracking-tight text-orange-400">
                DELICIOUS
              </h2>
              <BrandBar />
            </div>
          </motion.div>

          {/* Slide 3 */}
          <motion.div variants={containerVariants}>
            <div
              className="h-screen flex flex-col justify-evenly items-center"
              style={{
                backgroundImage: `url(${brand3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="mt-24 text-7xl md:text-9xl text-shadow-lg font-bold tracking-tight text-orange-400">
                Clothes
              </h2>
              <BrandBar />
            </div>
          </motion.div>
        </Slider>
      </motion.div>

      {/* Category Section */}
      <motion.div
        className="mx-12 h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Heading value1="Categories" className="my-8 text-orange-500" />

        <div className="h-full w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mb-24">
          {allCategories && allCategories.length > 0 ? (
            <>
              {allCategories.slice(0, 5).map((category) => (
                <CategoryItem
                  key={category.categoryId}
                  name={category.categoryName}
                  img={category.categoryPic}
                  onClick={() =>
                    navigate(`/getonecategory/${category.categoryId}`, {
                      state: { category },
                    })
                  }
                />
              ))}
              {/* Show all categories */}
              <CategoryItem
                className="bg-orange-500"
                name="Show all categories"
                img="path_to_image"
                onClick={() => navigate("/categories")}
              />
            </>
          ) : (
            <div>No categories available</div>
          )}
        </div>
      </motion.div>

      {/* Offers Section */}
      <motion.div
        className="mx-12 h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Heading
          value1="Offers"
          to={"/Offers"}
          className="my-8 text-orange-500"
        />

        <div className="h-full w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mb-24">
          {allOffers && allOffers.length > 0 ? (
            <>
              {allOffers.slice(0, 5).map((offer) => (
                <OfferCard
                  key={offer.offersId}
                  offer={offer}
                  img={offer.photo}
                  allBrands={allBrands}
                />
              ))}
              {/* Show all offers */}
              <CategoryItem
                name={
                  <>
                    Show
                    <br />
                    all
                    <br />
                    Offers
                  </>
                }
                className="h-full p-6 md:px-6 bg-orange-500 rounded-lg "
                onClick={() => navigate(`/offers`)}
              />
            </>
          ) : (
            <div>No Offers available</div>
          )}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="mx-12 h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Heading value1="Popular Reviews" className="my-8 text-orange-500" />

        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-9 mb-12">
          {popularReviews && popularReviews.length > 0 ? (
            <>
              {popularReviews.slice(0, 5).map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  reviewId={review.reviewId}
                  content={review.comments}
                  rete={review.quality}
                  date={review.date}
                  brand={review.Brand.brandName}
                  logo={review.Brand.logo}
                  profilePic={review.reviewer.profilePic}
                  details={review.details}
                  service={review.service}
                  photos={review.photos}
                  dislikes={review.dislikes}
                  likes={review.likes}
                  brandId={review.Brand.brandId}
                  brandImage={review.Brand.logo}
                />
              ))}
              {/* Show all reviews */}
              <CategoryItem
                name={
                  <>
                    Show
                    <br />
                    all
                    <br />
                    Reviews
                  </>
                }
                className="h-full p-6 md:px-6 bg-orange-500 rounded-3xl"
                onClick={() => navigate(`/reviews`)}
              />
            </>
          ) : (
            <div>No Reviews available</div>
          )}
        </div>
      </motion.div>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
