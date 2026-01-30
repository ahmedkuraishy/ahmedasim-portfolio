export const getSafeImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('/')) return url; // Public folder images
  
  // Replace localhost if we are using an IP in our API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (apiUrl.includes('192.168') && url.includes('localhost:5000')) {
    const host = apiUrl.split('/api')[0].replace('http://', '').replace('https://', '');
    return url.replace('localhost:5000', host);
  }
  return url;
};
