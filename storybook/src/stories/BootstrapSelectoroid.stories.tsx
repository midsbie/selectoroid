import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  SelectoroidControl,
  SelectoroidPopover,
  SelectoroidProvider,
} from "@selectoroid/react-bootstrap";

import { render } from "./render";
import "./style.scss";
import { fruitOptions, regionOptions } from "./values";

// More on how to set up stories at:
// https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SelectoroidProvider> = {
  title: "Bootstrap Selectoroid",
  component: SelectoroidProvider,
  subcomponents: [SelectoroidControl, SelectoroidPopover],
  parameters: {
    // Optional parameter to center the component in the Canvas.
    // https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry.
  // https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: "object" },
  },
  // Use `fn` to spy on a callback arg (say, onRemove), which will appear in the actions panel once
  // invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SelectoroidProvider>;

export const Empty: Story = {
  parameters: {
    docs: {
      description: "",
    },
  },
  args: {
    options: [],
  },
  render,
};

export const Options: Story = {
  parameters: {
    docs: {
      description: "",
    },
  },
  args: {
    options: fruitOptions,
  },
  render,
};

export const OptionHierarchy: Story = {
  parameters: {
    docs: {
      description: "",
    },
  },
  args: {
    options: regionOptions,
  },
  render,
};
