# New React Component Checklist

Use this when creating a new React component.

## Setup

- [ ] Create file in `frontend/src/components/ComponentName.tsx`
- [ ] Filename matches component name (PascalCase)
- [ ] Use `import type { X }` for type-only imports

## Component Structure

- [ ] Function component (not class)
- [ ] Props interface defined and typed
- [ ] Default export at bottom of file
- [ ] No `any` types

```typescript
import type { AnalyticsEntry } from '../types';
import { useState } from 'react';

interface MyComponentProps {
  data: AnalyticsEntry[];
  onAction: (id: string) => void;
}

function MyComponent({ data, onAction }: MyComponentProps) {
  // state, effects, handlers here
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
}

export default MyComponent;
```

## Quality

- [ ] Lists use unique `key` props (not array index if data has IDs)
- [ ] Loading states handled (show spinner or skeleton)
- [ ] Error states handled (show error message)
- [ ] Empty states handled (show "no data" message)
- [ ] No inline styles — use CSS classes with variables from `:root`

## Integration

- [ ] Import in parent component
- [ ] Pass required props
- [ ] Add CSS classes in `App.css` using CSS variables

## Verification

- [ ] `cd frontend && npx tsc --noEmit` passes
- [ ] Component renders without errors
- [ ] Component handles edge cases (empty data, loading, error)
