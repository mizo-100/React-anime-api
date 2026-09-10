export type AnimeItem = {
  mal_id: number;
  title: string;
  title_japanese?: string;
  synopsis: string;
  url: string;
  published?: {
    from: string;
  };
  aired?: {
    from: string;
  };
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
}

export type GenreItem = {
  mal_id: number;
  name: string;
  count: number;
}
