'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { postGoal } from '@/lib/services/goalServices'
import { Goal } from '@/types/goal'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Zod schema
const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters')
    .max(500),
  goalType: z.enum(['time', 'count', 'simple'], {
    error: 'Goal type is required',
  }),
  value: z.string().min(1, 'Value is required'),
  deadline: z.date(),
})

function SimpleForm() {
  const { user } = useUser()
  const [goalType, setGoalType] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      goalType: undefined,
      value: '',
      deadline: undefined,
    },
  })

  const valuePlaceholder = {
    time: 'e.g., 50 hours',
    count: 'e.g., 10 tasks',
    simple: 'e.g., 1',
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userGoal: Goal = {
      ...values,
      type: values.goalType,
      id: '',
    }

    try {
      if (!user?.id) return
      await postGoal(user.id, userGoal)
      console.log('Goal created:', userGoal)
      alert('Goal created')
    } catch (error) {
      console.error('Failed to create goal:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Title */}
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

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Brief description of your goal'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Goal Type */}
        <FormField
          control={form.control}
          name='goalType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={e => {
                    field.onChange(e.target.value)
                    setGoalType(e.target.value)
                  }}
                  className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                >
                  <option value=''>Select goal type</option>
                  <option value='time'>Time-based (e.g., 50 hours)</option>
                  <option value='count'>
                    Number of times (e.g., 10 tasks)
                  </option>
                  <option value='simple'>
                    Just complete it (e.g., pass test)
                  </option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Value */}
        <FormField
          control={form.control}
          name='value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Value</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    goalType
                      ? valuePlaceholder[
                          goalType as keyof typeof valuePlaceholder
                        ]
                      : 'Enter value'
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deadline */}
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
                      variant='outline'
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

        {/* Submit */}
        <Button type='submit' className='w-full'>
          Create
        </Button>
      </form>
    </Form>
  )
}

export default function GoalForm() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-center'>Create New Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleForm />
      </CardContent>
    </Card>
  )
}
