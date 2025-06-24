'use client';
import { MdDeleteSweep } from "react-icons/md";
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { TResponseBenefit } from "@/schema/master/benefit";
import { useBenefit } from "@/hooks/master/useBenefit";

export default function FormDelete({ data }: { data: TResponseBenefit }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useBenefit()

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

