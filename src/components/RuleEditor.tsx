import type { Rule } from '../types';
import { FIELDS, OPERATORS } from '../types';

interface Props {
  rule: Rule;
  onUpdate: (id: string, field: Partial<Rule>) => void;
  onDelete: (id: string) => void;
}

export default function RuleEditor({ rule, onUpdate, onDelete }: Props) {
  const isEmpty = rule.value.trim() === '';

  return (
    <div className="rule-row">
      <select
        value={rule.field}
        onChange={(e) => onUpdate(rule.id, { field: e.target.value })}
      >
        {FIELDS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <select
        value={rule.operator}
        onChange={(e) => onUpdate(rule.id, { operator: e.target.value })}
      >
        {OPERATORS.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Value"
        className={isEmpty ? 'invalid' : ''}
        value={rule.value}
        onChange={(e) => onUpdate(rule.id, { value: e.target.value })}
      />

      <button className="btn-delete" onClick={() => onDelete(rule.id)}>✕</button>
    </div>
  );
}
