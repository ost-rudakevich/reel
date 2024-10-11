import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import { useRef } from 'react'

const useCustomToast = () => {
  const toast = useToast()
  const currentToastId = useRef<ToastId | null>(null)

  const showToast = ({
    title,
    description,
    status,
    size = 'xl',
    duration = 4000,
    position = 'bottom',
    ...rest
  }: UseToastOptions) => {
    if (currentToastId.current) {
      toast.close(currentToastId.current)
    }

    const newToastId = toast({
      title,
      description,
      status,
      size,
      duration,
      position,
      ...rest
    })
    currentToastId.current = newToastId
  }

  return showToast
}

export default useCustomToast
