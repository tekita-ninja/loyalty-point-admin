import { useContext } from 'react';
import { AlertDialogContext } from './AlertDialogProvider';

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('useAlertDialog must be used within a AlertDialogProvider');
  }
  return context;
}
