export interface IGallery {
  items: IGalleryItem[]
  title: string
  variant?: 'vertical' | 'horizontal'
}

export interface IGalleryItemProps {
  item: IGalleryItem
  variant: 'vertical' | 'horizontal'
}

export interface IGalleryItem {
  poster: string
  name: string
  link: string
  content: {
    title: string
    subTitle?: string
  }
}
