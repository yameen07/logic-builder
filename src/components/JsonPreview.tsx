import type { ConditionNode } from '../types';

interface Props {
  data: ConditionNode;
}

export default function JsonPreview({ data }: Props) {
  return (
    <div className="json-preview">
      <h3>JSON Output</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
