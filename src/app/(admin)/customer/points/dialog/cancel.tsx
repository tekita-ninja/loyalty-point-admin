'use client';
import { useAlertDialog } from '@/components/dialog/useAlertDialog';
import { Button } from '@/components/ui/button';
import { useCustomerPoints } from "@/hooks/customer/useCustomerPoints";
import { TResponseCustomerPoint } from "@/schema/customer-poin";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function FormCancel({ data }: { data: TResponseCustomerPoint }) {
  const { showAlert } = useAlertDialog();
  const { cancel } = useCustomerPoints()

  const handleCancel = () => {
    showAlert({
      title: 'Are you absolutely sure?',
      description:`You will cancel data ${data.point} from ${data.user.firstname} ${data.user.lastname}, This action cannot be undone!`,
      confirmText: 'Cancel',
      cancelText: 'Close',
      onConfirm: () => cancel.mutate(data.id)
    });
  };

  return (
    <Button onClick={handleCancel} variant={'danger'}>
      <Icon icon="material-symbols:cancel" /> Cancel
    </Button>
  )
}

