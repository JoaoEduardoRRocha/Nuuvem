import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user'
import { GameGetter } from '../../protocols/game/game-getter'

export class GetGameController implements Controller {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly gameGetter: GameGetter

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, gameGetter: GameGetter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.gameGetter = gameGetter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['access-token']
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'))
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

      const gameId = httpRequest.params?.id
      if (!gameId) {
        return badRequest(new MissingParamError('id'))
      }

      const game = await this.gameGetter.getById(gameId)
      if (!game) {
        return badRequest(new MissingParamError('Game not found'))
      }

      return ok(game)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
