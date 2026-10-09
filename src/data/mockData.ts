import { Category, Store, Coupon } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'all', nameAr: 'الكل', nameEn: 'All', icon: 'Sparkles' },
  { id: 'restaurants', nameAr: 'المطاعم والمأكولات', nameEn: 'Restaurants', icon: 'UtensilsCrossed', badgeAr: 'خصم 25%', badgeEn: '25% OFF' },
  { id: 'groceries', nameAr: 'سوبرماركت وتموينات', nameEn: 'Groceries & Mart', icon: 'ShoppingBag' },
  { id: 'sweets', nameAr: 'كافيهات وحلويات', nameEn: 'Cafes & Desserts', icon: 'Coffee', badgeAr: 'عروض حصرية', badgeEn: 'Exclusive' },
  { id: 'pharmacy', nameAr: 'صيدلية وعناية', nameEn: 'Pharmacy & Care', icon: 'HeartPulse' },
  { id: 'parcel', nameAr: 'وصلني (طرود وطرود سريعة)', nameEn: 'Wasselli (Express Courier)', icon: 'Truck', badgeAr: 'توصيل فوري', badgeEn: 'Fast Dispatch' },
  { id: 'custom_order', nameAr: 'أطلب أي شيء', nameEn: 'Any Request (Concierge)', icon: 'Gift', badgeAr: 'مندوب خاص', badgeEn: 'Personal Shopper' },
];

export const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'ATLOBNI20', discountPercent: 20, descriptionAr: 'خصم 20% على جميع الطلبات', descriptionEn: '20% off all orders', minSpend: 30 },
  { code: 'WELCOME', discountPercent: 15, descriptionAr: 'خصم 15% للمستخدمين الجدد', descriptionEn: '15% off for new users', minSpend: 20 },
  { code: 'RAMADAN', discountPercent: 25, descriptionAr: 'خصم 25% خاص', descriptionEn: '25% special discount', minSpend: 50 },
  { code: 'FREEFAST', discountPercent: 10, descriptionAr: 'خصم 10% وتوصيل سريع', descriptionEn: '10% off and express delivery', minSpend: 25 },
];

