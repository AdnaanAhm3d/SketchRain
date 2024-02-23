import {RemixBrowser} from '@remix-run/react';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import DefaultContextProvider from '../app/Contexts/DefaultContext';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <DefaultContextProvider>
        <RemixBrowser />
      </DefaultContextProvider>
    </StrictMode>,
  );
});
