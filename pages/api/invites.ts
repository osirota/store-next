import dbConnect from 'utils/mongo';
import Invites from 'models/Invites';

export default async function handler(req: any, res: any) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const pets = await Invites.find({});
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const pet = await Invites.create(req.body);
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
