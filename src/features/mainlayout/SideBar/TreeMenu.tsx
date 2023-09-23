import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Typography } from '@mui/material';
import { ComponentProps, SyntheticEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeMenuItem } from '@/types/Layout';
import { SideBarMenuData } from '@/config/sideBarMenu';
import { Link } from 'react-router-dom';
import { TreeIconMap } from '@/config/TreeIconMap';

const CustomTreeItem = styled(TreeItem)`
  .MuiTreeItem-content {
    flex-direction: row-reverse;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const CustomTreeLabel = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5, 0)};

  a {
    display: flex;
    align-items: center;
    width: 100%;
    color: inherit;
    text-decoration: none;
  }

  .labelIcon {
    margin-right: ${(props) => props.theme.spacing(1)};
  }

  .labelText {
    font-weight: inherit;
    flex-grow: 1;
  }
`;

export type StyledTreeItemProps = ComponentProps<typeof TreeItem> & {
  labelText: string;
  labelIcon?: any;
  link?: string;
  onNodeClick: (node: TreeMenuItem) => void;
};

function StyledTreeItem(props: StyledTreeItemProps) {
  const { nodeId, labelText, labelIcon: Icon, link, onNodeClick, ...other } = props;

  return (
    <CustomTreeItem
      nodeId={nodeId}
      label={
        <CustomTreeLabel
          onClick={() => {
            onNodeClick({ id: nodeId, label: labelText, icon: Icon, link });
          }}
        >
          {link ? (
            <Link to={link}>
              {!!Icon && <Icon color="action" className="labelIcon" />}
              <Typography variant="body2" className="labelText">
                {labelText}
              </Typography>
            </Link>
          ) : (
            <>
              {!!Icon && <Icon color="action" className="labelIcon" />}
              <Typography variant="body2" className="labelText">
                {labelText}
              </Typography>
            </>
          )}
        </CustomTreeLabel>
      }
      {...other}
      icon={null}
    />
  );
}

export type TreeBranchProps = {
  node: TreeMenuItem;
  onNodeClick: (node: TreeMenuItem) => void;
};

function TreeBranch({ node, onNodeClick }: TreeBranchProps) {
  const labelIcon = node.icon ? TreeIconMap[node.icon] : null;
  return (
    <StyledTreeItem
      key={node.id}
      nodeId={node.id}
      labelText={node.label}
      link={node.link}
      labelIcon={labelIcon}
      onNodeClick={onNodeClick}
    >
      {Array.isArray(node.children)
        ? node.children.map((n: TreeMenuItem) => <TreeBranch key={n.id} node={n} onNodeClick={onNodeClick} />)
        : null}
    </StyledTreeItem>
  );
}

export type TreeMenuProps = {
  onNodeClick: (node: TreeMenuItem) => void;
};

function TreeMenu({ onNodeClick }: TreeMenuProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleChange = (event: SyntheticEvent, nodes: string[]) => {
    setExpanded(nodes);
  };

  const handleLinkClick = useCallback(
    (node: TreeMenuItem) => {
      onNodeClick(node);
    },
    [onNodeClick]
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={null}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      {SideBarMenuData.map((node) => (
        <TreeBranch node={node} key={node.id} onNodeClick={handleLinkClick} />
      ))}
    </TreeView>
  );
}

export default TreeMenu;
