'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Goal } from '@/types/goal'
import { useUser } from '@clerk/nextjs'
import { postGoal } from '@/lib/services/goalServices'

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  deadline: z
    .date()
    .refine(val => val instanceof Date && !isNaN(val.getTime()), {
      message: 'Deadline is required',
    }),
})

function SimpleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      deadline: undefined,
    },
  })

  const { user } = useUser()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, deadline } = values
    const userGoal: Goal = {
      title,
      deadline,
    }
    console.log(userGoal)

    try {
      if (!user?.id) {
        return
      }
      await postGoal(user.id, userGoal)
    } catch (error) {
      console.log('Failed to create goal: ', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={!field.value ? 'text-muted-foreground' : ''}
                    >
                      {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                      <CalendarIcon className='ml-2 h-4 w-4' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Create
        </Button>
      </form>
    </Form>
  )
}

export default function GoalMakerPage() {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center'>Create New Item</CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleForm />
      </CardContent>
    </Card>
  )
}
