import type { Group, ConditionNode, Rule } from '../types';
import RuleEditor from './RuleEditor';

interface Props {
  group: Group;
  depth: number;
  isRoot: boolean;
  onUpdate: (id: string, changes: Partial<Rule>) => void;
  onDelete: (id: string) => void;
  onToggleOperator: (id: string) => void;
  onAddRule: (groupId: string) => void;
  onAddGroup: (groupId: string) => void;
}

const BORDER_COLORS = ['#4a90d9', '#d94a4a', '#49a849', '#c4832d', '#8a4ad9'];

function getBorderColor(depth: number): string {
  return BORDER_COLORS[depth % BORDER_COLORS.length];
}

export default function ConditionGroup({
  group,
  depth,
  isRoot,
  onUpdate,
  onDelete,
  onToggleOperator,
  onAddRule,
  onAddGroup,
}: Props) {
  const renderChild = (child: ConditionNode) => {
    if (child.type === 'rule') {
      return (
        <RuleEditor
          key={child.id}
          rule={child}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      );
    }
    return (
      <ConditionGroup
        key={child.id}
        group={child}
        depth={depth + 1}
        isRoot={false}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onToggleOperator={onToggleOperator}
        onAddRule={onAddRule}
        onAddGroup={onAddGroup}
      />
    );
  };

  return (
    <div
      className="condition-group"
      style={{ borderLeftColor: getBorderColor(depth) }}
    >
      <div className="group-header">
        <button
          className={`toggle-btn ${group.operator === 'AND' ? 'active-and' : 'active-or'}`}
          onClick={() => onToggleOperator(group.id)}
        >
          {group.operator}
        </button>

        <div className="group-actions">
          <button className="btn-add" onClick={() => onAddRule(group.id)}>+ Rule</button>
          <button className="btn-add" onClick={() => onAddGroup(group.id)}>+ Group</button>
          {!isRoot && (
            <button className="btn-delete" onClick={() => onDelete(group.id)}>Delete Group</button>
          )}
        </div>
      </div>

      <div className="group-children">
        {group.children.length === 0 && (
          <p className="empty-hint">No conditions. Add a rule or group.</p>
        )}
        {group.children.map((child, index) => (
          <div key={child.id}>
            {index > 0 && (
              <span className="operator-label">{group.operator}</span>
            )}
            {renderChild(child)}
          </div>
        ))}
      </div>
    </div>
  );
}
