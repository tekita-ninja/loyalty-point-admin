'use client';
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';

export default function Delete() {
  const { showAlert } = useAlertDialog();

  const handleDelete = () => {
    showAlert({
      title: 'Delete item?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        console.log('Item deleted');
      },
    });
  };

  return <Button onClick={handleDelete}>Delete Something</Button>;
}
