'use client';
import { MdDeleteSweep } from "react-icons/md";
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useRulePoint } from "@/hooks/master/useRulePoint";
import { TResponseRulePoint } from "@/schema/master/rule-point";

export default function FormDelete({ data }: { data: TResponseRulePoint }) {
  const { showAlert } = useAlertDialog();
  const { remove } = useRulePoint()

  const handleDelete = () => {
    showAlert({
      title: 'Are you absolutely sure?',
      description:`You will delete data ${data.multiplier}, This action cannot be undone!`,
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

