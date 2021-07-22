import nodemailer from 'nodemailer';

interface Product {
  alchol: string;
  count: number;
  name: string;
  partnerId: string;
  price: number;
  taste: string;
  _id: string;
}

interface IMailProps {
  email: string;
  name: string;
  phone: string;
  city: string;
  warehouses: string;
  order: Product[];
  totalPrice: number;
  text?: string;
}

const { MAILTO, MAILPASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAILTO,
    pass: MAILPASS,
  },
});

export const sendOrder = async ({
  email,
  phone,
  name,
  city,
  warehouses,
  totalPrice,
  order,
}: IMailProps) => {
  const orderMessage = order.map(
    (item) => `Сидр: ${item.name} - ${item.count} шт.`
  );
  const mailOptions = {
    from: 'olegsirota95@gmail.com',
    to: 'oleh.sirota@gmail.com',
    subject: 'Новый заказ',
    text: `
            Почта клиента: ${email},
            Номер клиента: ${phone},
            Имя клиента: ${name},
            Город: ${city},
            Отделение: ${warehouses},
            Заказ: ${orderMessage},
            Итоговая цена: ${totalPrice} грн
        `,
  };

  const clientOptions = {
    from: 'olegsirota95@gmail.com',
    to: email,
    subject: 'Оформление заказа',
    text: `
            Ваша почта: ${email},
            Ваш номер: ${phone},
            Ваше имя: ${name},
            Ваш город: ${city},
            Ваш отделение: ${warehouses},
            Заказ: ${orderMessage},
            Карточка монобанка: 99999999999 - Оплатите для получение товара.
            Итоговая цена: ${totalPrice} грн
        `,
  };

  await transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  await transporter.sendMail(clientOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export const sendMail = async ({ email, phone, name, text }: IMailProps) => {
  const mailOptions = {
    from: 'olegsirota95@gmail.com',
    to: 'oleh.sirota@gmail.com',
    subject: 'Новое Уведомление',
    text: `
            Почта клиента: ${email},
            Номер клиента: ${phone},
            Имя клиента: ${name},
            Сообщение: ${text}
        `,
  };

  await transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
