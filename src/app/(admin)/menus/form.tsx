"use client"
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useMenu } from "@/hooks/menu/useMenu"

import { formMenuSchema, TFormMenu, TResponseMenu } from "@/schema/menu"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

export function FormMenu(props?: { data?: TResponseMenu }) {
  const [dialog, setDialog] = useState(false)
  const { menuOptions, create, update, menus } = useMenu()
  const form = useForm<TFormMenu>({
    resolver: zodResolver(formMenuSchema),
    defaultValues: {
      title: '',
      path: '',
      icon: '',
      order: 0,
      parentId: undefined,
      isGroup: false,
    }
  })

  function onSubmit(values: TFormMenu) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        ...values
      })
    } else {
      create.mutate(values);
    }
    form.reset();
    setDialog(false)
  }
  function onOpenChange(state:boolean) {
    setDialog(!dialog)
    if(!props?.data?.id) {
      form.reset()
    }
    if (state && props?.data) {
      form.reset({
        title: props.data.title ?? '',
        path: props.data.path ?? '',
        icon: props.data.icon ?? '',
        order: props.data.order ?? 0,
        parentId: props.data.parent?.id ?? undefined,
        isGroup: props.data.isGroup ?? false,
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
          <DialogTitle>Form Menu</DialogTitle>
          <DialogDescription>
            Form Create Or Update Menu
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="isGroup"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel>Make As Group</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Menu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          menuOptions.data && menuOptions.data.length > 0 && menuOptions.data.map((item: any) => (
                            <SelectItem key={item.value} value={item.value} className="cursor-pointer hover:bg-slate-100">
                              <div className="flex items-center gap-2">
                                {
                                  item.icon ? <Icon icon={item.icon} /> : ' - '
                                }
                                {item.label}
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="path" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="icon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="order" {...field} />
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
