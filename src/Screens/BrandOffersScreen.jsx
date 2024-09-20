/* eslint-disable */
import { useLocation } from "react-router-dom";
import Header from "../Componants/Header";
import BrandState from "../Componants/BrandState";
import Heading from "../Componants/Headnig";
import useBrands from "../Context/BrandsContext";
import PrimaryButton from "../Componants/PrimaryButton";
import Title from "../Componants/Title";
import OfferCard from "../Componants/Cards/OfferCard";
import Footer from "../Componants/Footer";
import { IoCall } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import { TbWorld } from "react-icons/tb";
import { AuthContext } from "../Context/AuthContext";
import brand2 from "../assets/brand2.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function BrandOffersScreen() {
  const { userId } = useContext(AuthContext);
  const { allBrands, brandLoading } = useBrands();
  const location = useLocation();
  const { brand } = location.state || {};
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(true);

  // Fetch offers related to the brand
  const fetchBrandOffers = () => {
    if (brand && brand.brandId) {
      axios({
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
        },
        method: "get",
        url: `${
          import.meta.env.VITE_APP_MAIN_API_LINK
        }/api/offers/brandoffers/${brand.brandId}`,
      })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setOffers(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching offers:", error);
          setOffers([]);
        })
        .finally(() => {
          setOffersLoading(false);
        });
    }
  };

  // Call the fetch function when the component mounts or brand changes
  useEffect(() => {
    fetchBrandOffers();
  }, [brand]);

  if (brandLoading || offersLoading) {
    return <div>Loading...</div>;
  }

  if (!brand) {
    return <div>No brand data available</div>;
  }

  return (
    <div className="bg-slate-100">
      <Header />

      {/* Brand Banner Section */}
      <motion.img
        className="w-full h-72 md:h-96 lg:h-[530px] xl:h-[530px] object-cover"
        src={brand.photos || brand2} // Placeholder if no brand photo
        alt={brand.brandName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Brand Info and Logo Section */}
      <div className="w-full h-72 -mt-16 md:-mt-32 grid grid-cols-3 gap-4 justify-center items-center">
        {/* Brand Logo and Name */}
        <motion.div
          className="w-full h-full flex col-span-3 md:col-span-2 justify-between md:justify-start items-center px-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand Logo */}
          <div
            className="w-36 h-36 lg:w-64 lg:h-64 md:w-48 md:h-48 rounded-full bg-white"
            style={{
              backgroundImage: `url(${brand.logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Brand Name and State */}
          <div className="flex flex-col items-start justify-center mx-4 mt-0 md:mt-10">
            <Heading
              className="text-orange-500 my-3"
              value1={brand.brandName}
            />
            <div className="w-full flex">
              <BrandState className="w-full justify-start" value="open" />
            </div>
          </div>
        </motion.div>

        {/* Add Review Button */}
        <motion.div
          className="flex items-center justify-center col-span-3 md:col-span-1 md:pr-12 md:pl-0 px-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <PrimaryButton
            className="text-xl lg:text-2xl xl:text-2xl font-bold md:mt-12"
            name="Add Review"
            to={userId ? `/addbrandreview/${brand.brandId}` : `/login`}
          />
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-3 mx-12 py-4 gap-x-9 mb-12">
        {/* Offers Section */}
        <div className="col-span-3 xl:col-span-2 lg:col-span-2 gap-y-8">
          {/* Offers Heading */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              className="text-xl md:text-3xl xl:text-4xl font-bold"
              title="Offers"
            />
            <hr className="h-1 my-2 bg-black" />
            {/* Offers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {offers && offers.length > 0 ? (
                offers.map((offer) => (
                  <OfferCard
                    key={offer.offersId}
                    img={offer.photo}
                    offer={offer}
                    allBrands={allBrands}
                  />
                ))
              ) : (
                <div>No Offers available</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="col-span-3 lg:col-span-1 xl:col-span-1 p-2 gap-12 mt-12 self-start">
          {/* Brand Info */}
          <motion.div
            className="flex flex-col border-2 rounded-2xl p-4 border-black"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Title
              className="text-3xl lg:text-4xl text-orange-500 font-bold text-center"
              title="Info"
            />
            <div className="flex flex-col items-start w-full gap-8 py-10">
              <div className="flex gap-3">
                <i className="text-3xl">
                  <TbWorld />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href={brand.websiteLink || "#"}
                >
                  {brand.websiteLink || "No website available"}
                </a>
              </div>
              <div className="flex gap-3">
                <i className="text-3xl">
                  <ImLocation2 />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href="https://g.co/kgs/Krq42bs"
                >
                  {brand.location || "No location available"}
                </a>
              </div>
              <div className="flex gap-3">
                <i className="text-3xl">
                  <IoCall />
                </i>
                <a
                  className="text-md xl:text-2xl font-semibold underline text-slate-600 hover:text-blue-900"
                  href={`tel:${brand.phone || "No phone available"}`}
                >
                  {brand.phone || "No phone available"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BrandOffersScreen;
