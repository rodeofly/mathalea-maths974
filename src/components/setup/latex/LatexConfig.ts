// Helpers pour encoder/décoder
export function encodeBase64(obj: any): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
}

export function decodeBase64(str: string): any {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))))
  } catch (e) {
    return {}
  }
}
