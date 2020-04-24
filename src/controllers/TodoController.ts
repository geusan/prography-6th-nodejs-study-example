import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, Param, Body, BodyParam, NotFoundError } from 'routing-controllers';
import { PrismaClient } from '@prisma/client';

@JsonController('/todos')
export class TodoController extends BaseController {
  
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  @Get()
  public index() {
    return this.prisma.todo.findMany();
  }

  @Post()
  public create(
    @BodyParam('title') title: string,
    @BodyParam('description') description: string,
  ) {
    return this.prisma.todo.create({ data: {
      title, description,
    }});
  }

  @Get('/:todoId')
  public async retrieve(@Param('todoId') todoId: number) {
    const item = await this.prisma
      .todo
      .findOne({
        where: {
          id: Number(todoId),
        },
      });
    if (!item) {
      throw new NotFoundError();
    }
    return item;
  }

  @Put('/:todoId')
  public update(
    @Param('todoId') todoId: number,
    @BodyParam('title') title: string,
    @BodyParam('description') description: string,
  ) {
    return this.prisma.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        title,
        description,
      }
    })
  }

  @Delete('/:todoId')
  public delete(@Param('todoId') todoId: number) {
    return this.prisma.todo.delete({
      where: {
        id: Number(todoId),
      },
    });
  }
}