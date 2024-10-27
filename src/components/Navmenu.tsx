import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const Navmenu = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <img
          src="/assets/images/chat-logo.png"
          alt="Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
        />
        <p className="font-bold text-inherit">Chatversation</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>User</NavbarItem>

        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navmenu;
