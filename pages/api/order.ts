import dbConnect from 'utils/mongo';
import Order from 'models/Order';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const {
          email,
          merchantSignature,
          orderReference,
          amount,
          currency,
          authCode,
          phone,
          createdDate,
          processingDate,
          cardPan,
          cardType,
          issuerBankCountry,
          issuerBankName,
          transactionStatus,
          reason,
          reasonCode,
          fee,
          paymentSystem,
        } = req.body;
        const data = await Order.create({
          email,
          merchantSignature,
          orderReference,
          amount,
          currency,
          authCode,
          phone,
          createdDate,
          processingDate,
          cardPan,
          cardType,
          issuerBankCountry,
          issuerBankName,
          transactionStatus,
          reason,
          reasonCode,
          fee,
          paymentSystem,
        });
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json(req);
      break;
  }
}
