import dbConnect from 'utils/mongo';
import Order from 'models/Order';

export default async function handler(req: any, res: any) {
  const { method, ...rest } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const data = await Order.create(rest);
        res.status(200).json({ rest, data });
      } catch (error) {
        res.status(401).json(req);
      }
      break;
    default:
      res.status(402).json(req);
      break;
  }
}
