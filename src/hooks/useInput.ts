import React from 'react';

const useInput = <T>(defaultValues: T) => {
    const [data, setData] = React.useState<T>(defaultValues);

    const handleChange = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    return {
        data,
        handleChange,
    };
};

export default useInput;
