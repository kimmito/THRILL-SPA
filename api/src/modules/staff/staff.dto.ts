export interface StaffDto {
  id: number;
  name: string;
  photoPath: string;
  role: string;
  isActive: boolean;
  rating: number | null;
  reviewCount: number;
  reviews: StaffReviewDto[];
}

export interface StaffReviewDto {
  id: number;
  stars: number;
  date: string;
  author: string;
  text: string;
  imagePath: string | null;
}
