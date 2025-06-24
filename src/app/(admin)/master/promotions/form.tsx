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
import { formPromotionsSchema, TFormPromotions, TResponsePromotions } from "@/schema/master/promotions"
import { usePromotions } from "@/hooks/master/usePromotions"
import dayjs from "dayjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useFile } from "@/hooks/files/useFile"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FormPromotions(props?: { data?: TResponsePromotions }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = usePromotions()
  const { upload } = useFile()

  const form = useForm<TFormPromotions>({
    resolver: zodResolver(formPromotionsSchema),
    defaultValues: {
        title: '',
        subtitle: '',
        description: '',
        urlPicture: '',
        startDate: '',
        endDate: '',
        isPush: '1',
    }
  })

  function onSubmit(values: TFormPromotions) {
    if (props?.data?.id) {
       update.mutate({
        id: props.data.id,
        ...values,
        isPush: values.isPush === '1' ? 1 : 0,
      })
    } else {
      create.mutate({
        ...values,
        isPush: values.isPush === '1' ? 1 : 0,
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
        title: props.data.title ?? '',
        subtitle: props.data.subtitle ?? '',
        description: props.data.description ?? '',
        urlPicture: props.data.urlPicture ?? '',
        startDate: props.data.startDate ? dayjs(props.data.startDate).format('YYYY-MM-DD') : '',
        endDate: props.data.endDate ? dayjs(props.data.endDate).format('YYYY-MM-DD') : '',
        isPush: props.data.isPush ? String(props.data.isPush) : '1',
      })
    }
  }

async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  upload.mutate(
    { file, folder: 'promotions' },
    {
      onSuccess: (url) => {
        form.setValue("urlPicture", url);
      },
    }
  );
}

  const options = [
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
          <DialogTitle>Form Promotions</DialogTitle>
          <DialogDescription>
            Form Create Or Update Promotions
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
                                    <Image
                                        src={form.watch("urlPicture")}
                                        alt="Promotion Picture"
                                        width={100}
                                        height={100}
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
                name="urlPicture"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Banner</FormLabel>
                    <FormControl>
                      <Input placeholder="Banner" {...field} />
                    </FormControl>
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
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder="subtitle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
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
                name="isPush"
                render={({ field }) => (
                 <FormItem>
                    <FormLabel>Tampilkan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a choice" />
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
