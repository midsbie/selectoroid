import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";

import { SelectoroidProvider } from "@selectoroid/react-bootstrap";

import { buildStories } from "./metastories";
import { renderDropdown } from "./render";
import "./style.scss";

// More on how to set up stories at:
// https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SelectoroidProvider> = {
  title: "Selectoroid/React Bootstrap/Dropdown",
  component: SelectoroidProvider,
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
    placeholder: { control: "text" },
    multiple: { control: "boolean" },
    value: { control: "object" },
  },
  // Use `fn` to spy on a callback arg (say, onRemove), which will appear in the actions panel once
  // invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onChange: fn(),
  },
};

export default meta;
const stories = buildStories<typeof SelectoroidProvider>(renderDropdown);
const {
  Empty,
  Options,
  OptionsWithMultipleSelection,
  OptionHierarchy,
  OptionHierarchyWithMultipleSelection,
} = stories;
export {
  Empty,
  OptionHierarchy,
  OptionHierarchyWithMultipleSelection,
  Options,
  OptionsWithMultipleSelection,
};
