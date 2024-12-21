import { UnauthorizedError } from '../../errors'
import { ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { AllGamesGetter } from '../../protocols/game/all-games-getter'

export class GetAllGamesController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly allGamesGetter: AllGamesGetter

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, allGamesGetter: AllGamesGetter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.allGamesGetter = allGamesGetter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['access-token']
      if (!accessToken) {
        return unauthorized(new UnauthorizedError())
      }

      const userId = this.userDecoder.decode(accessToken)
      if (!userId) {
        return unauthorized(new UnauthorizedError())
      }

      const user = await this.userGetter.getById(userId)
      if (!user) {
        return unauthorized(new UnauthorizedError('User not found'))
      }

      if (!user.isAdmin) {
        return unauthorized(new UnauthorizedError('User is not an admin'))
      }

      const games = await this.allGamesGetter.getAll()
      return ok(games)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
