type FigmaImgProps = {
  src: string
  width: number
  height: number
  alt?: string
  className?: string
}

/** Exported Figma asset with explicit outer box. Do not use width/height auto. */
export function FigmaImg({
  src,
  width,
  height,
  alt = '',
  className,
}: FigmaImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  )
}
