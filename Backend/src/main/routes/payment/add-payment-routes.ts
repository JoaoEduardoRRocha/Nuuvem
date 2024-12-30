import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAddPaymentController } from '../../factories/payment/add-payment'

export default (router: Router): void => {
  router.post('/api/payments', adaptRoute(makeAddPaymentController()))
}
