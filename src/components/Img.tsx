import { imageSet, type ImageName } from '@/lib/images';

type Props = {
  name: ImageName;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  id?: string;
};

/** Pre-optimised responsive WebP image with intrinsic size (no layout shift). */
export default function Img({ name, alt, sizes = '100vw', priority = false, className, id }: Props) {
  const img = imageSet(name);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      className={className}
      id={id}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
