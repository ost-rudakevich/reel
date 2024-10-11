import cn from 'clsx'
import { FC } from 'react'
import * as IconsLu from 'react-icons/lu'
// import * as IconsIo from 'react-icons/io'


const generalIcons = { ...IconsLu }

export type TypeIconName = keyof typeof generalIcons

interface IIcon {
  name: TypeIconName
  className?: string
}

export const Icon: FC<IIcon> = ({ name, className }) => {
  const IconComponent = generalIcons[name]

  if (!IconComponent) {
    console.error(`Icon ${name} does not exist in react-icons`)
    return <div></div>
  }

  return <IconComponent className={cn('size-4', className)} />
}
