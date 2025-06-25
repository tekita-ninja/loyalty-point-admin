"use client"
import { Button } from "@/components/ui/button"
import dayjs from "dayjs";
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

import { formRewardSchema, TFormReward, TResponseReward } from "@/schema/master/reward"
import { useReward } from "@/hooks/master/useReward"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategory } from "@/hooks/master/useCategory";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFile } from "@/hooks/files/useFile";

export function FormReward(props?: { data?: TResponseReward }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useReward()
  const { options } = useCategory()
  const { upload } = useFile()

  const form = useForm<TFormReward>({
    resolver: zodResolver(formRewardSchema),
    defaultValues: {
        name: '',
        urlPicture: '',
        price: '',
        categoryId: '',
        startDate: '',
        endDate: '',
        stocks: '',
        isLimited: ''
    }
  })

  function onSubmit(values: TFormReward) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        ...values,
        isLimited: values.isLimited === '1' ? 1 : 0,
        price: Number(values.price),
        stocks: Number(values.stocks),
      })
    } else {
      create.mutate({
        ...values,
        isLimited: values.isLimited === '1' ? 1 : 0,
        price: Number(values.price),
        stocks: Number(values.stocks),
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
        urlPicture: props.data.urlPicture ?? '',
        price: props.data.price ?? 0,
        categoryId: props.data.category?.id ?? '',
        startDate: props.data.startDate ? dayjs(props.data.startDate).format('YYYY-MM-DD') : '',
        endDate: props.data.endDate ? dayjs(props.data.endDate).format('YYYY-MM-DD') : '',
        stocks: props.data.stocks ?? 0,
        isLimited: typeof props.data.isLimited === 'number' ? String(props.data.isLimited) : '0'
      })
    }
  }

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    upload.mutate(
        { file, folder: 'rewards' },
        {
            onSuccess: (url) => {
                form.setValue("urlPicture", url);
            },
        }
    );
 }

  const isLimitedOptions = [
    { value: '1', label: "Ya" },
    { value: '0', label: "Tidak" },
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
          <DialogTitle>Form Rewards</DialogTitle>
          <DialogDescription>
            Form Create Or Update Rewards
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid gap-2">
                <Label htmlFor="picture">Picture</Label>
                {
                    form.watch("urlPicture") && (
                    <div className="flex items-center gap-2 cursor-pointer">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <img
                                            src={form.watch("urlPicture")}
                                            alt="Promotion Picture"
                                            className="max-h-24 object-cover rounded cursor-pointer"
                                            onClick={() => window.open(form.watch('urlPicture'), '_blank')}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Open image</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                    </div>
                    )
                }
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Input 
                        id="picture"
                        type="file" 
                        accept="image/*"
                        onChange={handleUploadFile}
                     />
                </div>
            </div>
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
                name="stocks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stocks</FormLabel>
                    <FormControl>
                      <Input placeholder="stock" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="price" type="number" {...field} />
                    </FormControl>
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
                <Button disabled={create.isPending || update.isPending} type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
