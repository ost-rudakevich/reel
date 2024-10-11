import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnActorObject } from './return-actor.object'
import { UpdateActorDto } from './dto/update-actor.dto'
import { generateSlug } from 'src/utils/generate-slug'

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm)

    const actors = await this.prisma.actor.findMany({
      select: returnActorObject,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return actors.filter(actor => !actor.name.includes('EmptyActor'))
  }

  private async search(searchTerm: string) {
    await this.prisma.actor.deleteMany({
      where: {
        name: {
          contains: 'EmptyActor'
        }
      }
    })

    return this.prisma.actor.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      }
    })
  }

  async getBySlug(slug: string) {
    const actor = await this.prisma.actor.findUnique({
      where: {
        slug
      },
      select: returnActorObject
    })

    if (!actor) throw new NotFoundException('Actor not found')

    return actor
  }

  // START ADMIN PANEL

  async getById(id: number) {
    const actor = await this.prisma.actor.findUnique({
      where: {
        id
      },
      select: returnActorObject
    })

    if (!actor) throw new NotFoundException('Actor not found')

    return actor
  }

  async create() {
    const actor = await this.prisma.actor.create({
      data: {
        name: '',
        slug: '',
        photoUrl: '',
        dateOfBirth: new Date(),
        birthplace: ''
      }
    })

    const emptyActorSlug = generateSlug(
      'Empty Actor Number-' + actor.id.toString()
    )

    const updatedActor = await this.prisma.actor.update({
      where: { id: actor.id },
      data: {
        name: 'EmptyActorNumber' + actor.id.toString(),
        slug: emptyActorSlug
      }
    })

    return updatedActor
  }

  async update(id: number, dto: UpdateActorDto) {
    const actor = await this.prisma.actor.findUnique({
      where: {
        id
      }
    })

    if (!actor) throw new NotFoundException('Actor not found')

    const dtoSlug = generateSlug(dto.name)

    // slug має бути унікальним в базі данних

    const actorSlug = await this.prisma.actor.findUnique({
      where: {
        slug: dtoSlug
      }
    })

    if (actorSlug && actorSlug.id !== id)
      throw new BadRequestException(`${dto.name} already exists`)

    return this.prisma.actor.update({
      where: { id },
      data: {
        ...dto,
        slug: dtoSlug
      }
    })
  }

  async delete(id: number) {
    const actor = await this.prisma.actor.findUnique({
      where: {
        id
      }
    })

    if (!actor) throw new NotFoundException('Actor not found')

    return this.prisma.actor.delete({
      where: {
        id
      }
    })
  }
}
