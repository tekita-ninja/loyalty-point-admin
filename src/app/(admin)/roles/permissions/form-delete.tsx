'use client';
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/permission/usePermission';
import { TResponsePermission } from '@/schema/permission';
import { MdDeleteSweep } from "react-icons/md";

export default function FormDelete({ data }: { data: TResponsePermission }) {
  const { showAlert } = useAlertDialog();
  const { remove } = usePermission()

  const handleDelete = () => {
    showAlert({
      title: 'Are you absolutely sure?',
      description:`You will delete data ${data.name}, This action cannot be undone!`,
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

