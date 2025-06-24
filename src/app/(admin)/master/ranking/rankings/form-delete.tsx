'use client';
import { MdDeleteSweep } from "react-icons/md";
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useRanking } from "@/hooks/master/useRanking";
import { TResponseRanking } from "@/schema/master/ranking";

export default function FormDelete({ data }: { data: TResponseRanking }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useRanking()

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

