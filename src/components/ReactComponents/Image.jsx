import { Image } from "@nextui-org/image";
export default function ImageComponent({
  src,
  alt,
  removeWrapper = false,
  wrapper = "",
  className,
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      removeWrapper={removeWrapper}
      classNames={{
        wrapper: wrapper,
        img: className,
      }}
      {...props}
    />
  );
}
