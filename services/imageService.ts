// Demo image service
export const getImageUrl = (imagePath?: string) => {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop";
  }
  
  // If already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // Otherwise, construct URL from base path
  return `https://images.unsplash.com/${imagePath}`;
};
