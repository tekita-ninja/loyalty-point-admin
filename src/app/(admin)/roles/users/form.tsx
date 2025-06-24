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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

export function FormAction(props?: { data?: TResponseUser }) {
  const [dialog, setDialog] = useState(false)
  const { create, update,lists } = useUser()
  const form = useForm<TFormUser>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      gender: 'MALE',
      birthDate: ''
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
        firstname: props.data.firstname ?? '',
        lastname: props.data.lastname ?? '',
        email: props.data.email ?? '',
        gender: props.data.gender ?? 'MALE',
        phone: props.data.phone ?? '',
        birthDate: props.data.birthDate ?? '',
      })
    }
  }

  const options = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

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
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="lastname" {...field} />
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
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                 <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          options && options.length > 0 && options.map((item: any) => (
                            <SelectItem key={item.value} value={item.value} className="cursor-pointer hover:bg-slate-100">
                              <div className="flex items-center gap-2">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="phone (62)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input placeholder="birth date" {...field} type="date" />
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
