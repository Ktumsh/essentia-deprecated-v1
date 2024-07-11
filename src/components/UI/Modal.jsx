import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import ShowIcon from "@/icons/react/Eye";
import HeartIcon from "@/icons/react/Heart";
import { useRef, useEffect } from "react";
import "./modal.css";

export default function ModalComponent({
  tooltip,
  modalSize = "2xl",
  modalTitle,
  modalImage,
  modalBody,
  astroComponentId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const astroComponentRef = useRef(null);

  useEffect(() => {
    if (isOpen && astroComponentId) {
      const astroComponent = document.getElementById(astroComponentId);
      if (astroComponent && astroComponentRef.current) {
        const clonedNode = astroComponent.cloneNode(true);
        astroComponentRef.current.innerHTML = "";
        astroComponentRef.current.appendChild(clonedNode);
        astroComponent.style.display = "none";
      }
    }
  }, [isOpen, astroComponentId]);

  useEffect(() => {
    if (!isOpen && astroComponentId) {
      const astroComponent = document.getElementById(astroComponentId);
      if (astroComponent) astroComponent.style.display = "block";
    }
  }, [isOpen, astroComponentId]);

  return (
    <>
      <Tooltip
        className="bg-gradient-to-br from-white to-default-200 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h duration-250"
        content={tooltip}
        closeDelay={0}
        placement="top-end"
      >
        <Card
          shadow="sm"
          isPressable
          onPress={onOpen}
          className="group h-64 rounded-xl text-base-color-h dark:text-base-color-dark bg-white/50 dark:bg-none dark:bg-base-full-dark-50 backdrop-blur backdrop-saturate-150 border border-gray-100/50 dark:border-base-full-dark-80 !transition overflow-clip on-scroll"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start opacity-0 group-hover:opacity-100 group-hover:px-6 transition-all">
            <ShowIcon className="size-6 drop-shadow-md text-white/60 group-hover:text-white transition" />
          </CardHeader>
          <Image
            removeWrapper
            alt={modalTitle}
            className="z-0 w-full h-52 object-cover rounded-xl shadow-lg shadow-black/30 group-hover:scale-95"
            src={modalImage}
          />
          <CardFooter className="text-small justify-center bg-transparent">
            <q className="text-base font-bold text-start group-hover:text-black dark:group-hover:text-white transition-colors">
              {modalTitle}
            </q>
          </CardFooter>
        </Card>
      </Tooltip>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={modalSize}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          wrapper: "overflow-hidden z-[999]",
          body: "py-6",
          base: "bg-white dark:bg-base-dark max-h-[calc(100%_-_10rem)] lg:max-h-[calc(100%_-_7.5rem)]",
          header: "border-b-1 border-gray-200 dark:border-base-color-m",
          footer: "border-t-1 border-gray-200 dark:border-base-color-m",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
          backdrop: "z-[998]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base-color dark:text-base-color-dark font-grotesk font-bold text-xl">
                <q>{modalTitle}</q>
              </ModalHeader>
              <ScrollShadow className="custom-scroll" size={80}>
                <ModalBody className="text-base-color-h dark:text-base-color-dark-h">
                  <div dangerouslySetInnerHTML={{ __html: modalBody }} />
                  <div ref={astroComponentRef}></div>
                </ModalBody>
              </ScrollShadow>
              <ModalFooter className="text-base-color dark:text-base-color-dark">
                <Button
                  radius="lg"
                  color="foreground"
                  variant="light"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  isIconOnly
                  radius="lg"
                  aria-label="Like"
                  color="danger"
                  onPress={onClose}
                >
                  <HeartIcon className="size-6 text-white dark:text-white/80" />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
