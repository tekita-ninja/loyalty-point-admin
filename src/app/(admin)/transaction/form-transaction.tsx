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

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useCustomer } from "@/hooks/customer/useCustomer";
import { cn } from "@/lib/utils";
import { useDebounceCallback } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { formTransactionSchema, TFormTransaction } from "@/schema/transaction"
import { useTransaction } from "@/hooks/transaction/useTransaction"
import { useLocation } from "@/hooks/master/useLocation"
import { useReward } from "@/hooks/master/useReward"

export function FormTransaction() {
    const { create } = useTransaction()
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openLocation, setOpenLocation] = useState(false)
    const [openReward, setOpenReward] = useState(false)
    const [searchOptions, setSearchOptions] = useState<string>("")
    const [searchOptionsLocation, setSearchOptionsLocation] = useState<string>("")
    const [searchOptionsReward, setSearchOptionsReward] = useState<string>("")
    const { customerOptions } = useCustomer({search: searchOptions})
    const { locationOptions } = useLocation({ search: searchOptionsLocation })
    const { rewardOptions } = useReward({ search: searchOptionsReward })
    const router = useRouter()

    const form = useForm<TFormTransaction>({
        resolver: zodResolver(formTransactionSchema),
        defaultValues: {
            userId: '',
            locationId: '',
            rewardId: '',
            qty: '',
            note: '',
        }
    })

    function onSubmit(values: TFormTransaction) {
          create.mutate({
            ...values,
            qty: parseInt(values.qty),
          }, {
            onSuccess: () => {
                form.reset();
                router.push('/transaction')
            }
          });
    }
    function handleClickCustomerSelect() {
        setOpenCustomer(false);
    }

    const onChangeSearch = useDebounceCallback((value: string) => {
        setSearchOptions(value);
    }, 1000)

    function handleClickLocationSelect() {
        setOpenLocation(false);
    }

    const onChangeSearchLocation = useDebounceCallback((value: string) => {
        setSearchOptionsLocation(value);
        console.log(value)
    }, 1000)

    function handleClickRewardSelect() {
        setOpenReward(false);
    }

    const onChangeSearchReward = useDebounceCallback((value: string) => {
        setSearchOptionsReward(value);
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
                        name="locationId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Popover open={openLocation} onOpenChange={setOpenLocation}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openLocation}
                                            className="w-full justify-between"
                                        >
                                            {field.value
                                                ? locationOptions.data?.find((location: any) => location.value === field.value)?.label
                                                : "Select Location..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[1000]">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search location..."
                                                className="w-full px-3 py-2 text-sm"
                                                onValueChange={onChangeSearchLocation}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup>
                                                    {locationOptions?.data?.map((item: any) => (
                                                            <CommandItem
                                                                key={item.value}
                                                                value={item.label}
                                                                onSelect={() => {
                                                                    field.onChange(item.value)
                                                                    handleClickLocationSelect()
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
                        name="rewardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reward</FormLabel>
                                <Popover open={openReward} onOpenChange={setOpenReward}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openReward}
                                            className="w-full justify-between"
                                        >
                                            {field.value
                                                ? rewardOptions.data?.find((reward: any) => reward.value === field.value)?.label
                                                : "Select Reward..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[1000]">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search reward..."
                                                className="w-full px-3 py-2 text-sm"
                                                onValueChange={onChangeSearchReward}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No reward found.</CommandEmpty>
                                                <CommandGroup>
                                                    {rewardOptions?.data?.map((item: any) => (
                                                            <CommandItem
                                                                key={item.value}
                                                                value={item.label}
                                                                onSelect={() => {
                                                                    field.onChange(item.value)
                                                                    handleClickRewardSelect()
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
                        name="qty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="Quantity" type="number" {...field} />
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
                                    <Input placeholder="notes" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button disabled={create.isPending} type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
