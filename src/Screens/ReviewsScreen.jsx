/* eslint-disable */

import { useNavigate } from "react-router-dom";
import CategoryItem from "../Componants/CategoryItem";
import Header from "../Componants/Header";
import Heading from "../Componants/Headnig";
import useCategories from "../Context/CategoriesContext";
import OfferCard from "../Componants/Cards/OfferCard";
import offer1 from "../assets/offer1.png";
import offer2 from "../assets/offer2.png";
import ReviewCard from "../Componants/Cards/ReviewCard";
import Footer from "../Componants/Footer";
import useReviews from "../Context/ReviewsContext";

function ReviewsScreen() {
  const { allCategories, loading } = useCategories();
  const { popularReviews, popularReviewsloading } = useReviews();

  const navigate = useNavigate();
  if (loading || popularReviewsloading) {
    return <div>Loading...</div>;
  }

  // // console.log(popularReviews);

  return (
    <div>
      <Header></Header>
      <div className="mx-12 h-auto">
        <Heading
          className="mt-28 my-8 text-orange-500"
          value1="Reviews"
        ></Heading>

        <div className="h-full w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mb-60">
          {popularReviews && popularReviews.length > 0 ? (
            popularReviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                reviewId={review.reviewId} // Pass the reviewId here
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
                brandId={review.Brand.brandId} // Pass additional brand data here
                brandImage={review.Brand.logo} // Pass brand image or other data if available
              />
            ))
          ) : (
            <div>No Offers available</div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ReviewsScreen;
