export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string; // For videos, optional custom thumbnail
  width?: number;
  height?: number;
  metadata?: {
    fileSize?: string;
    dimensions?: string;
    dateCreated?: string;
    camera?: string;
    location?: string;
  };
}

export interface GalleryProps {
  items: GalleryItem[];
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  showTitles?: boolean;
  showDescriptions?: boolean;
  enableLightbox?: boolean;
  className?: string;
  itemClassName?: string;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}
