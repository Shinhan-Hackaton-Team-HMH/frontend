export interface VideoTask {
  task_id: string;
  state: 'created' | 'processing' | 'completed' | 'failed'; // 'created' is one possibility
  model: string;
  images: string[]; // an array of image URLs
  prompt: string;
  duration: number; // in seconds
  seed: number; // random number
  resolution: '1080p' | '720p' | '480p' | '2k' | '4k'; // '1080p' is one possibility
  movement_amplitude: 'auto' | 'low' | 'medium' | 'high';
  payload: string; // can be an empty string
  created_at: string; // ISO 8601 format
}
