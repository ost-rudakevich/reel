import { Prisma } from '@prisma/client'

export const returnActorObject: Prisma.ActorSelect = {
  id: true,
  createdAt: true,
  name: true,
  slug: true,
  photoUrl: true,
  dateOfBirth: true,
  birthplace: true,
  movies: {
    select: {
      id: true,
      genres: true,
      bigPoster: true,
      title: true,
      slug: true
    }
  }
}
