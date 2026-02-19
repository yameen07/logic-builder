import type { ConditionNode, Rule } from '../types';

export function updateNodeInTree(node: ConditionNode, id: string, changes: Partial<Rule>): ConditionNode {
  if (node.id === id && node.type === 'rule') {
    return { ...node, ...changes };
  }
  if (node.type === 'group') {
    return {
      ...node,
      children: node.children.map((child) => updateNodeInTree(child, id, changes)),
    };
  }
  return node;
}

export function deleteNodeFromTree(node: ConditionNode, id: string): ConditionNode | null {
  if (node.id === id) return null;
  if (node.type === 'group') {
    return {
      ...node,
      children: node.children
        .map((child) => deleteNodeFromTree(child, id))
        .filter((child): child is ConditionNode => child !== null),
    };
  }
  return node;
}

export function addChildToGroup(node: ConditionNode, groupId: string, child: ConditionNode): ConditionNode {
  if (node.type === 'group' && node.id === groupId) {
    return { ...node, children: [...node.children, child] };
  }
  if (node.type === 'group') {
    return {
      ...node,
      children: node.children.map((c) => addChildToGroup(c, groupId, child)),
    };
  }
  return node;
}

export function toggleGroupOperator(node: ConditionNode, id: string): ConditionNode {
  if (node.type === 'group' && node.id === id) {
    return { ...node, operator: node.operator === 'AND' ? 'OR' : 'AND' };
  }
  if (node.type === 'group') {
    return {
      ...node,
      children: node.children.map((child) => toggleGroupOperator(child, id)),
    };
  }
  return node;
}
