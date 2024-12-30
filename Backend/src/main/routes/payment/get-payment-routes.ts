import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetPaymentController } from '../../factories/payment/get-payment'

export default (router: Router): void => {
  router.get('/api/payments/:id', adaptRoute(makeGetPaymentController()))
}
