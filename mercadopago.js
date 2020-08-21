const mercadopago = require ('mercadopago');
const config = require('./config')

mercadopago.configure({
  access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

const createPreference = async ({img, title, price}) => {
   
  const back_urls = {
    success: `${config.baseUrl}/success`,
    pending: `${config.baseUrl}/pending`,
    failure: `${config.baseUrl}/failure`
  }

  const payer = {
    name: 'Lalo',
    surname: 'Landa',
    email: 'test_user_63274575@testuser.com',
    phone: {
        area_code: '11',
        number: 22223333
    },
    address: {
        zip_code: '1111',
        street_name: 'False',
        street_number: 123
    }
  }

  const payment_methods = {
    installments: 6,
    default_installments: 1,
    excluded_payment_methods: [
        {
            id: 'amex'
        }
    ],
    excluded_payment_types: [
        {
            id: 'atm'
        }
    ]
  }

  const preference = {
    items: [
      {
        id: 1234,
        title,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url: img,
        unit_price: parseFloat(price),
        quantity : 1
      }
    ],
    external_reference: 'skalic.julian@gmail.com',
    payer,
    back_urls,
    payment_methods,
    auto_return: 'approved',
    notification_url: `${config.baseUrl}/notifications?source_news=webhooks`
  };
  
    try {
        const response = await mercadopago.preferences.create(preference)
        console.log('Preference id:', response.body.id)
        return response.body.init_point;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createPreference }