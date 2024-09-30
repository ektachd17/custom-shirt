import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import ProductTypeSelector from "./components/ProductTypeSelector";
import ColorSelector from "./components/ColorSelector";
import MaterialSelector from "./components/MaterialSelector";
import CustomTextInput from "./components/CustomTextInput";
import ImageUploader from "./components/ImageUploader";
import PriceDisplay from "./components/PriceDisplay";
import PreviewSection from "./components/PreviewSection";
import SaveAsImageButton from "./components/SaveAsImageButton";
import './App.css';

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

const App: React.FC = () => {
  const [productType, setProductType] = useState<string>("t-shirt");
  const [color, setColor] = useState<string>("black");
  const [material, setMaterial] = useState<string>("light");
  const [customText, setCustomText] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const apiUrl = useMemo(() => process.env.NX_API_BASE_URL || 'http://localhost:8080', []);
  
  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }
  }, []);

  const fetchOrderDetails = useCallback(async (orderId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/orders/${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch order details");
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching order:", err);
      throw err;
    }
  }, [apiUrl]);

  useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      fetchOrderDetails(orderId)
        .then(data => {
          if (data) {
            setProductType(data.productType);
            setColor(data.color);
            setMaterial(data.material);
            setCustomText(data.customText);
            setUploadedImage(data.uploadedImage);
          }
        })
        .catch(err => console.error("Error fetching order:", err))
        .finally(() => setIsLoading(false));
    }
  }, [orderId, fetchOrderDetails]);

  const calculatePrice = useCallback(() => {
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

    return basePrice;
  }, [productType, color, material, customText, uploadedImage]);

  useEffect(() => {
    setPrice(calculatePrice());
  }, [calculatePrice]);

  const saveOrder = useCallback(async () => {
    const orderData = { orderId, productType, color, material, customText, uploadedImage };
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      localStorage.setItem('orderId', result.newOrder.orderId);
      console.log(result)
      setOrderId(result.newOrder.orderId);
      setProductType(result.newOrder.productType);
      setColor(result.newOrder.olor);
      setMaterial(result.newOrder.material);
      setCustomText(result.newOrder.customText);
      setUploadedImage(result.newOrder.uploadedImage);
    } catch (err) {
      console.error("Error saving order:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, orderId, productType, color, material, customText, uploadedImage]);

  return (
    <div className="product-configurator">
      <h2>Customize Your T-Shirt/Sweater</h2>
      <ProductTypeSelector productType={productType} setProductType={setProductType} />
      <ColorSelector productType={productType} color={color} setColor={setColor} />
      {productType === "t-shirt" && <MaterialSelector material={material} setMaterial={setMaterial} />}
      <CustomTextInput customText={customText} setCustomText={setCustomText} />
      <ImageUploader setUploadedImage={setUploadedImage} defaultImage={uploadedImage} />
      <div ref={canvasRef}>
        <PreviewSection productType={productType} color={color} customText={customText} imagePreviewUrl={uploadedImage} />
      </div>
      <PriceDisplay price={price} />
      <div className="button-group">
        <SaveAsImageButton canvasRef={canvasRef} />
        <button type="button" id="add-to-cart" className="btn btn-secondary" onClick={saveOrder} disabled={isLoading}>
          {isLoading ? "Saving..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default App;
