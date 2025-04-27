import { Meta, StoryObj } from "@storybook/react";
import { AuthNavigationButton } from "./AuthNavigationButton.tsx";

const meta: Meta<typeof AuthNavigationButton> = {
  title: "Components/AuthNavigationButton",
  component: AuthNavigationButton,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    text: "Zaloguj się",
    type: "login",
    onClick: () => alert("Login"),
  },
};

export const Register: Story = {
  args: {
    text: "Zarejestruj się",
    type: "register",
    onClick: () => alert("Register"),
  },
};

export const Logout: Story = {
  args: {
    text: "Wyloguj się",
    type: "logout",
    onClick: () => alert("Logout"),
  },
};
