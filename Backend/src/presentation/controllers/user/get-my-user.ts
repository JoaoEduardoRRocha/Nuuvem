import { MissingParamError, UserNotFoundError } from '../../errors'
import { badRequest, ok, serverError, userNotFound } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserGetter } from '../../protocols/user'
import { UserDecoder } from '../../protocols/user/user-decoder'

export class GetMyUserController implements Controller {
  private readonly userDecoder: UserDecoder
  private readonly userGetter: UserGetter

  constructor (userDecoder: UserDecoder, userGetter: UserGetter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.headers) {
        return badRequest(new MissingParamError('access-token'))
      }

      const accessToken = httpRequest.headers['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
      }

      const user = await this.userGetter.getById(this.userDecoder.decode(accessToken))
      if (!user) {
        return userNotFound(new UserNotFoundError())
      }


      return ok({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })
    } catch (error) {
      return serverError()
    }
  }
}
