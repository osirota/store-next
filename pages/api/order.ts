import dbConnect from 'utils/mongo';
import Order from 'models/Order';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const data = req.body;
        await Order.create({ ...data });
        res.writeHead(302, { Location: '/success' });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json(req);
      break;
  }
}
