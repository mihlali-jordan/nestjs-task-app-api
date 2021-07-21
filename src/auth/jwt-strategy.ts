// Strategy is just an injectable class

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // need to get user from db so we need to inject userRepository
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    // when derived classes have a constructor, they need to call super to initialise the constructor of the parent class
    super({
      secretOrKey: 'mysecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  // what to do after we know the token is valid
  async validate(payload: JwtPayload): Promise<User> {
    // fetch user from the db
    const { username } = payload
    const user: User = await this.usersRepository.findOne({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    // when we return the user, passport will inject it into the request object of our controller so we always have access to it
    return user
  }
}
