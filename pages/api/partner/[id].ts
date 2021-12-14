import dbConnect from 'utils/mongo';
import Partners from 'models/Partners';
import Products from 'models/Products';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const partnerId = req.query.id;
        const partner = await Partners.findById(partnerId);
        const products = await Products.find({ partnerId });
        res.status(200).json({ success: true, data: { partner, products } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
