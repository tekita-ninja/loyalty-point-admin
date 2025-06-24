'use client';
import { MdDeleteSweep } from "react-icons/md";
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useLocation } from "@/hooks/master/useLocation";
import { TResponseLocation } from "@/schema/master/location";

export default function FormDelete({ data }: { data: TResponseLocation }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useLocation()

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

