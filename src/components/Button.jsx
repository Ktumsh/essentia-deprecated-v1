import { Button } from "@nextui-org/button";

export default function ButtonComponent({ variant, color, content, children }) {
  return (
    <Button
      href="/noticias"
      className="text-tiny text-white bg-black/20"
      variant={variant}
      color={color}
      radius="lg"
      size="sm"
      children={children}
    >
      {content}
      {children}
    </Button>
  );
}
