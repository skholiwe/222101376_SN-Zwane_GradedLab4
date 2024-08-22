// FormContext.js



import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userDetails: {},
    addressDetails: {},
    paymentDetails: {},
  });

  const updateFormData = (key, data) => {
    setFormData(prevData => ({ ...prevData, [key]: data }));
  };

  const isFormCompleted = Object.values(formData).every(data => Object.keys(data).length > 0);

  return (
    <FormContext.Provider value={{ formData, updateFormData, isFormCompleted }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
