// File: utils/videoUtils.ts

export function getRandomThumbnail() {
  const placeholderImages = [
    '/thumbnails/thumb1.jpg',
    '/thumbnails/thumb2.jpg',
    '/thumbnails/thumb3.jpg',
    '/thumbnails/thumb4.jpg',
    '/thumbnails/thumb5.jpg',
  ];
  const index = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[index];
}
