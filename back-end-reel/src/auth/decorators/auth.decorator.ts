import { UseGuards, applyDecorators } from '@nestjs/common'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { UserRole } from '@prisma/client'

// ENUM UserRole ВЗЯТО ІЗ SCHEMA.PRISMA

export function Auth(role: UserRole = 'USER') {
  return applyDecorators(
    role === 'ADMIN'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard)
  )
}
