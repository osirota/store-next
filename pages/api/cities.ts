export default async function handler(req: any, res: any) {
  const { method, body: handlerBody } = req;

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
          apiKey: '2d17968aff28610916fe8e1db28d5499',
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
