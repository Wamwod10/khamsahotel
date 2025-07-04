import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ReviewSummary from './components/ReviewSummary';
import ReviewFilters from './components/ReviewFilters';
import ReviewCard from './components/ReviewCard';
import WriteReviewModal from './components/WriteReviewModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ReviewsAndTestimonials = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    rating: 'all',
    type: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const reviewsPerPage = 6;

  // Mock data for reviews summary
  const reviewSummary = {
    averageRating: 4.6,
    totalReviews: 1247,
    distribution: [
      { rating: 5, count: 892 },
      { rating: 4, count: 234 },
      { rating: 3, count: 87 },
      { rating: 2, count: 23 },
      { rating: 1, count: 11 }
    ],
    locationRating: 4.8,
    cleanlinessRating: 4.7,
    serviceRating: 4.5,
    valueRating: 4.4
  };

  // Mock data for reviews
  const mockReviews = [
    {
      id: 1,
      guestName: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: new Date('2024-01-15'),
      verified: true,
      featured: true,
      roomType: "Deluxe Room",
      stayDuration: "3 nights",
      comment: `Exceptional experience at Khamsa Hotel! The staff was incredibly welcoming and professional from check-in to check-out. The room was spacious, clean, and beautifully decorated with modern amenities. The location is perfect for exploring the city, and the breakfast buffet exceeded our expectations. I particularly loved the attention to detail in every aspect of the service. The concierge helped us plan our daily activities and made excellent restaurant recommendations. The spa facilities were also top-notch. Will definitely return on our next visit!`,
      helpfulCount: 24,
      managementResponse: "Dear Sarah, thank you so much for your wonderful review! We're thrilled that you enjoyed your stay with us. Your kind words about our staff and facilities mean the world to us. We look forward to welcoming you back soon! - Management Team"
    },
    {
      id: 2,
      guestName: "Ahmed Hassan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      date: new Date('2024-01-12'),
      verified: true,
      featured: false,
      roomType: "Standard Room",
      stayDuration: "2 nights",
      comment: `Great hotel with excellent service. The room was comfortable and clean. Staff was very helpful and friendly. The only minor issue was the Wi-Fi speed in the room, but overall a pleasant stay. The restaurant food was delicious and the location is convenient for business meetings.`,
      helpfulCount: 18,
      managementResponse: null
    },
    {
      id: 3,
      guestName: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: new Date('2024-01-10'),
      verified: true,
      featured: false,
      roomType: "Family Suite",
      stayDuration: "4 nights",
      comment: `Perfect family vacation! The family suite was spacious enough for our family of four. Kids loved the pool area and the hotel's location near attractions. Breakfast variety was impressive and staff went above and beyond to make our stay memorable. Highly recommend for families!`,
      helpfulCount: 31,
      managementResponse: "Thank you Maria! We\'re so happy your family had a wonderful time. We hope to see you all again soon! - Management Team"
    },
    {
      id: 4,
      guestName: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      date: new Date('2024-01-08'),
      verified: false,
      featured: false,
      roomType: "Standard Room",
      stayDuration: "1 night",
      comment: `Good value for money. Clean rooms, friendly staff, and decent breakfast. The hotel is well-maintained and the check-in process was smooth. Would stay again for business trips.`,
      helpfulCount: 12,
      managementResponse: null
    },
    {
      id: 5,
      guestName: "Elena Petrov",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: new Date('2024-01-05'),
      verified: true,
      featured: true,
      roomType: "Deluxe Room",
      stayDuration: "5 nights",
      comment: `Outstanding hotel experience! From the moment we arrived, we felt welcomed and valued as guests. The room was beautifully appointed with luxurious amenities. The spa services were exceptional, and the restaurant served some of the best local cuisine we've had. The staff's attention to detail and personalized service made our anniversary celebration truly special.`,helpfulCount: 45,managementResponse: "Dear Elena, congratulations on your anniversary! We're honored to have been part of your special celebration. Thank you for choosing us and for your lovely review. - Management Team"
    },
    {
      id: 6,
      guestName: "Michael Thompson",avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 3,
      date: new Date('2024-01-03'),
      verified: true,
      featured: false,
      roomType: "Standard Room",stayDuration: "2 nights",comment: `Average stay. The room was clean but a bit dated. Service was okay but not exceptional. The location is good and parking was convenient. Breakfast could use more variety. It's a decent option but there might be better alternatives in the area.`,helpfulCount: 8,managementResponse: "Thank you for your feedback, Michael. We appreciate your honest review and will work on improving the areas you mentioned. We hope to provide you with a better experience in the future. - Management Team"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getPageLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Sharhlar va Guvohliklar',
          description: 'Khamsa Hotel mehmonlarining haqiqiy fikrlari va tajribalari',
          writeReview: 'Sharh yozish',
          loadMore: 'Ko\'proq yuklash',
          loading: 'Yuklanmoqda...',
          noReviews: 'Hozircha sharhlar yo\'q',
          reviewSubmitted: 'Sharhingiz muvaffaqiyatli yuborildi!',
          helpful: 'Foydali',
          report: 'Shikoyat'
        };
      case 'ru':
        return {
          title: 'Отзывы и Рекомендации',
          description: 'Реальные отзывы и опыт гостей отеля Khamsa',
          writeReview: 'Написать отзыв',
          loadMore: 'Загрузить еще',
          loading: 'Загрузка...',
          noReviews: 'Пока нет отзывов',
          reviewSubmitted: 'Ваш отзыв успешно отправлен!',
          helpful: 'Полезно',
          report: 'Пожаловаться'
        };
      default:
        return {
          title: 'Reviews & Testimonials',
          description: 'Real experiences and feedback from Khamsa Hotel guests',
          writeReview: 'Write a Review',
          loadMore: 'Load More',
          loading: 'Loading...',
          noReviews: 'No reviews yet',
          reviewSubmitted: 'Your review has been submitted successfully!',
          helpful: 'Helpful',
          report: 'Report'
        };
    }
  };

  const labels = getPageLabels();

  const filterReviews = (reviews) => {
    let filtered = [...reviews];

    // Filter by rating
    if (filters.rating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filters.rating));
    }

    // Filter by type
    if (filters.type !== 'all') {
      switch (filters.type) {
        case 'verified':
          filtered = filtered.filter(review => review.verified);
          break;
        case 'business':
          filtered = filtered.filter(review => review.roomType === 'Standard Room');
          break;
        case 'families':
          filtered = filtered.filter(review => review.roomType === 'Family Suite');
          break;
        case 'couples':
          filtered = filtered.filter(review => review.roomType === 'Deluxe Room');
          break;
        default:
          break;
      }
    }

    // Sort reviews
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return filtered;
  };

  const filteredReviews = filterReviews(mockReviews);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(0, currentPage * reviewsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  const handleHelpfulVote = (reviewId) => {
    // In a real app, this would make an API call
    console.log('Voted helpful for review:', reviewId);
  };

  const handleReportReview = (reviewId) => {
    // In a real app, this would open a report modal or make an API call
    console.log('Reported review:', reviewId);
  };

  const handleSubmitReview = (reviewData) => {
    // In a real app, this would make an API call
    console.log('New review submitted:', reviewData);
    alert(labels.reviewSubmitted);
  };

  return (
    <>
      <Helmet>
        <title>{labels.title} - Khamsa Hotel</title>
        <meta name="description" content={labels.description} />
        <meta name="keywords" content="hotel reviews, testimonials, guest feedback, Khamsa Hotel" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {labels.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {labels.description}
              </p>
              
              <Button
                variant="secondary"
                onClick={() => setIsWriteReviewOpen(true)}
                iconName="PenTool"
                iconPosition="left"
                className="bg-white text-primary hover:bg-gray-50"
              >
                {labels.writeReview}
              </Button>
            </div>
          </section>

          {/* Reviews Content */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Review Summary */}
              <ReviewSummary 
                summary={reviewSummary} 
                currentLanguage={currentLanguage} 
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <ReviewFilters
                    currentLanguage={currentLanguage}
                    onFilterChange={handleFilterChange}
                    activeFilters={filters}
                  />
                </div>

                {/* Reviews Grid */}
                <div className="lg:col-span-3">
                  {currentReviews.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                        {currentReviews.map((review) => (
                          <ReviewCard
                            key={review.id}
                            review={review}
                            currentLanguage={currentLanguage}
                            onHelpfulVote={handleHelpfulVote}
                            onReportReview={handleReportReview}
                          />
                        ))}
                      </div>

                      {/* Load More Button */}
                      {currentPage < totalPages && (
                        <div className="text-center">
                          <Button
                            variant="outline"
                            onClick={handleLoadMore}
                            loading={isLoading}
                            iconName="ChevronDown"
                            iconPosition="right"
                            className="px-8"
                          >
                            {isLoading ? labels.loading : labels.loadMore}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <Icon name="MessageSquare" size={64} className="mx-auto text-text-secondary mb-4" />
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {labels.noReviews}
                      </h3>
                      <p className="text-text-secondary mb-6">
                        Be the first to share your experience!
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => setIsWriteReviewOpen(true)}
                        iconName="PenTool"
                        iconPosition="left"
                      >
                        {labels.writeReview}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Write Review Modal */}
        <WriteReviewModal
          isOpen={isWriteReviewOpen}
          onClose={() => setIsWriteReviewOpen(false)}
          currentLanguage={currentLanguage}
          onSubmitReview={handleSubmitReview}
        />
      </div>
    </>
  );
};

export default ReviewsAndTestimonials;