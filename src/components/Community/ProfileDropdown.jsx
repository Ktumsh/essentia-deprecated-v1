import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { signOut } from "auth-astro/client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { DotsIcon } from "./Icons/Dots";
import { LogoutIcon } from "@/icons/react/Logout";

export default function ProfileDropdown({ name, username, avatar }) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        showArrow
        classNames={{
          base: "berfore:bg-white before:dark:bg-base-dark",
          content:
            "p-1 bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl",
        }}
        placement="top"
      >
        <DropdownTrigger>
          <Button
            size="lg"
            radius="full"
            color="danger"
            variant="light"
            endContent={
              <DotsIcon className="hidden lg:block size-5 text-base-color dark:text-base-color-dark" />
            }
            className="min-w-fit lg:min-w-24 w-full h-16 justify-between text-left text-lg p-3 mb-2 font-medium"
          >
            <User
              name={name}
              description={username}
              classNames={{
                wrapper: "hidden lg:inline-flex",
                name: "text-base-color-h dark:text-base-color-dark font-bold",
                description: "text-base-color-d dark:text-base-color-dark-m",
              }}
              avatarProps={{
                src: avatar,
              }}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones del perfil" variant="flat">
          <DropdownItem
            key="profile"
            textValue="Profile"
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
          >
            Mi perfil
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="configurations"
            textValue="Configurations"
          >
            Configuración
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="help_and_feedback"
            textValue="Help and Feedback"
          >
            Centro de Ayuda
          </DropdownItem>
          <DropdownItem
            isReadOnly
            endContent={
              <ThemeToggle
                buttonClass="bg-gray-200 dark:bg-base-dark"
                spanClass="dark:bg-base-full-dark"
              />
            }
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            textValue="Help and Feedback"
          >
            Cambiar tema
          </DropdownItem>
          <DropdownItem
            id="avatar_logout"
            key="logout"
            textValue="Logout"
            color="danger"
            className="rounded-xl text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600 !duration-150"
            startContent={<LogoutIcon className="size-4" />}
            onClick={() => signOut()}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ThemeToggle buttonClass="hidden" />
    </div>
  );
}
