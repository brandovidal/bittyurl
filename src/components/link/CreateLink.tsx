import { LinkIcon } from '@/icons/LinkIcon'
import { RefreshIcon } from '@/icons/RefreshIcon'

import type { UserProps } from '@/interfaces/User'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'

import { Toaster } from '@/ui/sonner'
import { toast } from 'sonner'

import { createSlug } from '@/services/link'

import { generateConfetti } from '@/lib/confetti'

import { createFormSchema, type createFormInput } from '@/validators/link'

import { usePreviewLinkStore } from '@/store/preview-link'
import { useUserStore } from '@/store/user'

const defaultValues = {
  url: '',
  slug: ''
}

export function CreateLink () {
  const user = useUserStore(state => state.data)
  console.log("🚀 ~ CreateLink ~ user:", user)

  const store = usePreviewLinkStore(state => state.store)
  const clean = usePreviewLinkStore(state => state.clean)

  const form = useForm<createFormInput>({
    resolver: zodResolver(createFormSchema),
    defaultValues
  })

  async function onSubmit (values: createFormInput) {
    clean()

    const body = { ...values, userId: user?.id }
    const toastLoading = toast.loading('Creating link...')

    try {
      const { data, response } = await createSlug(body)
      toast.dismiss(toastLoading)

      if (data.success) {
        form.reset()

        store({ ...body })
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
