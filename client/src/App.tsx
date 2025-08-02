import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types/invoice';
import Login from './components/Login';

// API base URL - use environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(194, 194, 194) 0%,rgb(137, 137, 137) 100%);
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 10px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const LogoutButton = styled.button`
  margin: 10px 10px;
  padding: 6px 5px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const MainContent = styled.main`
  max-width: 98vw;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  min-height: 95vh;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 700px;
  border-right: 1px solid #e1e5e9;
  overflow-y: auto;
`;

const PreviewSection = styled.div`
  flex: 1;
  min-width: 350px;
  overflow-y: auto;
`;

const defaultInvoiceData: InvoiceData = {
  companyInfo: {
    name: 'MANAL CATERING',
    manager: 'منال مصري',
    logo: '/images/logo.png',
    stamp: '/images/stamp.png'
  },
  invoiceInfo: {
    number: '202430xxx',
    date: new Date().toISOString().split('T')[0]
  },
  clientInfo: {
    name: 'فوزي'
  },
  services: [
    {
      date: '7/27',
      breakfastMeals: 10,
      lunchMeals: 11,
      price: 1240000
    },
  ],
  summary: {
    discount: 10000,
    exchangeRate: 10000,
    currency: 'SYP',
    breakfastPrice: 100000,
    lunchPrice: 100000
  }
};

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_BASE_URL}/protected`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Load stored files from server on component mount
  useEffect(() => {
    const loadStoredFiles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/stored-files`);
        if (response.data.success && response.data.files) {
          const { logo, stamp } = response.data.files;
          
          setInvoiceData(prevData => ({
            ...prevData,
            companyInfo: {
              ...prevData.companyInfo,
              logo: '/images/logo.png',
              stamp: '/images/stamp.png'
            }
          }));
        }
      } catch (error) {
        console.error('Failed to load stored files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredFiles();
  }, []);

  const handleInvoiceDataChange = (newData: InvoiceData) => {
    setInvoiceData(newData);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch {}
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <AppContainer>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          جاري تحميل البيانات...
        </div>
      </AppContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <AppContainer>
        <Login onLoginSuccess={async () => {
          setIsLoading(true);
          try {
            await axios.get(`${API_BASE_URL}/protected`, { withCredentials: true });
            setIsAuthenticated(true);
          } catch {
            setIsAuthenticated(false);
          } finally {
            setIsLoading(false);
          }
        }} />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header>
        {/* <Title>منشئ الفواتير</Title> */}
        {/* <Subtitle>Invoice Generator - Create Professional Arabic Invoices</Subtitle> */}
      </Header>

      <MainContent>
        <FormSection>
        <LogoutButton onClick={handleLogout}>تسجيل الخروج</LogoutButton>
          <InvoiceForm
            invoiceData={invoiceData}
            onDataChange={handleInvoiceDataChange}
          />
        </FormSection>
        <PreviewSection>
          <InvoicePreview invoiceData={invoiceData} />
        </PreviewSection>
      </MainContent>
    </AppContainer>
  );
}

export default App; 