import express from "express";
import { paymentForPremium } from "../controller/paymentController.js";
import { stripePayment } from "../interactors/PaymentInteractor.js";
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51NonBQSBDd7If2NztUfsawj0u7a4hQ6Fp7H1UqEwIGsFWoCLY091PbgmYX6exJHISSXhBK0DPs71kEPRT7A85NcY00ZpvCOtVS');
const paymentRouter = express.Router();

paymentRouter.post('/premium', paymentForPremium(stripeInstance, stripePayment));

export default paymentRouter;