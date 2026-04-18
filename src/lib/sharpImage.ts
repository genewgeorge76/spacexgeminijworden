/**
 * Sharp-Image — Auto-Resolution Pipeline
 *
 * Routes every project photo through Netlify Image CDN so each request is
 * automatically resized, compressed, and re-encoded to the most efficient
 * modern format (AVIF/WebP negotiation) at the edge. This lifts stock
 * portfolio photos to "Premium Gallery" standards without a build step.
 */

type FitMode = 'contain' | 'cover' | 'fill';
type FormatMode = 'auto' | 'avif' | 'jpg' | 'png' | 'webp' | 'gif';

export interface SharpOptions {
  /** Target width in pixels (the long edge when height is omitted). */
  width?: number;
  /** Optional target height. Required when `fit: 'cover'` is used. */
  height?: number;
  /** 1–100 lossy quality. Premium Gallery default = 86. */
  quality?: number;
  /** Crop / fit mode. Defaults to 'cover' when both dims are given. */
  fit?: FitMode;
  /** Output format. 'auto' lets the CDN negotiate AVIF → WebP → original. */
  format?: FormatMode;
  /** Crop anchor when fit === 'cover'. */
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

const PREMIUM_QUALITY = 86;

function isAbsolute(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Transforms any local or remote image URL into a Netlify Image CDN URL
 * carrying resize + format-negotiation parameters. Leaves the string
 * unchanged when the caller passes a data: URI or a blob: URL.
 */
export function sharpImage(src: string, opts: SharpOptions = {}): string {
  if (!src) return src;
  if (src.startsWith('data:') || src.startsWith('blob:')) return src;

  const {
    width,
    height,
    quality = PREMIUM_QUALITY,
    fit,
    format = 'auto',
    position,
  } = opts;

  const params = new URLSearchParams();
  params.set('url', isAbsolute(src) ? src : src.startsWith('/') ? src : `/${src}`);
  if (width) params.set('w', String(Math.round(width)));
  if (height) params.set('h', String(Math.round(height)));
  if (quality) params.set('q', String(Math.min(100, Math.max(1, Math.round(quality)))));
  if (fit) params.set('fit', fit);
  else if (width && height) params.set('fit', 'cover');
  if (position) params.set('position', position);
  if (format && format !== 'auto') params.set('fm', format);

  return `/.netlify/images?${params.toString()}`;
}

/**
 * Generates a responsive `srcset` targeted at the Premium Gallery breakpoints
 * (480 / 800 / 1200 / 1600). Pairs well with a matching `sizes` attribute.
 */
export function sharpSrcSet(
  src: string,
  widths: number[] = [480, 800, 1200, 1600],
  opts: Omit<SharpOptions, 'width'> = {},
): string {
  return widths
    .map((w) => `${sharpImage(src, { ...opts, width: w })} ${w}w`)
    .join(', ');
}

/** Default `sizes` for hero & gallery grids — tuned to the site's 1280px cap. */
export const GALLERY_SIZES =
  '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, (max-width: 1280px) 32vw, 400px';
