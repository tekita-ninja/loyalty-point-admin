'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useAllMenu } from '@/hooks/menu/useMenu'
import { useDetailRole } from '@/hooks/role/useRole'
import { createMenuGroup, MenuTreeNode } from '@/lib/grouping-data'
import { TResponseMenu } from '@/schema/menu'
import { useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

export default function SetRoleMenu() {
  const [menus, setMenus] = useState<MenuTreeNode[]>([])
  const searchParams = useSearchParams()
  const roleId = searchParams.get('roleId')
  const { data: roleDetail } = useDetailRole(roleId!)
  const { data: allMenuData } = useAllMenu()
  const { data: roleData, setRole } = useDetailRole(roleId ?? undefined)

  // Set initial checked state
  useEffect(() => {
    if (allMenuData && roleData) {
      const ownedIds = roleData.menus.map(i => i.menu.id)
      const withChecked: TResponseMenu[] = allMenuData.map(item => ({
        ...item,
        checked: ownedIds.includes(item.id)
      }))
      const tree = createMenuGroup(withChecked)
      setMenus(tree)
    }
  }, [allMenuData, roleData])

  // Recursive update checked state for children
  const updateChecked = (node: MenuTreeNode, checked: boolean): MenuTreeNode => {
    return {
      ...node,
      checked,
      children: node.children.map(child => updateChecked(child, checked))
    }
  }

  // Update tree when checkbox is changed
  const handleCheckChange = (id: string, checked: boolean) => {
    const updateTree = (nodes: MenuTreeNode[]): MenuTreeNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return updateChecked(node, checked)
        }
        return {
          ...node,
          children: updateTree(node.children)
        }
      })
    }

    setMenus(prev => updateTree(prev))
  }
  const getCheckedMenuIds = (nodes: MenuTreeNode[]): string[] => {
    const result: string[] = []

    const collect = (nodes: MenuTreeNode[]) => {
      for (const node of nodes) {
        if (node.checked) result.push(node.id)
        if (node.children.length) collect(node.children)
      }
    }

    collect(nodes)
    return result
  }

  function handleSubmit() {
    if (roleDetail?.id) {
      const menuItemIds = getCheckedMenuIds(menus)
      const dataForSend = {
        roleId: roleDetail?.id,
        menuIds: menuItemIds
      }
      setRole.mutate(dataForSend)
    }
  }

  return (
    <div className='mt-4 mb-16'>
      {
        roleDetail ? (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Assign Menu To: {roleDetail.name || ""}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {menus.map(group => (
                    <Fragment key={group.id}>
                      <MenuNode node={group} onChange={handleCheckChange} />
                    </Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className='fixed bottom-4 right-8'>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <Card className='p-4'>
              <div className="space-y-4">
                <Skeleton className='w-full h-8' />
                <Skeleton className='w-full h-8' />
                <div className="space-y-2 ml-6">
                  <Skeleton className='w-full h-8' />
                  <Skeleton className='w-full h-8' />
                  <Skeleton className='w-full h-8' />
                  <Skeleton className='w-full h-8' />
                </div>
                <Skeleton className='w-full h-8' />
                <Skeleton className='w-full h-8' />
                <div className="space-y-2 ml-6">
                  <Skeleton className='w-full h-8' />
                  <Skeleton className='w-full h-8' />
                  <Skeleton className='w-full h-8 ml-6' />
                  <Skeleton className='w-full h-8 ml-6' />
                </div>
            </div>
          </Card>
        )
      }
    </div>
  )
}

// Komponen rekursif untuk render tree
function MenuNode({ node, onChange }: { node: MenuTreeNode, onChange: (id: string, checked: boolean) => void }) {
  return (
    <div className='my-2 border-l-4 rounded border-primary'>
      <div className='flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-2'>
        <Checkbox
          id={node.id}
          className='rounded'
          checked={node.checked}
          onCheckedChange={(checked) => onChange(node.id, Boolean(checked))}
        />
        <Label htmlFor={node.id} className='cursor-pointer py-1 w-full h-full'>{node.title}</Label>
      </div>
      {node.children.length > 0 && (
        <div className='pl-3'>
          {node.children.map(child => (
            <MenuNode key={child.id} node={child} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  )
}


