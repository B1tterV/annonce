interface CompanyWorkTime {
  at: string;
  to: string;
}

export interface CompanyCard {
  id: number;
  imageUrl: string;
  name: string;
  docsVerified: boolean;
  phoneNumber: number | string;
  agentsCount: number;
  aboutCompany: string;
  workTime: CompanyWorkTime;
  address: string;
  reviewCount?: number;
  rating?: number;
}
