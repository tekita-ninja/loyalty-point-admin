import { CheckPermissionItem, GroupedPermissions } from "@/hooks/useRolePermission";
import { TResponseMenu } from "@/schema/menu";

export interface MenuTreeNode extends TResponseMenu {
  checked?: boolean,
  children: MenuTreeNode[];
}

export function createPermissionGroup(permissions: CheckPermissionItem[]) {
  const groupedByFirstSegment = permissions.reduce<GroupedPermissions>((acc, item) => {
    const firstSegment = item.path.split("/")[0];
    if (!acc[firstSegment]) {
      acc[firstSegment] = [];
    }
    acc[firstSegment].push(item);
    return acc;
  }, {});
  return groupedByFirstSegment
}

export function createMenuGroup(data: TResponseMenu[]): MenuTreeNode[] {
  const map = new Map<string, MenuTreeNode>();
  const roots: MenuTreeNode[] = [];

  // Inisialisasi map dengan children kosong
  for (const item of data) {
    map.set(item.id, { ...item, children: [] });
  }

  // Bangun struktur tree
  for (const item of data) {
    const node = map.get(item.id)!;
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  // Rekursif untuk mengurutkan berdasarkan order
  function sortTree(nodes: MenuTreeNode[]): void {
    nodes.sort((a, b) => b.order - a.order);
    for (const node of nodes) {
      if (node.children.length) {
        sortTree(node.children);
      }
    }
  }

  sortTree(roots);
  return roots;
}