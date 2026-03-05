// Mock Province API response based on https://provinces.open-api.vn/api/v2/p/
export interface Province {
  code: number;
  name: string;
  slug: string;
  type: string;
}

export const mockProvinces: Province[] = [
  {
    code: 1,
    name: 'Hà Nội',
    slug: 'ha-noi',
    type: 'Thành phố',
  },
  {
    code: 2,
    name: 'Hồ Chí Minh',
    slug: 'ho-chi-minh',
    type: 'Thành phố',
  },
  {
    code: 3,
    name: 'Hải Phòng',
    slug: 'hai-phong',
    type: 'Thành phố',
  },
  {
    code: 4,
    name: 'Đà Nẵng',
    slug: 'da-nang',
    type: 'Thành phố',
  },
  {
    code: 5,
    name: 'Cần Thơ',
    slug: 'can-tho',
    type: 'Thành phố',
  },
  {
    code: 6,
    name: 'An Giang',
    slug: 'an-giang',
    type: 'Tỉnh',
  },
  {
    code: 7,
    name: 'Bạc Liêu',
    slug: 'bac-lieu',
    type: 'Tỉnh',
  },
  {
    code: 8,
    name: 'Bắc Kạn',
    slug: 'bac-kan',
    type: 'Tỉnh',
  },
  {
    code: 9,
    name: 'Bắc Giang',
    slug: 'bac-giang',
    type: 'Tỉnh',
  },
  {
    code: 10,
    name: 'Bắc Ninh',
    slug: 'bac-ninh',
    type: 'Tỉnh',
  },
  {
    code: 11,
    name: 'Bến Tre',
    slug: 'ben-tre',
    type: 'Tỉnh',
  },
  {
    code: 12,
    name: 'Bình Dương',
    slug: 'binh-duong',
    type: 'Tỉnh',
  },
  {
    code: 13,
    name: 'Bình Phước',
    slug: 'binh-phuoc',
    type: 'Tỉnh',
  },
  {
    code: 14,
    name: 'Bình Thuận',
    slug: 'binh-thuan',
    type: 'Tỉnh',
  },
  {
    code: 15,
    name: 'Cà Mau',
    slug: 'ca-mau',
    type: 'Tỉnh',
  },
  {
    code: 16,
    name: 'Cao Bằng',
    slug: 'cao-bang',
    type: 'Tỉnh',
  },
  {
    code: 17,
    name: 'Đắk Lắk',
    slug: 'dak-lak',
    type: 'Tỉnh',
  },
  {
    code: 18,
    name: 'Đắk Nông',
    slug: 'dak-nong',
    type: 'Tỉnh',
  },
  {
    code: 19,
    name: 'Điện Biên',
    slug: 'dien-bien',
    type: 'Tỉnh',
  },
  {
    code: 20,
    name: 'Đồng Nai',
    slug: 'dong-nai',
    type: 'Tỉnh',
  },
  {
    code: 21,
    name: 'Đồng Tháp',
    slug: 'dong-thap',
    type: 'Tỉnh',
  },
  {
    code: 22,
    name: 'Gia Lai',
    slug: 'gia-lai',
    type: 'Tỉnh',
  },
  {
    code: 23,
    name: 'Hà Giang',
    slug: 'ha-giang',
    type: 'Tỉnh',
  },
  {
    code: 24,
    name: 'Hà Nam',
    slug: 'ha-nam',
    type: 'Tỉnh',
  },
  {
    code: 25,
    name: 'Hà Tây',
    slug: 'ha-tay',
    type: 'Tỉnh',
  },
  {
    code: 26,
    name: 'Hà Tĩnh',
    slug: 'ha-tinh',
    type: 'Tỉnh',
  },
  {
    code: 27,
    name: 'Hải Dương',
    slug: 'hai-duong',
    type: 'Tỉnh',
  },
  {
    code: 28,
    name: 'Hậu Giang',
    slug: 'hau-giang',
    type: 'Tỉnh',
  },
  {
    code: 29,
    name: 'Hòa Bình',
    slug: 'hoa-binh',
    type: 'Tỉnh',
  },
  {
    code: 30,
    name: 'Hưng Yên',
    slug: 'hung-yen',
    type: 'Tỉnh',
  },
  {
    code: 31,
    name: 'Khánh Hòa',
    slug: 'khanh-hoa',
    type: 'Tỉnh',
  },
  {
    code: 32,
    name: 'Kiên Giang',
    slug: 'kien-giang',
    type: 'Tỉnh',
  },
  {
    code: 33,
    name: 'Kon Tum',
    slug: 'kon-tum',
    type: 'Tỉnh',
  },
  {
    code: 34,
    name: 'Lai Châu',
    slug: 'lai-chau',
    type: 'Tỉnh',
  },
  {
    code: 35,
    name: 'Lâm Đồng',
    slug: 'lam-dong',
    type: 'Tỉnh',
  },
  {
    code: 36,
    name: 'Lạng Sơn',
    slug: 'lang-son',
    type: 'Tỉnh',
  },
  {
    code: 37,
    name: 'Lào Cai',
    slug: 'lao-cai',
    type: 'Tỉnh',
  },
  {
    code: 38,
    name: 'Long An',
    slug: 'long-an',
    type: 'Tỉnh',
  },
  {
    code: 39,
    name: 'Nam Định',
    slug: 'nam-dinh',
    type: 'Tỉnh',
  },
  {
    code: 40,
    name: 'Nghệ An',
    slug: 'nghe-an',
    type: 'Tỉnh',
  },
  {
    code: 41,
    name: 'Ninh Bình',
    slug: 'ninh-binh',
    type: 'Tỉnh',
  },
  {
    code: 42,
    name: 'Ninh Thuận',
    slug: 'ninh-thuan',
    type: 'Tỉnh',
  },
  {
    code: 43,
    name: 'Phú Thọ',
    slug: 'phu-tho',
    type: 'Tỉnh',
  },
  {
    code: 44,
    name: 'Phú Yên',
    slug: 'phu-yen',
    type: 'Tỉnh',
  },
  {
    code: 45,
    name: 'Quảng Bình',
    slug: 'quang-binh',
    type: 'Tỉnh',
  },
  {
    code: 46,
    name: 'Quảng Nam',
    slug: 'quang-nam',
    type: 'Tỉnh',
  },
  {
    code: 47,
    name: 'Quảng Ngãi',
    slug: 'quang-ngai',
    type: 'Tỉnh',
  },
  {
    code: 48,
    name: 'Quảng Ninh',
    slug: 'quang-ninh',
    type: 'Tỉnh',
  },
  {
    code: 49,
    name: 'Quảng Trị',
    slug: 'quang-tri',
    type: 'Tỉnh',
  },
  {
    code: 50,
    name: 'Sóc Trăng',
    slug: 'soc-trang',
    type: 'Tỉnh',
  },
  {
    code: 51,
    name: 'Sơn La',
    slug: 'son-la',
    type: 'Tỉnh',
  },
  {
    code: 52,
    name: 'Tây Ninh',
    slug: 'tay-ninh',
    type: 'Tỉnh',
  },
  {
    code: 53,
    name: 'Thái Bình',
    slug: 'thai-binh',
    type: 'Tỉnh',
  },
  {
    code: 54,
    name: 'Thái Nguyên',
    slug: 'thai-nguyen',
    type: 'Tỉnh',
  },
  {
    code: 55,
    name: 'Thanh Hóa',
    slug: 'thanh-hoa',
    type: 'Tỉnh',
  },
  {
    code: 56,
    name: 'Thừa Thiên Huế',
    slug: 'thua-thien-hue',
    type: 'Tỉnh',
  },
  {
    code: 57,
    name: 'Tiền Giang',
    slug: 'tien-giang',
    type: 'Tỉnh',
  },
  {
    code: 58,
    name: 'Trà Vinh',
    slug: 'tra-vinh',
    type: 'Tỉnh',
  },
  {
    code: 59,
    name: 'Tuyên Quang',
    slug: 'tuyen-quang',
    type: 'Tỉnh',
  },
  {
    code: 60,
    name: 'Vĩnh Long',
    slug: 'vinh-long',
    type: 'Tỉnh',
  },
  {
    code: 61,
    name: 'Vĩnh Phúc',
    slug: 'vinh-phuc',
    type: 'Tỉnh',
  },
  {
    code: 62,
    name: 'Yên Bái',
    slug: 'yen-bai',
    type: 'Tỉnh',
  },
];

// Mock API function to simulate fetching provinces
export const fetchProvinces = async (): Promise<Province[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProvinces);
    }, 300);
  });
};
