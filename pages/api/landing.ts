import dbConnect from 'utils/mongo';
import Products from 'models/Products';
import Partners from 'models/Partners';
import { sendMail } from 'utils/nodemailer';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({});
        const partners = await Partners.find({});
        res.status(200).json({ success: true, data: { products, partners } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        sendMail(req.body);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}