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

import { formAddCustomerPointSchema, TFormAddCustomerPoint } from "@/schema/customer-poin";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useCustomer } from "@/hooks/customer/useCustomer";
import { cn } from "@/lib/utils";
import { useDebounceCallback } from "usehooks-ts"
import { useRulePoint } from "@/hooks/master/useRulePoint"
import { useCustomerPoints } from "@/hooks/customer/useCustomerPoints"
import { useRouter } from "next/navigation"

export function FormAddPoint() {
    const { add } = useCustomerPoints()
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openRulePoint, setOpenRulePoint] = useState(false)
    const [searchOptions, setSearchOptions] = useState<string>("")
    const [searchOptionsRulePoint, setSearchOptionsRulePoint] = useState<string>("")
    const { customerOptions } = useCustomer({search: searchOptions})
    const { rulePointOptions } = useRulePoint({ search: searchOptionsRulePoint })
    const router = useRouter()

    const form = useForm<TFormAddCustomerPoint>({
        resolver: zodResolver(formAddCustomerPointSchema),
        defaultValues: {
            userId: '',
            rulePointId: '',
            price: '',
            note: '',
        }
    })

    function onSubmit(values: TFormAddCustomerPoint) {
          add.mutate({
            ...values,
            price: Number(values.price),
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

    function handleClickRulePointSelect() {
        setOpenRulePoint(false);
    }

    const onChangeSearchRulePoint = useDebounceCallback((value: string) => {
        setSearchOptionsRulePoint(value);
        console.log(value)
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
                        name="rulePointId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rule Point</FormLabel>
                                <Popover open={openRulePoint} onOpenChange={setOpenRulePoint}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openRulePoint}
                                            className="w-full justify-between"
                                        >
                                            {field.value
                                                ? rulePointOptions.data?.find((rulePoint: any) => rulePoint.value === field.value)?.label
                                                : "Select Rule Point..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[1000]">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search rule point..."
                                                className="w-full px-3 py-2 text-sm"
                                                onValueChange={onChangeSearchRulePoint}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No rule point found.</CommandEmpty>
                                                <CommandGroup>
                                                    {rulePointOptions?.data?.map((item: any) => (
                                                            <CommandItem
                                                                key={item.value}
                                                                value={item.label}
                                                                onSelect={() => {
                                                                    field.onChange(item.value)
                                                                    handleClickRulePointSelect()
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
                        <Button disabled={add.isPending} type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
