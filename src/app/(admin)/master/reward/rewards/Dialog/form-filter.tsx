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
import {  RiPencilLine } from "react-icons/ri"

import { formFilterRewardSchema, TFormFilterReward,  TResponseReward } from "@/schema/master/reward"
import { useReward } from "@/hooks/master/useReward"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategory } from "@/hooks/master/useCategory";
import { Filter } from "lucide-react";
import { toQueryParams } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function FormFilterReward(props?: { data?: TResponseReward }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useReward()
  const { options } = useCategory()
  const router = useRouter()

  const form = useForm<TFormFilterReward>({
    resolver: zodResolver(formFilterRewardSchema),
    defaultValues: {
        categoryId: undefined,
        startDate: undefined,
        endDate: undefined,
        isLimited: undefined,
        isLowStock: undefined,
        topLikes: undefined,
    }
  })

  function onSubmit(values: TFormFilterReward) {
    
    const params = toQueryParams(values)
    router.push('/master/reward/rewards?' + params)
    form.reset();
    setDialog(false)
  }
  function onOpenChange() {
    setDialog(!dialog)
    if(!props?.data?.id) {
      form.reset()
    }
   
  }


  const isLimitedOptions = [
    { value: '1', label: "Yes" },
    { value: '0', label: "No" },
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
              <Button className="w-full flex justify-start items-center" variant={'outline'}> <Filter /> Filter</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Form Filter</DialogTitle>
          <DialogDescription>
            Form Filter Rewards
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="startDate" {...field} type="date"  />
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
                      <Input placeholder="endDate" {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topLikes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top Likes</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          isLimitedOptions && isLimitedOptions.length > 0 && isLimitedOptions.map((item: any) => (
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
                name="isLowStock"
                render={({ field }) => (
                 <FormItem>
                    <FormLabel>Low Stock</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          isLimitedOptions && isLimitedOptions.length > 0 && isLimitedOptions.map((item: any) => (
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
                name="isLimited"
                render={({ field }) => (
                 <FormItem>
                    <FormLabel>Limited</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          isLimitedOptions && isLimitedOptions.length > 0 && isLimitedOptions.map((item: any) => (
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
