import { type ImgHTMLAttributes } from 'react';
import { sharpImage, sharpSrcSet, GALLERY_SIZES, type SharpOptions } from '@/lib/sharpImage';

type BaseImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'width' | 'height'>;

interface SharpImageProps extends BaseImgProps, SharpOptions {
  src: string;
  alt: string;
  /** Custom sizes attribute. Defaults to Premium Gallery breakpoints. */
  sizes?: string;
  /** Opt-out of responsive srcset (for single-width assets). */
  responsive?: boolean;
}

/**
 * Drop-in `<img>` replacement that runs every request through the
 * Auto-Resolution Pipeline (Netlify Image CDN). Emits a Premium Gallery
 * srcset by default so browsers can pick the sharpest rendition for the
 * device pixel ratio and viewport width.
 */
export default function SharpImage({
  src,
  alt,
  width,
  height,
  quality,
  fit,
  format,
  position,
  sizes = GALLERY_SIZES,
  responsive = true,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: SharpImageProps) {
  const opts: SharpOptions = { width, height, quality, fit, format, position };
  const singleSrc = sharpImage(src, opts);
  const srcSet = responsive
    ? sharpSrcSet(src, undefined, { height, quality, fit, format, position })
    : undefined;

  return (
    <img
      {...rest}
      src={singleSrc}
      srcSet={srcSet}
      sizes={responsive ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
    />
  );
}
