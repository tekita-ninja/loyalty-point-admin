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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { cn, toQueryParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useDebounceCallback } from "usehooks-ts"
import { useCustomer } from "@/hooks/customer/useCustomer"
import { useUser } from "@/hooks/user/useUser"
import { formFilterLogSchema, TFormFilterLog } from "@/schema/log"

export function FormFilterLog() {
    const [dialog, setDialog] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openCreatedBy, setOpenCreatedBy] = useState(false)
    const [searchOptionsCustomer, setSearchOptionsCustomer] = useState<string>("")
    const [searchOptionsCreatedBy, setSearchOptionsCreatedBy] = useState<string>("")
    const { customerOptions } = useCustomer({ search: searchOptionsCustomer })
    const { userOptions } = useUser({ search: searchOptionsCreatedBy })

    const router = useRouter()

    const form = useForm<TFormFilterLog>({
        resolver: zodResolver(formFilterLogSchema),
        defaultValues: {
            userId: undefined,
            createdBy: undefined,
            action: undefined,
            type: undefined,
        }
    })

    function onSubmit(values: TFormFilterLog) {
        const params = toQueryParams(values)
        router.push('/log?' + params)
        form.reset();
        setDialog(false)
    }
    function onOpenChange() {
        setDialog(!dialog)
        form.reset()
    }

    function handleClickCustomerSelect() {
        setOpenCustomer(false);
    }
    function handleClickCreatedBySelect() {
        setOpenCreatedBy(false);
    }

    const onChangeSearch = useDebounceCallback((value: string) => {
        setSearchOptionsCustomer(value);
    }, 500)

    const onChangeSearchCreatedBy = useDebounceCallback((value: string) => {
        setSearchOptionsCreatedBy(value);
        // console.log(value)
    }, 500) 

    const actionOptions = [
        { value: 'ADD_POINT', label: "Add" },
        { value: 'CUSTOM_POINT', label: "Custom" },
        { value: 'CANCEL_POINT', label: "Cancel" },
        { value: 'TRANSACTION_POINT', label: "Transaction" },
    ];

    return (
        <Dialog open={dialog} onOpenChange={onOpenChange} modal={false}>
            <DialogTrigger asChild>

                <Button className="w-full flex justify-start items-center" variant={'outline'}> <Filter /> Filter</Button>

            </DialogTrigger>
            {dialog && (<div className="fixed inset-0 bg-black/50 z-[40]" />)}
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Form Filter</DialogTitle>
                    <DialogDescription>
                        Form Filter Transaction
                    </DialogDescription>
                </DialogHeader>
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
                                            <PopoverContent
                                                side="bottom"
                                                align="start"
                                                className="w-[--radix-popover-trigger-width] p-0 z-[9999] pointer-events-auto bg-white focus-within:outline-none"
                                                forceMount={true}>
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
                                name="createdBy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Created By</FormLabel>
                                        <Popover open={openCreatedBy} onOpenChange={setOpenCreatedBy}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openCreatedBy}
                                                    className="w-full justify-between"
                                                >
                                                    {field.value
                                                        ? userOptions.data?.find((user: any) => user.value === field.value)?.label
                                                        : "Select User..."}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                side="bottom"
                                                align="start"
                                                className="w-[--radix-popover-trigger-width] p-0 z-[9999] pointer-events-auto bg-white focus-within:outline-none"
                                                forceMount={true}>
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search user..."
                                                        className="w-full px-3 py-2 text-sm"
                                                        onValueChange={onChangeSearchCreatedBy}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>No User found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {userOptions?.data?.map((item: any) => (
                                                                <CommandItem
                                                                    key={item.value}
                                                                    value={item.label}
                                                                    onSelect={() => {
                                                                        field.onChange(item.value)
                                                                        handleClickCreatedBySelect()
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
                                name="action"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Action</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Action" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    actionOptions && actionOptions.length > 0 && actionOptions.map((item: any) => (
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
                                <Button type="submit">Filter</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
