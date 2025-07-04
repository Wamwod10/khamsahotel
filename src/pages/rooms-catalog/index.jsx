import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FilterBar from './components/FilterBar';
import RoomGrid from './components/RoomGrid';
import BookingModal from './components/BookingModal';
import Icon from '../../components/AppIcon';

const RoomsCatalog = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    capacity: '',
    amenities: [],
    availability: 'all',
    checkIn: '',
    checkOut: ''
  });
  const [sortBy, setSortBy] = useState('price-low');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock rooms data
  const mockRooms = [
    {
      id: 1,
      name: "Standard Room",
      nameUz: "Standart Xona",
      nameRu: "Стандартный номер",
      description: "Comfortable and well-appointed room with modern amenities for a pleasant stay.",
      descriptionUz: "Zamonaviy qulayliklar bilan jihozlangan qulay va yaxshi jihozlangan xona.",
      descriptionRu: "Удобный и хорошо оборудованный номер с современными удобствами для приятного отдыха.",
      price: 120,
      capacity: 2,
      beds: 1,
      bathrooms: 1,
      isAvailable: true,
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "Air Conditioning", nameUz: "Konditsioner", nameRu: "Кондиционер", icon: "Wind" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Minibar", nameUz: "Minibar", nameRu: "Мини-бар", icon: "Coffee" },
        { name: "Safe", nameUz: "Seyf", nameRu: "Сейф", icon: "Shield" }
      ]
    },
    {
      id: 2,
      name: "Family Room",
      nameUz: "Oilaviy Xona",
      nameRu: "Семейный номер",
      description: "Spacious family room perfect for families with children, featuring separate sleeping areas.",
      descriptionUz: "Bolali oilalar uchun ideal bo\'lgan, alohida yotoq joylari bilan keng oilaviy xona.",
      descriptionRu: "Просторный семейный номер, идеально подходящий для семей с детьми, с отдельными спальными зонами.",
      price: 180,
      capacity: 4,
      beds: 2,
      bathrooms: 1,
      isAvailable: true,
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "Air Conditioning", nameUz: "Konditsioner", nameRu: "Кондиционер", icon: "Wind" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Minibar", nameUz: "Minibar", nameRu: "Мини-бар", icon: "Coffee" },
        { name: "Balcony", nameUz: "Balkon", nameRu: "Балкон", icon: "Home" },
        { name: "Kitchenette", nameUz: "Kichik oshxona", nameRu: "Мини-кухня", icon: "ChefHat" }
      ]
    },
    {
      id: 3,
      name: "Deluxe Room",
      nameUz: "Deluxe Xona",
      nameRu: "Номер Делюкс",
      description: "Luxurious room with premium amenities and stunning city views for an unforgettable experience.",
      descriptionUz: "Unutilmas tajriba uchun premium qulayliklar va ajoyib shahar manzaralari bilan hashamatli xona.",
      descriptionRu: "Роскошный номер с премиальными удобствами и потрясающим видом на город для незабываемых впечатлений.",
      price: 250,
      capacity: 2,
      beds: 1,
      bathrooms: 1,
      isAvailable: false,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "Air Conditioning", nameUz: "Konditsioner", nameRu: "Кондиционер", icon: "Wind" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Minibar", nameUz: "Minibar", nameRu: "Мини-бар", icon: "Coffee" },
        { name: "Balcony", nameUz: "Balkon", nameRu: "Балкон", icon: "Home" },
        { name: "Jacuzzi", nameUz: "Jakuzi", nameRu: "Джакузи", icon: "Bath" },
        { name: "Room Service", nameUz: "Xona xizmati", nameRu: "Обслуживание номеров", icon: "Utensils" }
      ]
    },
    {
      id: 4,
      name: "Executive Suite",
      nameUz: "Ijroiya Lyuks",
      nameRu: "Исполнительный люкс",
      description: "Premium suite with separate living area, perfect for business travelers and special occasions.",
      descriptionUz: "Biznes sayohatchilari va maxsus holatlar uchun ideal bo'lgan, alohida yashash maydoni bilan premium lyuks.",
      descriptionRu: "Премиум-люкс с отдельной гостиной, идеально подходящий для деловых путешественников и особых случаев.",
      price: 350,
      capacity: 3,
      beds: 1,
      bathrooms: 2,
      isAvailable: true,
      images: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "Air Conditioning", nameUz: "Konditsioner", nameRu: "Кондиционер", icon: "Wind" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Minibar", nameUz: "Minibar", nameRu: "Мини-бар", icon: "Coffee" },
        { name: "Balcony", nameUz: "Balkon", nameRu: "Балкон", icon: "Home" },
        { name: "Work Desk", nameUz: "Ish stoli", nameRu: "Рабочий стол", icon: "Laptop" },
        { name: "Butler Service", nameUz: "Butler xizmati", nameRu: "Услуги дворецкого", icon: "User" }
      ]
    },
    {
      id: 5,
      name: "Economy Room",
      nameUz: "Iqtisodiy Xona",
      nameRu: "Эконом номер",
      description: "Budget-friendly room with essential amenities for comfortable and affordable stay.",
      descriptionUz: "Qulay va arzon yashash uchun zarur qulayliklar bilan byudjetga mos xona.",
      descriptionRu: "Бюджетный номер с необходимыми удобствами для комфортного и доступного проживания.",
      price: 80,
      capacity: 1,
      beds: 1,
      bathrooms: 1,
      isAvailable: true,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Safe", nameUz: "Seyf", nameRu: "Сейф", icon: "Shield" }
      ]
    },
    {
      id: 6,
      name: "Presidential Suite",
      nameUz: "Prezident Lyuksi",
      nameRu: "Президентский люкс",
      description: "Ultimate luxury suite with panoramic views, private terrace, and exclusive amenities.",
      descriptionUz: "Panoramik ko\'rinishlar, shaxsiy teras va eksklyuziv qulayliklar bilan yakuniy hashamat lyuksi.",
      descriptionRu: "Роскошный люкс с панорамными видами, частной террасой и эксклюзивными удобствами.",
      price: 500,
      capacity: 4,
      beds: 2,
      bathrooms: 3,
      isAvailable: true,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop"
      ],
      amenities: [
        { name: "Wi-Fi", nameUz: "Wi-Fi", nameRu: "Wi-Fi", icon: "Wifi" },
        { name: "Air Conditioning", nameUz: "Konditsioner", nameRu: "Кондиционер", icon: "Wind" },
        { name: "TV", nameUz: "Televizor", nameRu: "Телевизор", icon: "Tv" },
        { name: "Minibar", nameUz: "Minibar", nameRu: "Мини-бар", icon: "Coffee" },
        { name: "Balcony", nameUz: "Balkon", nameRu: "Балкон", icon: "Home" },
        { name: "Jacuzzi", nameUz: "Jakuzi", nameRu: "Джакузи", icon: "Bath" },
        { name: "Private Chef", nameUz: "Shaxsiy oshpaz", nameRu: "Личный повар", icon: "ChefHat" },
        { name: "Concierge", nameUz: "Konsyerj", nameRu: "Консьерж", icon: "User" }
      ]
    }
  ];

  const [filteredRooms, setFilteredRooms] = useState(mockRooms);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleBookingModal = () => {
      setIsBookingModalOpen(true);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('openBookingModal', handleBookingModal);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('openBookingModal', handleBookingModal);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...mockRooms];

      // Apply filters
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
        filtered = filtered.filter(room => 
          room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1]
        );
      }

      if (filters.capacity) {
        filtered = filtered.filter(room => room.capacity >= parseInt(filters.capacity));
      }

      if (filters.amenities.length > 0) {
        filtered = filtered.filter(room =>
          filters.amenities.some(amenity =>
            room.amenities.some(roomAmenity => 
              roomAmenity.name.toLowerCase().includes(amenity) ||
              roomAmenity.nameUz?.toLowerCase().includes(amenity) ||
              roomAmenity.nameRu?.toLowerCase().includes(amenity)
            )
          )
        );
      }

      if (filters.availability !== 'all') {
        filtered = filtered.filter(room => 
          filters.availability === 'available' ? room.isAvailable : !room.isAvailable
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'capacity':
          filtered.sort((a, b) => b.capacity - a.capacity);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      setFilteredRooms(filtered);
      setIsLoading(false);
    }, 500);
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
  };

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xonalar katalogi';
      case 'ru': return 'Каталог номеров';
      default: return 'Rooms Catalog';
    }
  };

  const getPageDescription = () => {
    switch (currentLanguage) {
      case 'uz': return 'Bizning barcha xona turlarimizni ko\'ring va o\'zingizga mos kelganini tanlang';
      case 'ru': return 'Просмотрите все наши типы номеров и выберите подходящий для вас';
      default: return 'Browse all our room types and find the perfect one for your stay';
    }
  };

  const getRoomsFoundLabel = () => {
    const count = filteredRooms.length;
    switch (currentLanguage) {
      case 'uz': return `${count} ta xona topildi`;
      case 'ru': return `Найдено ${count} номеров`;
      default: return `${count} rooms found`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        currentLanguage={currentLanguage}
        onSortChange={handleSortChange}
        sortBy={sortBy}
        isMobile={isMobile}
      />

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">
            {getRoomsFoundLabel()}
          </p>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Grid3X3" size={16} />
            <span className="text-sm">Grid View</span>
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <RoomGrid
          rooms={filteredRooms}
          currentLanguage={currentLanguage}
          onBookNow={handleBookNow}
          isLoading={isLoading}
        />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        room={selectedRoom}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default RoomsCatalog;