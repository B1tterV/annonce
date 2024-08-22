export interface AgentCard {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  description: string;
  reviewCount: number;
  docsVerified?: boolean;
  rating?: number;
}
