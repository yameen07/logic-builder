let counter = 0;

export function generateId(): string {
  return String(++counter);
}

export interface Rule {
  id: string;
  type: 'rule';
  field: string;
  operator: string;
  value: string;
}

export interface Group {
  id: string;
  type: 'group';
  operator: 'AND' | 'OR';
  children: ConditionNode[];
}

export type ConditionNode = Rule | Group;

export const FIELDS = ['Price', 'Category', 'Rating'] as const;
export const OPERATORS = ['>', '<', '=', '!=', '>=', '<=', 'contains'] as const;

export function createRule(): Rule {
  return {
    id: generateId(),
    type: 'rule',
    field: FIELDS[0],
    operator: OPERATORS[0],
    value: '',
  };
}

export function createGroup(): Group {
  return {
    id: generateId(),
    type: 'group',
    operator: 'AND',
    children: [createRule()],
  };
}