export const MOCK_STORES: Store[] = [
  {
    id: 'store-1',
    nameAr: 'شاورما ستيشن & مشاوي الأصيل',
    nameEn: 'Shawarma Station & Grills',
    descriptionAr: 'أشهى الشاورما العربية والوجبات المشوية الطازجة مع الثومية المميزة',
    descriptionEn: 'Authentic Arabic shawarma, charcoal grills, and signature garlic dip',
    category: 'restaurants',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=160&q=80',
    rating: 4.8,
    ratingCount: 1420,
    deliveryTime: '20-30',
    deliveryFee: 5,
    minOrder: 20,
    distance: '2.1 كم',
    featured: true,
    discountBadge: '25% خصم',
    menu: [
      {
        id: 'item-101',
        nameAr: 'شاورما عربي دجاج سوبر دبل',
        nameEn: 'Super Double Chicken Shawarma Platter',
        descriptionAr: 'شاورما دجاج بخبز الصاج مع البطاطس المقلية، المخلل، وصوص الثوم الحار والعادي',
        descriptionEn: 'Tender spiced chicken in saj bread served with golden fries, pickles, and garlic sauce',
        price: 24,
        originalPrice: 30,
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
        category: 'الوجبات الأكثر طلباً',
        popular: true,
        options: [
          {
            titleAr: 'حجم الوجبة',
            titleEn: 'Size',
            required: true,
            items: [
              { nameAr: 'عادي (6 قطع)', nameEn: 'Regular (6 pcs)', price: 0 },
              { nameAr: 'كبير (10 قطع)', nameEn: 'Large (10 pcs)', price: 8 },
            ]
          },
          {
            titleAr: 'الصلصات الإضافية',
            titleEn: 'Sauce Add-ons',
            required: false,
            items: [
              { nameAr: 'ثومية إضافية', nameEn: 'Extra Garlic Dip', price: 2 },
              { nameAr: 'ثومية حارة سبيشال', nameEn: 'Spicy Garlic Dip', price: 3 },
              { nameAr: 'طحينة دبس الرمان', nameEn: 'Pomegranate Tahini', price: 3 },
            ]
          }
        ]
      },
      {
        id: 'item-102',
        nameAr: 'صحن مشاوي مشكل فاخر (شقف وكباب)',
        nameEn: 'Royal Mixed Charcoal Grill Platter',
        descriptionAr: 'سيخ كباب لحم، سيخ شيش طاووق، سيخ أوصال مع الخبز المحمص والبيواز',
        descriptionEn: 'Lamb kebab, shish tawook, and tender beef skewer with spiced flatbread and roasted vegetables',
        price: 45,
        originalPrice: 55,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        category: 'المشاوي',
        popular: true,
      },
      {
        id: 'item-103',
        nameAr: 'ساندوتش شاورما صاروخ لحم',
        nameEn: 'Jumbo Rocket Beef Shawarma',
        descriptionAr: 'لحم عجل متبل بالبهارات الشرقية مع صوص الطحينة والبقدونس والبصل والطماطم',
        descriptionEn: 'Marinated beef with traditional tahini sauce, parsley, sumac onions, and fresh tomato',
        price: 18,
        image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80',
        category: 'سندوتشات فردية',
      },
      {
        id: 'item-104',
        nameAr: 'بطاطس ودجز بالجبنة الشيدر والباربيكيو',
        nameEn: 'Loaded Cheddar Cheese Potato Wedges',
        descriptionAr: 'بطاطس مقرمشة مغطاة بجبنة الشيدر الذائبة وهلابينو حار',
        descriptionEn: 'Crispy seasoned wedges smothered in warm cheddar cheese sauce with jalapeno bites',
        price: 14,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
        category: 'المقبلات',
        spicy: true,
      }
    ]
  },
  {
    id: 'store-2',
    nameAr: 'برجر كرافت & سموك هاوس',
    nameEn: 'Craft Burger & Smokehouse',
    descriptionAr: 'برجر لحم أنجوس طازج مشوي على اللهب ووجبات كريسبي دجاج مقرمشة',
    descriptionEn: 'Smash Angus beef burgers, crispy buttermilk chicken, and handcrafted milkshakes',
    category: 'restaurants',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=160&q=80',
    rating: 4.9,
    ratingCount: 2310,
    deliveryTime: '25-35',
    deliveryFee: 4,
    minOrder: 25,
    distance: '3.4 كم',
    featured: true,
    discountBadge: 'توصيل مجاني',
    menu: [
      {
        id: 'item-201',
        nameAr: 'برجر دبل ترافل وبصل مكرمل',
        nameEn: 'Double Truffle Smash Burger',
        descriptionAr: 'شريحتان من لحم الأنجوس مع صوص الترافل الإيطالي الفاخر وجبنة سويسرية',
        descriptionEn: 'Two juicy Angus patties, Swiss Gruyere cheese, caramelized onions & black truffle aioli',
        price: 38,
        originalPrice: 44,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
        category: 'البرجر المفضل',
        popular: true,
        options: [
          {
            titleAr: 'درجة استواء اللحم',
            titleEn: 'Doneness',
            required: true,
            items: [
              { nameAr: 'مستوي تماماً (Well Done)', nameEn: 'Well Done', price: 0 },
              { nameAr: 'متوسط الاستواء (Medium)', nameEn: 'Medium', price: 0 },
            ]
          },
          {
            titleAr: 'إضافات الشيدر والبيكون',
            titleEn: 'Extras',
            required: false,
            items: [
              { nameAr: 'شريحة جبن إضافية', nameEn: 'Extra Cheese Slice', price: 3 },
              { nameAr: 'بيكون بقري مقدد مقرمش', nameEn: 'Crispy Beef Bacon', price: 5 },
            ]
          }
        ]
      },
      {
        id: 'item-202',
        nameAr: 'ساندوتش كريسبي دجاج حار (فاير برجر)',
        nameEn: 'Blazing Crispy Nashville Chicken',
        descriptionAr: 'صدر دجاج مقلي مقرمش مغطى بصوص الناشفيل الحار مع سلطة كول سلو ومخلل',
        descriptionEn: 'Crispy buttermilk chicken breast tossed in hot Nashville glaze with cool slaw & pickles',
        price: 32,
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
        category: 'سندوتشات الدجاج',
        spicy: true,
      },
      {
        id: 'item-203',
        nameAr: 'ميلك شيك كيندر ولوتس مثلج',
        nameEn: 'Lotus Biscoff & Kinder Milkshake',
        descriptionAr: 'آيس كريم فانيلا ناعم مخفوق مع صوص اللوتس وشوكولاتة الكيندر والكريمة',
        descriptionEn: 'Creamy artisan vanilla ice cream blended with crushed Lotus biscuits and melted Kinder',
        price: 18,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
        category: 'المشروبات والحلويات',
      }
    ]
  },
  {
    id: 'store-3',
    nameAr: 'أسواق النخبة فريش مارت',
    nameEn: 'Al-Nokhba Fresh Mart',
    descriptionAr: 'خضار وفواكه طازجة، ألبان، مخبوزات، واحتياجات البيت اليومية',
    descriptionEn: 'Fresh farm fruits & vegetables, dairy, bakery, and pantry groceries',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=160&q=80',
    rating: 4.7,
    ratingCount: 980,
    deliveryTime: '15-25',
    deliveryFee: 3,
    minOrder: 15,
    distance: '1.2 كم',
    featured: true,
    discountBadge: 'توصيل في 15 دقيقة',
    menu: [
      {
        id: 'item-301',
        nameAr: 'صندوق فواكه مشكلة طازجة (3 كجم)',
        nameEn: 'Seasonal Fresh Fruit Box (3kg)',
        descriptionAr: 'تفاح أحمر، برتقال، موز، وعنب طازج مختار بعناية فائقة',
        descriptionEn: 'Hand-picked premium apples, sweet oranges, bananas, and seedless grapes',
        price: 28,
        originalPrice: 35,
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
        category: 'الخضار والفواكه',
        popular: true,
      },
      {
        id: 'item-302',
        nameAr: 'حليب المراعي كامل الدسم (2 لتر)',
        nameEn: 'Fresh Full Cream Milk (2 Liters)',
        descriptionAr: 'حليب طبيعي مبستر وطازج وغني بالكالسيوم',
        descriptionEn: '100% pure fresh cow milk, pasteurized & rich in vitamins',
        price: 11,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        category: 'الألبان والأجبان',
      },
      {
        id: 'item-303',
        nameAr: 'زيت زيتون بكر ممتاز معصور على البارد (1 لتر)',
        nameEn: 'Extra Virgin Cold Pressed Olive Oil (1L)',
        descriptionAr: 'زيت زيتون أصيل صافي 100% بنكهة غنية ورائحة زكية',
        descriptionEn: 'Premium first cold press olive oil from Mediterranean groves',
        price: 36,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
        category: 'المؤونة والزيوت',
      },
      {
        id: 'item-304',
        nameAr: 'كرتون مياه معدنية نقية (40 قارورة × 330 مل)',
        nameEn: 'Pure Spring Water Pack (40 x 330ml)',
        descriptionAr: 'مياه شرب معبأة نقية ومنعشة من الينابيع الطبيعية',
        descriptionEn: 'Essential daily bottled drinking water case',
        price: 18,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
        category: 'المشروبات والمياه',
      }
    ]
  },
  {
    id: 'store-4',
    nameAr: 'صيدلية الرعاية الحديثة',
    nameEn: 'Modern Care Pharmacy',
    descriptionAr: 'أدوية، فيتامينات، مكملات غذائية، ومنتجات العناية بالبشرة والطفل',
    descriptionEn: 'Prescriptions, OTC medicine, skincare, baby care, and daily wellness vitamins',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=160&q=80',
    rating: 4.9,
    ratingCount: 840,
    deliveryTime: '20-30',
    deliveryFee: 5,
    minOrder: 15,
    distance: '1.8 كم',
    featured: false,
    discountBadge: 'صيدلي متواجد 24/7',
    menu: [
      {
        id: 'item-401',
        nameAr: 'فيتامين سي 1000 مع الزنك فوار',
        nameEn: 'Vitamin C 1000mg + Zinc Effervescent',
        descriptionAr: 'أقراص فوارة لدعم المناعة ومقاومة الإجهاد بنكهة البرتقال',
        descriptionEn: 'Immune defence boost effervescent tablets with natural orange flavor',
        price: 22,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        category: 'الفيتامينات والمكملات',
        popular: true,
      },
      {
        id: 'item-402',
        nameAr: 'حقيبة إسعافات أولية منزلية متكاملة',
        nameEn: 'Comprehensive Home First Aid Kit',
        descriptionAr: 'تحتوي على شاش معقم، ضمادات، كحول طبي، ومسكنات أساسية',
        descriptionEn: 'Complete emergency medical box with sterile gauze, bandages, and antiseptic spray',
        price: 49,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80',
        category: 'الإسعافات والعناية',
      },
      {
        id: 'item-403',
        nameAr: 'غسول ومرطب للوجه للبشرة الحساسة',
        nameEn: 'Gentle Hydrating Facial Cleanser',
        descriptionAr: 'ينظف ويرطب بعمق دون التسبب في جفاف أو تهيج للبشرة',
        descriptionEn: 'Dermatologist tested daily cleanser for sensitive and dry skin types',
        price: 39,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
        category: 'العناية بالبشرة',
      }
    ]
  },
  {
    id: 'store-5',
    nameAr: 'كافيه روستري آند بينز',
    nameEn: 'Roastery & Beans Specialty Cafe',
    descriptionAr: 'قهوة مختصة، كرواسون فرنسي طازج، وتشيز كيك بالتوت اللذيذ',
    descriptionEn: 'Specialty coffee roastery, fresh French croissants, and artisanal desserts',
    category: 'sweets',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=160&q=80',
    rating: 4.9,
    ratingCount: 3100,
    deliveryTime: '15-20',
    deliveryFee: 4,
    minOrder: 15,
    distance: '0.9 كم',
    featured: true,
    discountBadge: 'قهوة اليوم مجاناً مع الحلى',
    menu: [
      {
        id: 'item-501',
        nameAr: 'سبانش لاتيه مثلج مميز (سجنتشر)',
        nameEn: 'Signature Iced Spanish Latte',
        descriptionAr: 'إسبريسو دبل شوت مع حليب مكثف محلى وحليب طازج ومكعبات الثلج',
        descriptionEn: 'Double shot specialty espresso blended with sweet condensed milk & chilled fresh milk',
        price: 21,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
        category: 'القهوة الباردة',
        popular: true,
        options: [
          {
            titleAr: 'نوع الحليب',
            titleEn: 'Milk Choice',
            required: true,
            items: [
              { nameAr: 'حليب عادي', nameEn: 'Regular Milk', price: 0 },
              { nameAr: 'حليب الشوفان النباتي', nameEn: 'Oat Milk', price: 4 },
              { nameAr: 'حليب خالي الدسم', nameEn: 'Skimmed Milk', price: 0 },
            ]
          }
        ]
      },
      {
        id: 'item-502',
        nameAr: 'كيكة سان سيباستيان بالتشوكليت البلجيكي',
        nameEn: 'San Sebastian Cheesecake with Belgian Chocolate',
        descriptionAr: 'تشيز كيك كريمي محروق من الوجه مع سكب صوص الشوكولاتة البلجيكية الساخنة',
        descriptionEn: 'Creamy Basque burnt cheesecake drizzled with rich warm Belgian milk chocolate',
        price: 29,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
        category: 'الحلويات والكيك',
        popular: true,
      },
      {
        id: 'item-503',
        nameAr: 'كرواسون الزبدة الفرنسي المحشو باللوز',
        nameEn: 'Almond French Butter Croissant',
        descriptionAr: 'طبقات هشة من العجين بالزبدة الفاخرة محشوة بكريمة اللوز ومغطاة بشرائح اللوز المقرمش',
        descriptionEn: 'Flaky baked croissant filled with almond frangipane cream and toasted sliced almonds',
        price: 16,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
        category: 'المخبوزات',
      }
    ]
  },
  {
    id: 'store-6',
    nameAr: 'مطعم أرز البخاري والتندوري الملكي',
    nameEn: 'Bukhari Rice & Royal Tandoori',
    descriptionAr: 'أرز بخاري وكابلي ولحم حنيذ بلدي مع دجاج الفحم والمقبلات المشكلة',
    descriptionEn: 'Traditional Bukhari rice, Kabli, tender lamb Haneeth, and tandoori charcoal chicken',
    category: 'restaurants',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=160&q=80',
    rating: 4.7,
    ratingCount: 1650,
    deliveryTime: '25-35',
    deliveryFee: 5,
    minOrder: 30,
    distance: '3.8 كم',
    featured: false,
    discountBadge: 'وجبة العائلة متوفرة',
    menu: [
      {
        id: 'item-601',
        nameAr: 'نصف دجاج شواية مع أرز بخاري بالمكسرات',
        nameEn: 'Half Rotisserie Chicken with Spiced Bukhari Rice',
        descriptionAr: 'دجاج متبل بخلطة البخاري السرية مع أرز حبوب طويلة وزبيب وجزر وسلطة حارة',
        descriptionEn: 'Tender seasoned chicken roasted to golden perfection over fragrant Bukhari spiced rice',
        price: 24,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        category: 'وجبات الدجاج',
        popular: true,
      },
      {
        id: 'item-602',
        nameAr: 'لحم حنيذ بلدي في البرميل (نفر)',
        nameEn: 'Traditional Slow-Cooked Tender Lamb Haneeth',
        descriptionAr: 'لحم خروف طري مطبوخ بطريقة الحنيذ التقليدية مع مرق اللحم وصلصة السحاوق',
        descriptionEn: 'Fall-off-the-bone slow roasted seasoned lamb served with spiced rice and tomato salsa',
        price: 52,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        category: 'وجبات اللحوم الفاخرة',
        popular: true,
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ATL-98421',
    storeId: 'store-1',
    storeNameAr: 'شاورما ستيشن & مشاوي الأصيل',
    storeNameEn: 'Shawarma Station & Grills',
    items: [
      {
        id: 'item-101-reg',
        menuItem: MOCK_STORES[0].menu[0],
        quantity: 2,
        selectedOptions: [{ groupTitle: 'الحجم', optionName: 'عادي (6 قطع)', price: 0 }],
        storeId: 'store-1',
        storeNameAr: 'شاورما ستيشن & مشاوي الأصيل',
        storeNameEn: 'Shawarma Station & Grills',
      }
    ],
    subtotal: 48,
    deliveryFee: 5,
    discount: 10,
    total: 43,
    paymentMethod: 'cash' as const,
    deliveryAddress: 'حي الملقا - شارع أنس بن مالك - عمارة 14',
    contactPhone: '+966 50 123 4567',
    notes: 'يرجى رن الجرس وترك الطلب عند الباب',
    status: 'on_the_way' as const,
    createdAt: 'منذ 15 دقيقة',
    estimatedDeliveryTime: '10-15 دقيقة',
    type: 'store' as const,
    driver: {
      name: 'كابتن طارق السعيد',
      phone: '+966 55 987 6543',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      vehicle: 'سكوتر هوندا PCX 160 (أبيض)',
      rating: 4.95,
    }
  }
];
