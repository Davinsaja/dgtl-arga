export interface RSVPReply {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  replyToName?: string;
  likes?: number;
}

export interface RSVP {
  id: string;
  name: string;
  presence: 'hadir' | 'ragu' | 'tidak_hadir';
  wish: string;
  createdAt: string;
  likes?: number;
  replies?: RSVPReply[];
}

export interface RSVPInput {
  name: string;
  presence: 'hadir' | 'ragu' | 'tidak_hadir';
  wish: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
