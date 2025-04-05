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
    text: "Login",
    onClick: () => alert("Login"),
    fontSize: "font-semibold",
    padding: "px-7 py-3",
    type: "login",
  },
};

export const Register: Story = {
  args: {
    text: "Register",
    onClick: () => alert("Register"),
    fontSize: "font-semibold",
    padding: "px-7 py-3",
    type: "register",
  },
};
