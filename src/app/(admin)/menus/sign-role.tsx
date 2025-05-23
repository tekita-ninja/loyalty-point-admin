"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { IoMdOptions } from "react-icons/io"

import { ReactSelect } from "@/components/react-select"
import { useMenu } from "@/hooks/menu/useMenu"
import { useRole } from "@/hooks/role/useRole"
import { formRoleMenuSchema, TFormRoleMenu, TResponseMenu } from "@/schema/menu"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
export function SignRole(props: { data: TResponseMenu }) {
  const [roles, setRoles] = useState<any[]>([])
  const [dialog, setDialog] = useState(false)
  const { menus, getDetail, setMenu } = useMenu()
  const { options } = useRole()

  const form = useForm<TFormRoleMenu>({
    resolver: zodResolver(formRoleMenuSchema),
    defaultValues: {
      menuId: props.data.id,
    }
  })

  function onSubmit(values: TFormRoleMenu) {
    const data = {
      menuId: values.menuId,
      roleIds: roles.map(i => i.value)
    }
    setMenu.mutate(data)
    setDialog(false)
  }

  async function onOpenChange(state: boolean) {
    if (menus.data) {
      if (state) {
        const results = await getDetail(props.data.id)
        const roles = results.data.roles.map((item: any) => {
          return {
            value: item.role.id,
            label: item.role.name,
          }
        })
        setRoles(roles)
      }
      setDialog(!dialog)
    }
  }

  return (
    <Dialog open={dialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size={"icon-sm"} variant={'default'}>
          <IoMdOptions />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Sign Role Menu</DialogTitle>
          <DialogDescription>
            Sign Menu To <b className="underline">{props.data.title}</b>
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="roleIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Roles Menu {props.data.title}</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isClearable={false}
                        value={roles}
                        onChange={(selected: any) => {
                          setRoles(selected)
                        }}
                        isMulti
                        options={options.data}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={menus.isLoading} type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

