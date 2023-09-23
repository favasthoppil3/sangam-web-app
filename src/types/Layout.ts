export type TreeMenuItem = {
  id: string;
  label: string;
  icon?: string;
  link?: string;
  children?: readonly TreeMenuItem[];
};
