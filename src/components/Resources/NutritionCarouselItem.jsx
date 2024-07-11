import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import ShowIcon from "@/icons/react/Eye";
import HeartIcon from "@/icons/react/Heart";

export default function ModalV2Component({
  modalSize = "3xl",
  modalTitle,
  modalImage,
  modalBody,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip
        className="bg-gradient-to-br from-white to-default-200 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h duration-250"
        content="Ver receta"
        closeDelay={0}
        placement="top-end"
      >
        <Card
          shadow="sm"
          radius="none"
          isPressable
          disableRipple
          onPress={onOpen}
          className="group h-96 p-[10px] text-base-color-h dark:text-base-color-dark border-none bg-[#ece3d4] dark:bg-base-full-dark !transition overflow-clip on-scroll shadow-md hover:scale-95 data-[pressed=true]:scale-[0.92]"
        >
          <div className="h-full mx-[1%] p-[10px] bg-[#e6d5bc] dark:bg-base-dark border border-[#c7a26b] dark:border-white/5">
            <CardHeader className="absolute z-10 top-5 flex-col !items-start opacity-0 group-hover:opacity-100 px-0 group-hover:px-6 transition-all">
              <ShowIcon className="size-6 drop-shadow-md text-white/60 group-hover:text-white transition" />
            </CardHeader>
            <Image
              radius="none"
              src={modalImage}
              alt={modalTitle}
              classNames={{
                wrapper: "overflow-hidden",
              }}
              className="z-0 w-full h-64 object-cover"
            />
            <CardFooter className="text-small bg-transparent px-0">
              <h3 className="text-base uppercase font-spacemono text-start text-[#4a381c] dark:text-base-color-dark-h group-hover:text-black dark:group-hover:text-white transition-colors">
                {modalTitle}
              </h3>
            </CardFooter>
          </div>
        </Card>
      </Tooltip>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={modalSize}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="none"
        classNames={{
          wrapper: "overflow-hidden z-[999]",
          body: "text-[#4a381c] dark:text-base-color-dark bg-[#e6d5bc] dark:bg-base-dark border border-[#c7a26b] dark:border-white/10 py-0 pb-6 font-spacemono scrollbar-hide",
          base: "bg-[#ece3d4] dark:bg-base-full-dark p-6 sm:p-8 pt-8 sm:pt-12 pb-4 sm:pb-8",
          footer:
            "bg-[#e6d5bc] dark:bg-base-dark border border-t-0 border-[#c7a26b]",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
          backdrop: "z-[998]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="-mx-6">
                  <Image
                    src={modalImage}
                    alt={modalTitle}
                    classNames={{
                      wrapper: "!max-w-full w-full h-64",
                    }}
                    className="z-0 size-full object-cover object-center rounded-none"
                  />
                </div>
                <div className="w-full">
                  <h2 className="text-3xl font-bold font-dmsans">
                    {modalTitle}
                  </h2>
                  <hr className="w-full h-[1px] border-t-2 border-current mt-2" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: modalBody }} />
              </ModalBody>
              <div className="flex justify-end items-center mt-5">
                <Button
                  radius="lg"
                  color="foreground"
                  variant="light"
                  onPress={onClose}
                  className="text-[#4a381c] dark:text-base-color-dark-h"
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
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
