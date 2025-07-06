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
import { formBenefitSchema, TFormBenefit, TResponseBenefit } from "@/schema/master/benefit"
import { useBenefit } from "@/hooks/master/useBenefit"
import { useFile } from "@/hooks/files/useFile"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FormBenefit(props?: { data?: TResponseBenefit }) {
  const [dialog, setDialog] = useState(false)
  const { create, update } = useBenefit()
  const { upload } = useFile()
  

  const form = useForm<TFormBenefit>({
    resolver: zodResolver(formBenefitSchema),
    defaultValues: {
      urlPicture: props?.data?.urlPicture ?? '',
      title: '',
      description: '',
    }
  })

  function onSubmit(values: TFormBenefit) {
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
        description: props.data.description ?? '',
        urlPicture: props.data.urlPicture ?? '',
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
          <DialogTitle>Form Benefit</DialogTitle>
          <DialogDescription>
            Form Create Or Update Benefit
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
