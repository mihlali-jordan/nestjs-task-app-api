import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from './user.entity'

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // whatever we return from this function is going to become the value of the parameter that is decorated
    // we want to get the request body whenever the request comes in
    const req = ctx.switchToHttp().getRequest()
    return req.user
  },
)
