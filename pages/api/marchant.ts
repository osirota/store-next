/* eslint-disable max-len */
import { uuid } from 'uuidv4';
import CryptoJS from 'crypto-js';
import format from 'date-fns/format';

export default async function handler(req: any, res: any) {
  const { method } = req;
  const { MERCHANT_SECRET_KEY, MERCHANT_LOGIN, SITE } = process.env;

  switch (method) {
    case 'POST':
      try {
        const cartState = JSON.parse(req.body);
        const amount = cartState.reduce(
          (acc: number, value: any) => acc + value.price * value.count,
          0
        );
        const names = cartState.map((item: any) => item.name);
        const prices = cartState.map((item: any) => item.price);
        const counts = cartState.map((item: any) => item.count);
        const orderDate = format(new Date(), 't');
        const merchantAccount = MERCHANT_LOGIN || '';
        const merchantDomainName = SITE || '';
        const orderReference = uuid();
        const hmacDigest: any = CryptoJS.HmacMD5(
          // eslint-disable-next-line prettier/prettier
          `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};UAH;${names.join(';')};${counts.join(';')};${prices.join(';')}`,
          MERCHANT_SECRET_KEY || ''
        );
        const data = {
          hmacDigest: hmacDigest.toString(),
          names,
          prices,
          counts,
          merchantAccount,
          merchantDomainName,
          orderReference,
          amount,
          orderDate,
        };
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
