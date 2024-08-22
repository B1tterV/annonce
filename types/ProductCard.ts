export interface ProductCard {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  viewsCount?: number;
  adDays?: number;
  promotion?: 'default' | 'advances' | 'hidden';
  pieceByPiece?: boolean
}
