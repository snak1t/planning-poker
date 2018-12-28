import { useState, ChangeEvent } from 'react';

type InputElements = HTMLInputElement | HTMLTextAreaElement;

interface UseTextFieldHandler<T> {
    (inputValue: ChangeEvent<T>): void;
}

export const useTextField = <T extends InputElements>(initialValue: string): [string, UseTextFieldHandler<T>] => {
    const [value, setValue] = useState(initialValue);
    const handler: UseTextFieldHandler<T> = inputValue => {
        const valueToSet = inputValue ? inputValue.target.value : '';
        setValue(valueToSet);
    };
    return [value, handler];
};
