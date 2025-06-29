'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboard } from "@/hooks/dashboard/useDashboard"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationMenu() {
  const { notification } = useDashboard()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'outline'}>
          <div className="relative">
            <Bell />
            {notification.data?.amountLowStockRewards ? (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">{notification.data?.amountLowStockRewards}</div>
            ) : null}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end">
        <DropdownMenuLabel>Notification</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/master/reward/rewards?isLowStock=1')}>
          Rewards
            <DropdownMenuShortcut><div className="bg-red-500 text-white rounded-full px-1 text-xs">{notification.data?.amountLowStockRewards || null}</div></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
