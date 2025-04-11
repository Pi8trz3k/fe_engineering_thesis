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
    color: "text-black",
    bgColor: "bg-white",
    onClick: () => alert("Login"),
  },
};

export const Register: Story = {
  args: {
    text: "Register",
    color: "text-white",
    bgColor: "bg-black",
    onClick: () => alert("Register"),
  },
};
