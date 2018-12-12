export const getFormItemAttributes = (values, errors, initialValues, field) => {
    const isTouched = initialValues[field] !== values[field];
    const isError = errors[field];
    return {
        hasFeedback: true,
        validateStatus: isError ? 'error' : isTouched ? 'success' : '',
        help: isError ? errors[field] : '',
    };
};
