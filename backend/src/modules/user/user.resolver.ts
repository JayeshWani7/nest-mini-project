import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { PaginatedUsers } from './dto/paginated-users.response';
import { UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { MongoIdValidationPipe } from '../../common/pipes/mongo-id-validation.pipe';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';

@Resolver(() => User)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@UseInterceptors(LoggingInterceptor)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => PaginatedUsers, { name: 'users' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('sortBy', { nullable: true, defaultValue: 'createdAt' }) sortBy?: string,
    @Args('sortOrder', { nullable: true, defaultValue: 'desc' }) sortOrder?: 'asc' | 'desc',
  ): Promise<PaginatedUsers> {
    const getUsersArgs: GetUsersArgs = { page, limit, search, sortBy, sortOrder };
    return this.userService.findAll(getUsersArgs);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }, MongoIdValidationPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'userByEmail', nullable: true })
  async findByEmail(@Args('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }, MongoIdValidationPipe) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => ID }, MongoIdValidationPipe) id: string): Promise<User> {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  async deactivateUser(@Args('id', { type: () => ID }, MongoIdValidationPipe) id: string): Promise<User> {
    return this.userService.deactivateUser(id);
  }

  @Mutation(() => User)
  async activateUser(@Args('id', { type: () => ID }, MongoIdValidationPipe) id: string): Promise<User> {
    return this.userService.activateUser(id);
  }
}