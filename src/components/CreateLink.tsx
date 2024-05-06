import { LinkIcon } from '@/icons/LinkIcon'
import { RefreshIcon } from '@/icons/RefreshIcon'

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
    console.log({ values })
  }

  function randomizeSlug () {
    form.setValue('slug', Math.random().toString(36).slice(2))
    form.trigger('slug')
  }

  return (
    <Form {...form}>
      <form
        className='grid grid-cols-1 gap-4'
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
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormControl>
                <div className='relative'>
                  <Input
                    className='pr-10'
                    placeholder='Generate slug'
                    type='text'
                    autoComplete='off'
                    {...field}
                  />
                  <Button
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                    size='icon'
                    variant='ghost'
                    type='button'
                    onClick={randomizeSlug}
                  >
                    <RefreshIcon className='h-5 w-5' />
                    <span className='sr-only'>Generate slug</span>
                  </Button>
                </div>
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
