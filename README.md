# Logic Builder

A React application for visually constructing nested logical conditions using groups and rules.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Usage

- The root group starts with one empty rule.
- Toggle the **AND / OR** button on any group to switch its logical operator.
- Click **+ Rule** to add a new condition rule to a group.
- Click **+ Group** to nest a new sub-group inside an existing group.
- Click **✕** on a rule or **Delete Group** on a group to remove it.
- The right panel shows the live JSON representation of the condition tree.
- Rules with an empty value field are highlighted in red as invalid.

## Assumptions

- All fields share the same set of operators. No per-field operator filtering.
- Value input is a plain text field for all field types.
- Deleting the root group resets the tree to a fresh default group.
- No persistence — refreshing the page resets all state.

## Known Limitations

- No drag-and-drop reordering of rules or groups.
- No undo/redo support.
- No backend or API integration — all data is client-side only.

## Tech Stack

- React 19 with TypeScript
- Vite
- Functional components and hooks only
- No external state management or form libraries
