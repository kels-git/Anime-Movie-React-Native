export interface Anime {
  mal_id: number | undefined;
  title?: string | undefined;
  rating?: string | undefined;
  score?: number | undefined;
  year?: number | undefined;
  status?: string | undefined;
  image_url?: string | undefined;
  genres?: any | undefined;
}


export interface AnimeListResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}