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
import { formRankingSchema, TFormRanking, TResponseRanking } from "@/schema/master/ranking"
import { useRanking } from "@/hooks/master/useRanking"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRulePoint } from "@/hooks/master/useRulePoint"

export function FormRanking(props?: { data?: TResponseRanking }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useRanking()
  const { options } = useRulePoint()

  const form = useForm<TFormRanking>({
    resolver: zodResolver(formRankingSchema),
    defaultValues: {
        name: '',
        minPoints: 0,
        minSpendings: 0,
        rulePointId: '',
    }
  })

  function onSubmit(values: TFormRanking) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        ...values
      })
    } else {
      create.mutate({
        ...values
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
        minPoints: props.data.minPoints ?? 0,
        minSpendings: props.data.minSpendings ?? 0,
        rulePointId:  props.data.rulePoint.id ?? '',
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
                    name="minPoints"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Min Points</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Min Points" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="minSpendings"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Min Spendings</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Min Spendings" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rulePointId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rule Point</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select rule point" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                                options.data && options.data.length > 0 && options.data.map((item: any) => (
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
