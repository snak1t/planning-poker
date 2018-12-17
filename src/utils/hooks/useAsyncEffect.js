import { useEffect } from 'react';
export const useAsyncEffect = (asyncFunction, ...otherParams) =>
    useEffect(() => {
        asyncFunction();
    }, ...otherParams);
