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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formRulePointSchema, TFormRulePoint, TResponseRulePoint } from "@/schema/master/rule-point"
import { useRulePoint } from "@/hooks/master/useRulePoint"
import dayjs from "dayjs"

export function FormRulePoint(props?: { data?: TResponseRulePoint }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useRulePoint()

  const form = useForm<TFormRulePoint>({
    resolver: zodResolver(formRulePointSchema),
    defaultValues: {
        isActive: '',
        multiplier: '',
    }
  })

  function onSubmit(values: TFormRulePoint) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        multiplier: Number(values.multiplier),
        isActive: values.isActive === '1' ? 1 : 0,
        name: values.name,
        startDate: values.startDate || undefined,
        endDate: values.endDate || undefined, 
      })
    } else {
      create.mutate({
        multiplier: Number(values.multiplier),
        isActive: values.isActive === '1' ? 1 : 0,
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
      });
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
        name: props.data.name ?? '',
        isActive: String(props.data.isActive) ?? '',
        multiplier: String(props.data.multiplier) ?? '',
        startDate: props.data.startDate ? dayjs(props.data.startDate).format('YYYY-MM-DD') : undefined,
        endDate: props.data.endDate ? dayjs(props.data.endDate).format('YYYY-MM-DD') : undefined,
      })
    }
  }

  const options = [
    { value: '1', label: 'Ya' },
    { value: '0', label: 'Tidak' }
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
          <DialogTitle>Form Promotions</DialogTitle>
          <DialogDescription>
            Form Create Or Update Promotions
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
                        <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="multiplier"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Multiplier</FormLabel>
                        <FormControl>
                        <Input placeholder="Multiplier" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Active</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value !== undefined ? String(field.value) : undefined}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Active" />
                            </SelectTrigger>
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
                    name="startDate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                        <Input type="date" placeholder="Start Date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                        <Input type="date" placeholder="End Date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              <div className="flex justify-end">
                <Button disabled={create.isPending || update.isPending} type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
