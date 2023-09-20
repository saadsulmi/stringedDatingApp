import { sendSuccessResponse,sendErrorResponse } from "../interactors/ResponseInteractor.js";

export const paymentForPremium =
  (stripe, stripePayment) => async (req, res) => {
    try {
      const pack = "premium";
      const price = "price_1NooC7SBDd7If2NzNrV6G38f";
      const { email } = req.body;
      const session = await stripePayment(stripe, email, price, pack);
      sendSuccessResponse(res,{ url: session.url })
    } catch (error) {
      sendErrorResponse(res,error)
      console.log(error);
    }
  };
