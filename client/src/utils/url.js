// Ensures any external link has a proper protocol (https://)
// so browsers don't treat bare domains like 'linkedin.com/in/xyz' as relative URLs.
export function formatExternalUrl(url = '') {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function formatImageUrl(url = '') {
  if (!url) return '';
  let str = String(url).trim();
  if (!str) return '';
  if (str.startsWith('http://')) {
    str = 'https://' + str.slice(7);
  }
  if (!/^(https?:|\/|data:)/i.test(str)) {
    str = `https://${str}`;
  }
  return str;
}
