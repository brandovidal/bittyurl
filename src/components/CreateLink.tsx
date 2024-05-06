import { LinkIcon } from '@/icons/LinkIcon'

import { object, string } from 'zod'
import type { TypeOf } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'

const formSchema = object({
  url: string({
    required_error: 'URL is required',
    invalid_type_error: 'URL must be a string'
  }).url({ message: 'Invalid URL' }),
  slug: string({
    required_error: 'Slug is required',
    invalid_type_error: 'Slug must be a string'
  })
    .min(3, 'Slug must be at least 3 characters')
    .max(20, 'Slug must be at most 20 characters')
})

type formInput = TypeOf<typeof formSchema>

const defaultValues = {
  url: '',
  slug: ''
}

export function CreateLink () {
  const form = useForm<formInput>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  function onSubmit (values: formInput) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className='flex items-center space-x-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  placeholder='Enter your long URL'
                  type='url'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>
          <LinkIcon className='h-5 w-5 mr-2' />
          Shorten
        </Button>
      </form>
    </Form>
  )
}
