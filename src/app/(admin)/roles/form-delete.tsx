'use client';
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useRole } from "@/hooks/role/useRole";
import { TResponseRole } from '@/schema/role';
import { MdDeleteSweep } from "react-icons/md";

export default function FormDelete({ data }: { data: TResponseRole }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useRole()

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

