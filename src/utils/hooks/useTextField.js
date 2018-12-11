import { useState } from 'react';

export const useTextField = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handler = inputValue => {
        const valueToSet = inputValue ? inputValue.target.value : '';
        setValue(valueToSet);
    };
    return [value, handler];
};
