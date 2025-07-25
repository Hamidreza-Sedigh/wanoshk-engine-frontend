import { useState } from 'react';

function RemoveTagsInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !value.includes(newTag)) {
      onChange([...value, newTag]); // به آرایه اضافه کن
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {value.map(tag => (
          <span key={tag} style={{ background: '#eee', padding: '5px', borderRadius: '5px' }}>
            {tag}
            <button
              onClick={() => removeTag(tag)}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Add tag..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTag}>+</button>
    </div>
  );
}

export default RemoveTagsInput;
