import { GetAllGamesMongoRepository } from '../../../infra/db/mongodb/game/get-all-games'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user'
import { GetAllGamesController } from '../../../presentation/controllers/game/get-all-games'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetAllGamesController = (): GetAllGamesController => {
  const secret = env.jwtSecret
  const userGetter = new GetUserMongoRepository()
  const userDecoder = new UserDecoderAdapter(secret)
  const allGamesGetter = new GetAllGamesMongoRepository()
  const getAllGamesController = new GetAllGamesController(userGetter, userDecoder, allGamesGetter)
  return getAllGamesController
}
