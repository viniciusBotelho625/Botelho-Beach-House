import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Otimiza URL Cloudinary para mobile (800px, auto quality/format) */
export function cloudinaryOptimize(url: string, width = 800): string {
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/w_${width},q_auto,f_auto/`
  );
}
