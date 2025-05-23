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

import { useRole } from "@/hooks/role/useRole"
import { useUser } from "@/hooks/user/useUser"
import { formUserRoleSchema, TFormUserRole, TResponseUser } from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ReactSelect } from "@/components/react-select"
type OptionType = {
  label: string
  value: string
}
export function SignRole(props: { data: TResponseUser }) {
  const [roles, setRoles] = useState<OptionType[]>([])
  const [dialog, setDialog] = useState(false)
  const { lists, setRole, getDetail } = useUser()
  const { options } = useRole()

  const form = useForm<TFormUserRole>({
    resolver: zodResolver(formUserRoleSchema),
    defaultValues: {
      userId: props.data.id,
    }
  })

  function onSubmit(values: TFormUserRole) {
    console.log(values, "V")
    const data = {
      userId: values.userId,
      roleIds: roles.map(i=>i.value)
    }
    setRole.mutate(data)
    setDialog(false)
  }

  async function onOpenChange(state: boolean) {
    if (lists.data) {
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
      <DialogContent className="sm:max-w-lg z-50">
        <DialogHeader>
          <DialogTitle>Sign Role Menu</DialogTitle>
          <DialogDescription>
            Sign Menu To <b className="underline">{props.data.email}</b>
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
                    <FormLabel>Roles Menu {props.data.fullname}</FormLabel>
                    <FormControl>
                      <ReactSelect
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
                <Button disabled={lists.isLoading} type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}