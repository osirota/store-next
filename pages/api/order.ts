import dbConnect from 'utils/mongo';
// import Order from 'models/Order';
// import { sendOrder } from 'utils/nodemailer';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // const data = req.body;
        // const totalPrice = data.order.reduce(
        //   (acc: number, value: any) => acc + value.price * value.count,
        //   0
        // );
        // const order = await Order.create({ ...data, totalPrice });
        // sendOrder(order);
        res.status(201).json(req);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
