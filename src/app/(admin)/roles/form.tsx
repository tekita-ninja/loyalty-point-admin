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
import { Input } from "@/components/ui/input"

import { useRole } from "@/hooks/role/useRole"
import { formRoleSchema, TFormRole, TResponseRole } from "@/schema/role"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

export function FormAction(props?: { data?: TResponseRole }) {
  const [dialog, setDialog] = useState(false)
  const { create, update,lists } = useRole()
  const form = useForm<TFormRole>({
    resolver: zodResolver(formRoleSchema),
    defaultValues: {
      name: '',
      code: '',
    }
  })

  function onSubmit(values: TFormRole) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        ...values
      })
    } else {
      create.mutate(values);
    }
    setDialog(false)
  }
  function onOpenChange(state:boolean) {
    setDialog(!dialog)
    if (state && props?.data) {
      form.reset({
        name: props.data.name ?? '',
        code: props.data.code ?? '',
      })
    }
  }

  return (
    <Dialog open={dialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {
          props?.data ? (
            <Button size={"icon-sm"} variant={'warning'}>
              <RiPencilLine />
            </Button>
          ) : (
              <Button className="w-full flex justify-start items-center"> <RiAddLine /> Add New</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Form Role</DialogTitle>
          <DialogDescription>
            Form Create Or Update Role
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
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
