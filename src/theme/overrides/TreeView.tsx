import { Components, Theme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';
import { TreeViewCollapseIcon, TreeViewExpandIcon, TreeViewEndIcon } from './CustomIcons';

export default function TreeView(theme: Theme): Components<Theme> {
  return {
    MuiTreeView: {
      defaultProps: {
        defaultCollapseIcon: <TreeViewCollapseIcon sx={{ width: 20, height: 20 }} />,
        defaultExpandIcon: <TreeViewExpandIcon sx={{ width: 20, height: 20 }} />,
        defaultEndIcon: <TreeViewEndIcon sx={{ color: 'text.secondary', width: 20, height: 20 }} />,
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: { ...theme.typography.body2 },
        iconContainer: { width: 'auto' },
      },
    },
  };
}
