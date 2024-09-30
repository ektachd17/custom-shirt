import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; 
import cors from 'cors';
import bodyParser from 'body-parser';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// In-memory storage for orders 
interface Order {
    orderId: string;
    color: string;
    customText: string;
    productType: string;
    material: string | null;
    uploadedImage?: string; // Add field for Base64 image string
    basePrice: number
}
const orders: { [key: string]: Order } = {};
const apiKey = process.env.NX_EXCHANGE_RATE_API || '4ab7dff4c046920ee880c90c5d67f984'; 

const T_SHIRT_BASE_PRICES = {
    light: 16.95,
    heavy: 19.95,
  };
  
  const T_SHIRT_COLORS = [
    { color: "black", price: T_SHIRT_BASE_PRICES.light },
    { color: "white", price: T_SHIRT_BASE_PRICES.light },
    { color: "green", price: 18.95 },
    { color: "red", price: 18.95 },
  ];
  
  const SWEATER_BASE_PRICES: Record<string, number> = {
    black: 28.95,
    white: 28.95,
    pink: 32.95,
    yellow: 32.95,
  };
app.get('/api/exchange-rates', async (req, res) => {
    try {
      const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=USD,CAD,EUR`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      res.json(data.rates);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching exchange rates' });
    }
});
// Endpoint to save a T-shirt order
app.post('/api/orders', (req: Request, res: Response) => {
    const { color, material, customText, productType, uploadedImage } = req.body;
    // Generate a unique orderId
    const orderId = uuidv4();
    let basePrice = 0;

    if (productType === "t-shirt") {
      const selectedColor = T_SHIRT_COLORS.find((c) => c.color === color);
      basePrice = selectedColor ? selectedColor.price : T_SHIRT_BASE_PRICES.light;

      if (material === "heavy") {
        basePrice += 3;
      }
    } else if (productType === "sweater") {
      basePrice = SWEATER_BASE_PRICES[color] || SWEATER_BASE_PRICES.black;
    }

    if (customText.length > 8) basePrice += 5;
    if (uploadedImage) basePrice += 10;
     console.log(basePrice)
    const newOrder: Order = { orderId, color, material, customText, productType, uploadedImage , basePrice};
    orders[orderId] = newOrder;

    res.json({ message: 'Order saved successfully', orderId , newOrder});
});

// Endpoint to retrieve an order by ID
app.get('/api/orders/:orderId', (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = orders[orderId];
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
});

app.use('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Zensurance Assignment done by Ekta" })
});
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
});


export { app, server };
