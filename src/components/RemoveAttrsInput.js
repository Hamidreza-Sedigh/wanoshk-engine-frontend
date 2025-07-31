import { useState } from 'react';

function RemoveAttrsInput({ value, onChange }) {
  const [selector, setSelector] = useState('');
  const [attr, setAttr] = useState('');

  const addAttr = () => {
    const trimmedSelector = selector.trim();
    const trimmedAttr = attr.trim();

    if (trimmedSelector && trimmedAttr) {
      onChange([...value, { selector: trimmedSelector, attr: trimmedAttr }]);
      setSelector('');
      setAttr('');
    }
  };

  const removeAttr = (index) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {value.map((item, index) => (
          <span key={index} style={{ background: '#eee', padding: '5px', borderRadius: '5px' }}>
            {item.selector} → {item.attr}
            <button
              onClick={() => removeAttr(index)}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          type="text"
          placeholder="مثلاً img"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
        />
        <input
          type="text"
          placeholder="مثلاً align"
          value={attr}
          onChange={(e) => setAttr(e.target.value)}
        />
        <button onClick={addAttr}>+</button>
      </div>
    </div>
  );
}

export default RemoveAttrsInput;
