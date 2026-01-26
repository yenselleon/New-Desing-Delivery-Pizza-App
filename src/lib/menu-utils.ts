export function getMenuPageSize(width: number): number {
  if (width < 768) {
    return 2;
  }
  if (width < 1024) {
    return 4;
  }
  if (width < 1280) {
    return 6;
  }
  return 8;
}
