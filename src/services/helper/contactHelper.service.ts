
export const shouldIgnoreEmail = (email: string = '', ignoreDomains: string[] = [], blockDomains: string[] = []) => {
    const domain = email.split("@")[1];
    if (blockDomains.includes(domain)) return true; 
    if (ignoreDomains.includes(domain)) return false;
    return false;
  };


 export const extractEmail = (headerValue: string = ''): string => {
    const match = headerValue.match(/<(.+?)>/);
    return match ? match[1] : headerValue;
  };