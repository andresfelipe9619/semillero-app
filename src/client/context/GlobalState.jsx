import React from 'react';
import { AlertContext } from './Alert';

function GlobalState({ children }) {
  return (
    <>
      <AlertContext>{children}</AlertContext>
    </>
  );
}
export default React.memo(GlobalState);
