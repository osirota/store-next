import dbConnect from 'utils/mongo';
import Products from 'models/Products';
import Partners from 'models/Partners';
import Boxes from 'models/Boxes';
import { sendMail } from 'utils/nodemailer';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({ isAvailable: true });
        const partners = await Partners.find({});
        const boxes = await Boxes.find({});
        res
          .status(200)
          .json({ success: true, data: { products, partners, boxes } });
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
