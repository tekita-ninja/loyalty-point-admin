'use client'
import { Input } from '@/components/ui/input';
import { useUpdateSearchParams } from '@/lib/updateSearchParams';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { BsSearch } from 'react-icons/bs';
const searchSchema = z.object({
  search: z.string().min(2, {
    message: "Keyword must be at least 2 characters.",
  }).optional()
})

interface SearchFormProps {
  placeholder?: string
  paramKey?: string
  onReset?: () => void
}

export function SearchForm({
  placeholder = 'Search...',
  paramKey = 'search',
  onReset,
}: SearchFormProps) {
  const updateParams = useUpdateSearchParams()
  const searchParams = useSearchParams()
  const defaultValue = searchParams.get(paramKey) || ''
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: defaultValue,
    },
  })

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    updateParams({ [paramKey]: values.search || '', page: 1 })
  }

  const handleReset = () => {
    const page = '1'
    const pageSize = '10'

    const newParams = new URLSearchParams()
    newParams.set('page', page)
    newParams.set('pageSize', pageSize)
    window.history.replaceState(null, '', `?${newParams.toString()}`)
    if (onReset) onReset()
    form.reset({ search: '' })
  }

  return (
    <div className="flex gap-2 items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-xl w-full'>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    className='w-full'
                    icon={<BsSearch className='w-4 h-4' />}
                    iconPosition='right'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button onClick={handleReset} className='shrink-0' size={'icon'} variant={'outline'}>
        <FiRefreshCw />
      </Button>
    </div>
  )
}
