import { Option, OptionValue, Options } from "./typedefs";

export function countSelected(option: Option): number {
  if (option.children == null) return 0;
  return option.children.reduce((t, s) => t + +s?.isSelected, 0) || 0;
}

export function shouldShowExpandedIcon(
  expanded: boolean | null | undefined,
  option: Option,
): boolean {
  return (expanded as boolean) && option.children != null && option.children.length > 0;
}

export function getOptionLeaf(options: Options, value: OptionValue | null | undefined): Options {
  if (value == null) return [];

  for (const opt of options) {
    if (opt.value === value) return opt.children ?? [];
  }

  return [];
}

export function determineExpandedOptions(
  options: Option[] | null | undefined,
  parents: string[] = [],
): OptionValue[] {
  if (options == null) return [];

  for (const opt of options) {
    if (opt.isSelected) return parents.concat(opt.value as any);

    const r = determineExpandedOptions(opt.children, parents.concat(opt.value as any));
    if (r.length > 0) return r;
  }

  return [];
}
