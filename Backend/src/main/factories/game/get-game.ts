import { GetGameMongoRepository } from '../../../infra/db/mongodb/game/get-game'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { GetGameController } from '../../../presentation/controllers/game/get-game'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetGameController = (): GetGameController => {
  const secret = env.jwtSecret
  const userGetter = new GetUserMongoRepository()
  const userDecoder = new UserDecoderAdapter(secret)
  const gameGetter = new GetGameMongoRepository()
  const getGameController = new GetGameController(userGetter, userDecoder, gameGetter)
  return getGameController
}
