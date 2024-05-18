import { FilterFunc } from "packages/react/src/functions";

import { Option, OptionValue } from "./typedefs";

export interface Model {
  get options(): readonly Option[];
  get selections(): readonly OptionValue[];

  add(option: Option): [readonly OptionValue[], boolean];
  remove(option: Option): [readonly OptionValue[], boolean];
  toggle(option: Option): [readonly OptionValue[], boolean];

  isSelected(value: OptionValue): boolean;
  getMaxDepth(): number;
  countSelections(option: Readonly<Option>): number;
  getFilteredOptions(): readonly Option[];
  getSelectedOptions(): readonly Option[];
  getExpandedOptions(): OptionValue[];
  getOptionLeaf(
    options: readonly Option[],
    value: Readonly<OptionValue> | null | undefined,
  ): readonly Option[];
  shouldShowExpandedIcon(option: Option, expanded: boolean | null | undefined): boolean;
}

export class AbstractModel {
  readonly selectionSet: Set<OptionValue>;
  private _filteredOptions: readonly Option[] | undefined;
  private _selectedOptions: readonly Option[] | undefined;
  private _maxDepth: number | undefined;

  constructor(
    public readonly options: readonly Option[],
    public readonly selections: readonly OptionValue[],
    protected readonly filter: FilterFunc,
  ) {
    this.selectionSet = new Set(selections);
  }

  isSelected(value: OptionValue): boolean {
    return this.selectionSet.has(value);
  }

  getMaxDepth(): number {
    if (this._maxDepth != null) return this._maxDepth;

    const determine = (options: readonly Option[] | undefined, depth: number = 0): number => {
      if (!options || options.length === 0) return depth;

      return options.reduce((max, opt) => {
        const currentDepth = opt.children ? determine(opt.children, depth + 1) : depth;
        return Math.max(max, currentDepth);
      }, depth);
    };

    return (this._maxDepth = determine([{ children: this.options }] as Option[]));
  }

  countSelections(option: Readonly<Option>): number {
    if (option.children == null) return 0;
    return option.children.reduce((t, s) => t + +this.isSelected(s.value), 0) || 0;
  }

  getFilteredOptions(): readonly Option[] {
    if (this._filteredOptions != null) return this._filteredOptions;
    if (this.getMaxDepth() > 1) return (this._filteredOptions = this.options);

    return (this._filteredOptions = this.options.filter(
      (o) => !this.isSelected(o.value) && this.filter(o),
    ));
  }

  getSelectedOptions(): readonly Option[] {
    if (this._selectedOptions != null) return this._selectedOptions;

    const collect = (options: readonly Option[]): readonly Option[] => {
      return options.reduce((sel, opt) => {
        if (this.selectionSet.has(opt.value)) sel.push(opt);
        if (opt.children != null) return sel.concat(collect(opt.children));

        return sel;
      }, [] as Option[]);
    };

    return (this._selectedOptions = collect(this.options));
  }

  getExpandedOptions(): OptionValue[] {
    const determine = (
      options: readonly Option[] | null | undefined,
      parents: OptionValue[] = [],
    ): OptionValue[] => {
      if (options == null) return [];

      for (const opt of options) {
        if (this.isSelected(opt.value)) return parents.concat(opt.value);

        const r = determine(opt.children, parents.concat(opt.value));
        if (r.length > 0) return r;
      }

      return [];
    };
    return determine(this.getFilteredOptions());
  }

  getOptionLeaf(
    options: readonly Option[],
    value: Readonly<OptionValue> | null | undefined,
  ): readonly Option[] {
    if (value == null) return [];

    for (const opt of options) {
      if (opt.value === value) return opt.children ?? [];
    }

    return [];
  }

  shouldShowExpandedIcon(option: Option, expanded: boolean | null | undefined): boolean {
    return (expanded as boolean) && option.children != null && option.children.length > 0;
  }
}

export class MultipleValueModel extends AbstractModel implements Model {
  add(option: Option): [readonly OptionValue[], boolean] {
    if (this.isSelected(option.value)) return [this.selections, false];
    return [[...this.selections, option.value], true];
  }

  remove(option: Option): [readonly OptionValue[], boolean] {
    const idx = this.selections.indexOf(option.value);
    if (idx < 0) return [this.selections, false];

    const next = [...this.selections];
    next.splice(idx, 1);
    return [next, true];
  }

  toggle(option: Option): [readonly OptionValue[], boolean] {
    const next = [...this.selections];
    const idx = next.indexOf(option.value);
    if (idx < 0) {
      next.push(option.value);
      return [next, true];
    }

    next.splice(idx, 1);
    return [next, false];
  }
}

export class SingleValueModel extends AbstractModel implements Model {
  add(option: Option): [readonly OptionValue[], boolean] {
    if (this.isSelected(option.value)) return [this.selections, false];
    return [[option.value], true];
  }

  remove(option: Option): [readonly OptionValue[], boolean] {
    if (this.selections[0] !== option.value) return [this.selections, false];
    return [[], true];
  }

  toggle(option: Option): [readonly OptionValue[], boolean] {
    const next = [...this.selections];
    const idx = next.indexOf(option.value);
    if (idx < 0) {
      next.push(option.value);
      return [next, true];
    }

    next.splice(idx, 1);
    return [next, false];
  }
}

interface ContructModelOptions {
  isMultiple: boolean;
  options: readonly Option[];
  value: readonly OptionValue[];
  filterFunc: FilterFunc;
}

export function defaultModelConstructor({
  isMultiple,
  options,
  value,
  filterFunc,
}: ContructModelOptions) {
  if (isMultiple) return new MultipleValueModel(options, value, filterFunc);
  return new SingleValueModel(options, value, filterFunc);
}
