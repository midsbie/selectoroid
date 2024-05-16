import { Option, OptionValue } from "./typedefs";

export function countSelected(option: Readonly<Option>, value: Readonly<Set<OptionValue>>): number {
  if (option.children == null) return 0;
  return option.children.reduce((t, s) => t + +value.has(s.value), 0) || 0;
}

export function shouldShowExpandedIcon(
  expanded: boolean | null | undefined,
  option: Option,
): boolean {
  return (expanded as boolean) && option.children != null && option.children.length > 0;
}

export function getOptionLeaf(
  options: Readonly<Option[]>,
  value: Readonly<OptionValue> | null | undefined,
): Option[] {
  if (value == null) return [];

  for (const opt of options) {
    if (opt.value === value) return opt.children ?? [];
  }

  return [];
}

export function determineExpandedOptions(
  options: Readonly<Option[]> | null | undefined,
  value: Readonly<Set<OptionValue>>,
  parents: OptionValue[] = [],
): OptionValue[] {
  if (options == null) return [];

  for (const opt of options) {
    if (value.has(opt.value)) return parents.concat(opt.value);

    const r = determineExpandedOptions(opt.children, value, parents.concat(opt.value));
    if (r.length > 0) return r;
  }

  return [];
}

export function determineMaxDepth(options: Readonly<Option[]>): number {
  function determine(options: Readonly<Option[]> | undefined, depth: number = 0): number {
    if (!options || options.length === 0) return depth;

    return options.reduce((max, opt) => {
      const currentDepth = opt.children ? determine(opt.children, depth + 1) : depth;
      return Math.max(max, currentDepth);
    }, depth);
  }

  return determine([{ children: options }] as Option[]);
}

export function collectSelectedOptions(
  options: Readonly<Option[]>,
  value: Readonly<Set<OptionValue>>,
): Option[] {
  return options.reduce((sel, opt) => {
    if (value.has(opt.value)) sel.push(opt);
    if (opt.children != null) return sel.concat(collectSelectedOptions(opt.children, value));

    return sel;
  }, [] as Option[]);
}
