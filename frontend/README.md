# XUXU Frontend

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- React Context API

## Project Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Key Components

### Authentication
```javascript
// src/context/AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### API Integration
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Product Listing
```javascript
// src/components/ProductList.jsx
const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
```

### Cart Management
```javascript
// src/components/Cart.jsx
const Cart = () => {
  const [cart, setCart] = useState([]);
  
  const addToCart = async (productId) => {
    await api.post('/api/cart', { productId, quantity: 1 });
    // Update cart state
  };

  return (
    <div>
      {cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};
```

## Environment Variables
```env
VITE_API_URL=http://localhost:5000
```

## Styling with Tailwind
```javascript
// Example component with Tailwind classes
const Button = ({ children, variant = 'primary' }) => (
  <button className={`
    px-4 py-2 rounded-lg
    ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
    hover:bg-opacity-90
  `}>
    {children}
  </button>
);
```

## Routing
```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Error Handling
```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    console.error('API Error:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.request);
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
  }
};
```
