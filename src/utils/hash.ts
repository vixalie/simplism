export function fnv1aHash(str: string) {
  let hash = 0x811c9dc5; // 32-bit offset basis for FNV-1a
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i); // XOR with the character code
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24); // FNV-1a prime: 16777619
  }
  return hash >>> 0; // Convert to unsigned 32-bit integer
}
