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
  })
    .trim()
    .url({ message: 'Invalid URL' }),
  slug: string({
    required_error: 'Slug is required',
    invalid_type_error: 'Slug must be a string'
  })
    .trim()
    .max(20, 'Slug must be at most 20 characters')
    .nullish()
}).transform(data => {
  const { url } = data

  // TODO: : generate randomize slug
  const slug = Math.random().toString(36).slice(2)
  console.log('🚀 ~ slug:', slug)

  return { ...data, slug }
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
    console.log({ values })
  }

  return (
    <Form {...form}>
      <form
        className='flex items-start space-x-2'
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
                  autoComplete='off'
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
