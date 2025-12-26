interface OrderMovie {
  name: string;
}

export interface Orders {
  id: string;
  createdAt: Date;
  amount: number;
  seats: number[];
  showtime: string;
  userId: string;
  chargeId: string;
  status: string;
  movieId: string;
  expiresAt: Date;
  movie: OrderMovie;
}
