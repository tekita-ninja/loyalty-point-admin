'use client';
import { MdDeleteSweep } from "react-icons/md";
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/hooks/menu/useMenu';
import { TResponseMenu } from '@/schema/menu';

export default function FormDelete({ data }: { data: TResponseMenu }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useMenu()

  const handleDelete = () => {
    showAlert({
      title: 'Are you absolutely sure?',
      description:`You will delete data ${data.title}, This action cannot be undone!`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => remove.mutate(data.id)
    });
  };

  return (
    <Button onClick={handleDelete} size={"icon-sm"} variant={'danger'}>
      <MdDeleteSweep />
    </Button>
  )
}

