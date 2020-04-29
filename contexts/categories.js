import React, { createContext, useState } from 'react';

export const CategoriesContext = createContext([[], () => {}]);

export function CategoriesContextProvider(props) {
  const [value, setValue] = useState(props.init || []);

  return (
    <CategoriesContext.Provider value={[value, setValue]}>
      {props.children}
    </CategoriesContext.Provider>
  );
}
