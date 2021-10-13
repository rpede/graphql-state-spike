import { Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export abstract class BaseRepository<T extends {id: number}> {
  constructor(@Inject(PrismaService.name) protected readonly prisma: PrismaService) { }

  protected abstract get delegate();

  find(id: number): Promise<T> {
    return this.delegate.findUnique({ where: { id } });
  }

  all(): Promise<T[]> {
    return this.delegate.findMany();
  }

  count(): Promise<number> {
    return this.prisma.post.count();
  }

  add(data: Partial<T>): Promise<T> {
    return this.delegate.create({ data });
  }

  replace(data: Partial<T>): Promise<T> {
    return this.delegate.update({ where: { id: data.id }, data });
  }
}
