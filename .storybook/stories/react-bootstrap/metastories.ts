import { StoryObj } from "@storybook/react/*";

import { fruitOptions, regionOptions } from "./values";

export function buildStories<T>(render: (args: any) => JSX.Element) {
  return {
    Empty: {
      args: {
        options: [],
      },
      render,
    },
    Options: {
      args: {
        options: fruitOptions,
      },
      render,
    },
    OptionsWithMultipleSelection: {
      args: {
        options: fruitOptions,
        multiple: true,
      },
      render,
    },
    OptionHierarchy: {
      args: {
        options: regionOptions,
      },
      render,
    },
    OptionHierarchyWithMultipleSelection: {
      args: {
        options: regionOptions,
        multiple: true,
      },
      render,
    },
  } as any as { [key: string]: StoryObj<T> };
}
