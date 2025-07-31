export const findImageUrl = (images: any): string | undefined => {
    if (!images) return undefined;
    
    if (images.jpg?.image_url) return images.jpg.image_url;
    if (images.webp?.image_url) return images.webp.image_url;
    
    return undefined;
  };