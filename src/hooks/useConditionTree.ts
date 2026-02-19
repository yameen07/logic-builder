import { useState, useCallback } from 'react';
import type { Group, Rule } from '../types';
import { createRule, createGroup } from '../types';
import { updateNodeInTree, deleteNodeFromTree, addChildToGroup, toggleGroupOperator } from '../utils/treeOperations';

export function useConditionTree() {
  const [tree, setTree] = useState<Group>(createGroup);

  const updateRule = useCallback((id: string, changes: Partial<Rule>) => {
    setTree((prev) => updateNodeInTree(prev, id, changes) as Group);
  }, []);

  const deleteNode = useCallback((id: string) => {
    setTree((prev) => {
      const result = deleteNodeFromTree(prev, id);
      return (result as Group) ?? createGroup();
    });
  }, []);

  const toggleOperator = useCallback((id: string) => {
    setTree((prev) => toggleGroupOperator(prev, id) as Group);
  }, []);

  const addRule = useCallback((groupId: string) => {
    setTree((prev) => addChildToGroup(prev, groupId, createRule()) as Group);
  }, []);

  const addGroup = useCallback((groupId: string) => {
    setTree((prev) => addChildToGroup(prev, groupId, createGroup()) as Group);
  }, []);

  return { tree, updateRule, deleteNode, toggleOperator, addRule, addGroup };
}
