import dbConnect from 'utils/mongo';
import Order from 'models/Order';

export default async function handler(req: any, res: any) {
  const { method, payload } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const data = await Order.create(payload);
        res.status(200).json({ payload, data });
      } catch (error) {
        res.status(400).json(req);
      }
      break;
    default:
      res.status(400).json(req);
      break;
  }
}
