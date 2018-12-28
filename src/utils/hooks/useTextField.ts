import { useState, ChangeEvent } from 'react';

type UseTextFieldHandler = (inputValue: ChangeEvent<HTMLInputElement>) => void;

export const useTextField = (initialValue: string): [string, UseTextFieldHandler] => {
    const [value, setValue] = useState(initialValue);
    const handler: UseTextFieldHandler = inputValue => {
        const valueToSet = inputValue ? inputValue.target.value : '';
        setValue(valueToSet);
    };
    return [value, handler];
};
