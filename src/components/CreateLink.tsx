import { LinkIcon } from '@/icons/LinkIcon'
import { RefreshIcon } from '@/icons/RefreshIcon'

import type { UserProps } from '@/interfaces/User'

import { object, string } from 'zod'
import type { TypeOf } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'

import { Toaster } from '@/ui/sonner'
import { toast } from 'sonner'

import JSConfetti from 'js-confetti'
import { useLinkStore } from '@/store/link'

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

interface Props {
  user: UserProps | null
}

export function CreateLink ({ user }: Props) {
  const store = useLinkStore(state => state.store)
  const clean = useLinkStore(state => state.clean)

  const generateConfetti = async () => {
    const jsConfetti = new JSConfetti()
    await jsConfetti.addConfetti({
      confettiColors: ['#fdd835', '#4caf50', '#2196f3', '#f44336', '#ff9800'],
      confettiRadius: 3,
      confettiNumber: 50
    })
  }

  const form = useForm<formInput>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  async function onSubmit (values: formInput) {
    clean()

    const inputData = { ...values, userId: user?.id }

    const toastLoading = toast.loading('Creating link...')

    try {
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      })
      const data = await response.json()
      toast.dismiss(toastLoading)

      if (data.success) {
        form.reset()

        store(inputData)
        generateConfetti()
        toast.success('Link has been created.', {
          description: 'Link has been created.'
        })
        return
      }

      toast.error('Link not created.', {
        description: data.error.message ?? 'Link not created.'
      })

      if (response.status === 409) {
        form.setError('slug', { message: 'Slug already exists' })
        form.setFocus('slug')
      }
    } catch (err) {
      console.error('[Error]: ', err)
      const message = (err as Error).message

      toast.error('Link not created.', {
        description: message ?? 'Link not created.'
      })
    }
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
        <Toaster richColors />
      </form>
    </Form>
  )
}
