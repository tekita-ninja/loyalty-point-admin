'use client';
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/user/useUser';
import { TResponseUser } from '@/schema/user';
import { MdDeleteSweep } from "react-icons/md";

export default function FormDelete({ data }: { data: TResponseUser }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useUser()

  const handleDelete = () => {
    showAlert({
      title: 'Are you absolutely sure?',
      description:`You will delete data ${data.firstname}  ${data.lastname}, This action cannot be undone!`,
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

