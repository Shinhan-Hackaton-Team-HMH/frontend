export function encodeUrlToBase64(url: string) {
  // Step 1: URL-encode the string to handle special characters
  const urlEncoded = encodeURIComponent(url);

  // Step 2: Base64 encode the URL-encoded string
  const base64Encoded = btoa(urlEncoded);

  return base64Encoded;
}

//Example
// const originalUrl = 'https://example.com/search?query=hello world!&page=1';
// const encodedUrl = encodeUrlToBase64(originalUrl);
// console.log('Original URL:', originalUrl);
// console.log('Base64 Encoded URL:', encodedUrl);
