export default async function handler(req: any, res: any) {
  const { method, body: handlerBody } = req;
  const { NOVAKEY } = process.env;

  switch (method) {
    case 'POST':
      try {
        const { city } = JSON.parse(handlerBody);
        const body = JSON.stringify({
          modelName: 'AddressGeneral',
          calledMethod: 'getSettlements',
          methodProperties: {
            FindByString: city,
            Warehouse: '1',
            page: '1',
          },
          apiKey: NOVAKEY,
        });

        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          body,
        });
        const data = await response.json();
        res.status(200).json({ data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
