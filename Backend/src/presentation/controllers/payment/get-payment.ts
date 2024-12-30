import { PaymentGetter } from '../../protocols/payments/payment.getter'
import { UserDecoder } from '../../protocols/user/user-decoder'
import { UserGetter } from '../../protocols/user/user-getter'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetPaymentController {
  private readonly userGetter: UserGetter
  private readonly userDecoder: UserDecoder
  private readonly paymentGetter: PaymentGetter

  constructor(userGetter: UserGetter, userDecoder: UserDecoder, paymentGetter: PaymentGetter) {
    this.userGetter = userGetter
    this.userDecoder = userDecoder
    this.paymentGetter = paymentGetter
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body

    if (!httpRequest.headers) {
      return badRequest(new MissingParamError('access-token'))
    }

    const accessToken = httpRequest.headers['access-token']
    if (!accessToken) {
      return badRequest(new MissingParamError('access-token'))
    }

    if (!id) {
      return badRequest(new MissingParamError('id'))
    }

    try {
      const userId = this.userDecoder.decode(accessToken as string)

      const user = await this.userGetter.getById(userId) 
      if (!user) {
        return badRequest(new UserNotFoundError())
      }

      const payment = await this.paymentGetter.get(id)
      if (!payment) {
        return badRequest(new MissingParamError('payment'))
      }

      return ok(payment)
    } catch (error) {
      return serverError(error)
    }
  }
}
