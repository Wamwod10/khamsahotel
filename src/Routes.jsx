import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeLandingPage from "pages/home-landing-page";
import ServicesInformation from "pages/services-information";
import ReviewsAndTestimonials from "pages/reviews-and-testimonials";
import ContactAndLocation from "pages/contact-and-location";
import RoomsCatalog from "pages/rooms-catalog";
import BookingModal from "pages/booking-modal";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/services-information" element={<ServicesInformation />} />
        <Route path="/reviews-and-testimonials" element={<ReviewsAndTestimonials />} />
        <Route path="/contact-and-location" element={<ContactAndLocation />} />
        <Route path="/rooms-catalog" element={<RoomsCatalog />} />
        <Route path="/gallery" element={<NotFound />} />
        <Route path="/booking-modal" element={<BookingModal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;