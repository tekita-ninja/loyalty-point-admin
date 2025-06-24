import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/permission/usePermission";
import { Icon } from '@iconify/react'


export function SyncButton() {
    const { sync } = usePermission();

  return (  
    <Button 
        variant="outline"
        onClick={() => sync.mutate()}
        disabled={sync.isPending}
    >
        <Icon icon="fluent:people-sync-20-filled" /> <span>Sync</span>
    </Button>
  )
}
