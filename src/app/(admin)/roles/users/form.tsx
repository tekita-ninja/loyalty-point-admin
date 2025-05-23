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

import { useUser } from "@/hooks/user/useUser"
import { formUserSchema, TFormUser, TResponseUser } from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

export function FormAction(props?: { data?: TResponseUser }) {
  const [dialog, setDialog] = useState(false)
  const { create, update,lists } = useUser()
  const form = useForm<TFormUser>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      fullname: '',
      email: '',
    }
  })

  function onSubmit(values: TFormUser) {
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
        fullname: props.data.fullname ?? '',
        email: props.data.email ?? '',
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
          <DialogTitle>Form User</DialogTitle>
          <DialogDescription>
            Form Create Or Update User
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
