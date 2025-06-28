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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { RiPencilLine } from "react-icons/ri"

import { TResponseReward } from "@/schema/master/reward"
import { useReward } from "@/hooks/master/useReward"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { toQueryParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { formFilterCustomer, TFormFilterCustomer } from "@/schema/customer";
import { useRanking } from "@/hooks/master/useRanking";

export function FormFilterCustomer(props?: { data?: TResponseReward }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useReward()
  const { options } = useRanking()
  const router = useRouter()

  const form = useForm<TFormFilterCustomer>({
    resolver: zodResolver(formFilterCustomer),
    defaultValues: {
        rankingId: undefined
    }
  })

  function onSubmit(values: TFormFilterCustomer) {
    const params = toQueryParams(values)
    router.push('/customer?' + params)
    form.reset();
    setDialog(false)
  }
  function onOpenChange() {
    setDialog(!dialog)
    if(!props?.data?.id) {
      form.reset()
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
              <Button className="w-full flex justify-start items-center" variant={'outline'}> <Filter /> Filter</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Form Filter</DialogTitle>
          <DialogDescription>
            Form Filter Customer
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                    control={form.control}
                    name="rankingId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ranking</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select ranking" />
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
                <Button disabled={create.isPending || update.isPending} type="submit">Filter</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
