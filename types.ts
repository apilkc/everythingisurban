export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  reflection: string;
  cover?: string;
  tags: string[];
}

export interface UpdateCardProps {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  content?: string; // Long form text for the Full View
  link?: string;
  tags?: string[];
  image?: string; // optional image file path / URL
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  date: string;
}