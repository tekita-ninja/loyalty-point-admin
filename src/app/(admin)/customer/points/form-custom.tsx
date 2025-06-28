"use client"
import { Button } from "@/components/ui/button"
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

import { formCustomCustomerPointSchema,TFormCustomCustomerPoint } from "@/schema/customer-poin";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useCustomer } from "@/hooks/customer/useCustomer";
import { cn } from "@/lib/utils";
import { useDebounceCallback } from "usehooks-ts"
import { useCustomerPoints } from "@/hooks/customer/useCustomerPoints"
import { useRouter } from "next/navigation"

export function FormCustomPoint() {
    const { custom } = useCustomerPoints()
    const [openCustomer, setOpenCustomer] = useState(false)
    const [searchOptions, setSearchOptions] = useState<string>("")
    const { customerOptions } = useCustomer({search: searchOptions})
    const router = useRouter()

    const form = useForm<TFormCustomCustomerPoint>({
        resolver: zodResolver(formCustomCustomerPointSchema),
        defaultValues: {
            userId: '',
            point: '',
            note: '',
        }
    })

    function onSubmit(values: TFormCustomCustomerPoint) {
          custom.mutate({
            ...values,
            point: Number(values.point),
          });
        form.reset();
        router.push('/customer/points')
    }
    function handleClickCustomerSelect() {
        setOpenCustomer(false);
    }

    const onChangeSearch = useDebounceCallback((value: string) => {
        setSearchOptions(value);
    }, 1000)

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer</FormLabel>
                                <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openCustomer}
                                            className="w-full justify-between"
                                        >
                                            {field.value
                                                ? customerOptions.data?.find((customer: any) => customer.value === field.value)?.label
                                                : "Select Customer..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[1000]">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search customer..."
                                                className="w-full px-3 py-2 text-sm"
                                                onValueChange={onChangeSearch}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No customer found.</CommandEmpty>
                                                <CommandGroup>
                                                    {customerOptions?.data?.map((item: any) => (
                                                            <CommandItem
                                                                key={item.value}
                                                                value={item.label}
                                                                onSelect={() => {
                                                                    field.onChange(item.value)
                                                                    handleClickCustomerSelect()
                                                                }}
                                                            >
                                                                <Check className={cn("mr-2 h-4 w-4", field.value === item.value ? "opacity-100" : "opacity-0")} />
                                                                {item.label}
                                                            </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="point"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Point</FormLabel>
                                <FormControl>
                                    <Input placeholder="point" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Input placeholder="notes" type="string" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button disabled={custom.isPending} type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
