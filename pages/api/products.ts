import dbConnect from 'utils/mongo';
import Products from 'models/Products';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Products.find({});
        res.status(200).json({ success: true, products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
