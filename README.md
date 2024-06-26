# Selectoroid

A work in progress in the very early stages of development, Selectoroid is a powerful and extensible
React component offering users easy navigation through nested categories and sub-categories,
enabling complex selections.

## Features

- Hierarchical option structure with support for nested options.
- Customizable rendering of option containers, lists, and individual options.
- Context-based rendering for seamless integration with different UI libraries.
- Selection tracking and event handling for selected options.
- Bootstrap-based styling with customization options.

## Getting Started

This guide will help you set up and use the Selectoroid library in your project.

### Installation

Start by installing the dependencies:

```sh
npm install
```

### Usage

Import the required components and types from the library:

```jsx
import { Option, Options, SelectedOption } from "@selectoroid/model";
import { Selectoroid } from "@selectoroid/react-bootstrap";
```

Define your options and selection handler:

```jsx
const options: Options = [
  { value: 'option1', label: 'Option 1', isSelected: false },
  { value: 'option2', label: 'Option 2', isSelected: true },
  // ... more options
];

const handleSelect = React.useCallback((option: SelectedOption) => {
  // Handle option selection
}, []);
```

Render the `Selectoroid` component with your options and selection handler:

```jsx
<Selectoroid options={options} onSelect={onSelect}>
  <InputGroup>
    <Form.Control readOnly aria-label={ariaLabel} placeholder={placeholder} value={labels} />
    <Button variant="secondary" className="dropdown-toggle" />
  </InputGroup>
</Selectoroid>
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and
create. All contributions are greatly appreciated.

## License

Distributed under the MIT License. See LICENSE for more information.
