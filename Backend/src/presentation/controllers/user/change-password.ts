import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserGetter, UserUpdater } from '../../protocols/user'
import { Encrypter } from '../../protocols/user/encrypter'
import { UserDecoder } from '../../protocols/user/user-decoder'

export class ChangePasswordController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter
  private readonly encrypter: Encrypter
  private readonly userUpdater: UserUpdater

  constructor(
    userDecoder: UserDecoder,
    userGetter: UserGetter,
    encrypter: Encrypter,
    userUpdater: UserUpdater
  ) {
    this.userDecoder = userDecoder
    this.userGetter = userGetter
    this.encrypter = encrypter
    this.userUpdater = userUpdater
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const accessToken = httpRequest.headers?.['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const { password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const userId = this.userDecoder.decode(accessToken)

      const user = await this.userGetter.getById(userId)
      if (!user) {
        return userNotFound(new InvalidParamError('access-token'))
      }

      const isSamePassword = await this.encrypter.compare(password, user.password)
      if (isSamePassword) {
        return badRequest(new InvalidParamError('password is equal to old password'))
      }

      const hashedPassword = await this.encrypter.hash(password)
      user.password = hashedPassword

      await this.userUpdater.update(user)

      return ok({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
