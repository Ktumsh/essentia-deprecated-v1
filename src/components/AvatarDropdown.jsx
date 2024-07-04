import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { ThemeToggle } from "./ThemeToggle/ThemeToggle";
import { LogoutIcon } from "./ReactComponents/Logout";
import { signOut } from "auth-astro/client";

export default function AvatarDropdown({ avatarUrl, name, username }) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content:
            "p-1 bg-gradient-to-br from-white to-default-200 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl",
        }}
        placement="bottom-end"
      >
        <DropdownTrigger>
          <button
            className="size-8 focus:outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[rgb(6,_27,_55)] ring-gray-200 dark:ring-midnight-900/30 rounded-full overflow-hidden"
            aria-label="Perfil de usuario"
          >
            <img src={avatarUrl} alt="Avatar del usuario" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones del perfil" variant="flat">
          <DropdownItem
            key="profile"
            textValue="Profile"
            className="h-14 gap-2 rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
          >
            <p className="font-medium dark:text-base-color-dark">{name}</p>
            <p className="text-xs">{username}</p>
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            key="configurations"
            textValue="Configurations"
          >
            Configuración
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            key="help_and_feedback"
            textValue="Help and Feedback"
          >
            Centro de Ayuda
          </DropdownItem>
          <DropdownItem
            isReadOnly
            title="Cambiar tema"
            endContent={
              <ThemeToggle
                buttonClass="bg-white dark:bg-base-dark"
                spanClass="dark:bg-base-full-dark"
              />
            }
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            textValue="Help and Feedback"
          ></DropdownItem>
          <DropdownItem
            id="avatar_logout"
            className="rounded-xl  text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600"
            key="logout"
            textValue="Logout"
            color="danger"
            startContent={<LogoutIcon className="size-4" />}
            onClick={() => signOut()}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
