import {useState, createContext, useRef} from 'react';

export const DefaultContext = createContext();

function DefaultContextProvider(props) {
  const [colA, setColA] = useState(true);
  const [exm, setExm] = useState(true);
  const [test, setTest] = useState(false);

  return (
    <DefaultContext.Provider
      value={{
        test,
        setTest,
        colA,
        setColA,
      }}
    >
      {props.children}
    </DefaultContext.Provider>
  );
}
export default DefaultContextProvider;
