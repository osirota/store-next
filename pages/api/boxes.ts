import dbConnect from 'utils/mongo';
import Boxes from 'models/Boxes';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const boxes = await Boxes.find({});
        res.status(200).json({ success: true, boxes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
