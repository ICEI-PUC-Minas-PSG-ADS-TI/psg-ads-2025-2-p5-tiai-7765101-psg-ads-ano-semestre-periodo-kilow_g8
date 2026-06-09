'use client';
import * as React from 'react';
import { Toast } from '@base-ui/react/toast';
import {
  StyledClose,
  StyledDescription,
  StyledRoot,
  StyledTitle,
  StyledViewport,
} from './style';

export function GlobalToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Toast.Provider limit={2} timeout={3000}>
      {children}
      <Toast.Portal>
        <StyledViewport>
          <ToastList />
        </StyledViewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <StyledRoot key={toast.id} toast={toast}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1 }}>
          <StyledTitle />
          <StyledDescription />
        </div>
        <StyledClose aria-label="Fechar toast">×</StyledClose>
      </div>
    </StyledRoot>
  ));
}
