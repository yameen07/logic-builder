import { useConditionTree } from './hooks/useConditionTree';
import ConditionGroup from './components/ConditionGroup';
import JsonPreview from './components/JsonPreview';
import './App.css';

export default function App() {
  const { tree, updateRule, deleteNode, toggleOperator, addRule, addGroup } = useConditionTree();

  return (
    <div className="app">
      <h1>Logic Builder</h1>
      <div className="layout">
        <div className="builder-panel">
          <ConditionGroup
            group={tree}
            depth={0}
            isRoot={true}
            onUpdate={updateRule}
            onDelete={deleteNode}
            onToggleOperator={toggleOperator}
            onAddRule={addRule}
            onAddGroup={addGroup}
          />
        </div>
        <JsonPreview data={tree} />
      </div>
    </div>
  );
}
