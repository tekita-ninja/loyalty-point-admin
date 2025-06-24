'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDetailRole } from "@/hooks/role/useRole"
import { CheckPermissionItem, GroupedPermissions, useRolePermission } from "@/hooks/useRolePermission"
import { createPermissionGroup } from "@/lib/grouping-data"
import { useEffect, useState } from "react"

export default function SetPermissionContent({ roleId }: { roleId: string }) {
  const [roleGroups, setRoleGroups] = useState<GroupedPermissions>()
  const [permissions, setPermissions] = useState<CheckPermissionItem[] | undefined>([])
  const { data, signRolePermissions } = useRolePermission(roleId)
  const { data: detailRole } = useDetailRole(roleId)
  useEffect(() => {
    if (data) {
      setPermissions(data)
      setRoleGroups(createPermissionGroup(data!))
    }
  }, [data])

  // console.log({ detailRole:detailRole.data.name })

  function handleCheckParent(state: boolean, group: string) {
    setRoleGroups((prev) => {
      if (!prev) return prev;
      const updatedGroup = prev[group].map(item => ({
        ...item,
        checked: state,
      }));
      setPermissions((prev) =>
        prev && prev.map(item =>
          item.path.split("/")[0] === group
            ? { ...item, checked: state }
            : item
        )
      );
      return {
        ...prev,
        [group]: updatedGroup,
      };
    });
  }
  function handleCheckChild(state: boolean, group: string, id: string) {
    setRoleGroups((prev) => {
      if (!prev) return prev;
      const updatedGroup = prev[group].map(item =>
        item.id === id ? { ...item, checked: state } : item
      );
      // Update allPermissions
      setPermissions(prev =>
        prev && prev.map(item =>
          item.id === id ? { ...item, checked: state } : item
        )
      );
      return {
        ...prev,
        [group]: updatedGroup,
      };
    });
  }

  async function handleSaveChanges() {
    const permissionSelected = permissions?.filter(item => item.checked).map(i => i.id)
    if (permissionSelected) {
      signRolePermissions.mutate({
        roleId: roleId,
        permissionIds: permissionSelected
      })
    }
  }

  return (
    <div className="pb-12">
      <div className="font-bold mb-2">Role: {detailRole?.name}</div>
      <div className="grid sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        { 

          roleGroups && Object.entries(roleGroups).map(([group, items]) => (
            <Card key={group} className="border p-3 rounded-lg">
              <div className="flex items-center space-x-2 border-b pb-2">
                <Checkbox onCheckedChange={(e: boolean) => handleCheckParent(e, group)} className="rounded" id={group} />
                <Label className="font-bold text-base uppercase" htmlFor={group}>{group.split("-").join(" ")}</Label>
              </div>
                <div>
                {
                  items.map(item => (
                    <div key={item.id} className="flex my-1 items-center space-x-2">
                      <Checkbox
                        onCheckedChange={(e) => handleCheckChild(!!e, group, item.id)}
                        checked={item.checked}
                        className="rounded"
                        id={item.id}
                      />
                      <Label className="text-base cursor-pointer" htmlFor={item.id}>{item.method} {item.path}</Label>
                    </div>
                  ))
                }
              </div>
            </Card>
          ))
        }
      </div>
      <div className="fixed bottom-3 right-3">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  )
}
