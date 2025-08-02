import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types/invoice';

// API base URL - use environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
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

const MainContent = styled.main`
  max-width: 95vw;
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
  max-width: 500px;
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
    logo: null,
    stamp: null
  },
  invoiceInfo: {
    number: '202430600',
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
    {
      date: '7/28',
      breakfastMeals: 11,
      lunchMeals: 11,
      price: 1265000
    },
    {
      date: '7/29',
      breakfastMeals: 11,
      lunchMeals: 11,
      price: 1265000
    },
    {
      date: '7/30',
      breakfastMeals: 11,
      lunchMeals: 9,
      price: 1085000
    },
    {
      date: '7/31',
      breakfastMeals: 9,
      lunchMeals: 12,
      price: 1305000
    }
  ],
  summary: {
    discount: 10000,
    exchangeRate: 10000,
    currency: 'SYP'
  }
};

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [isLoading, setIsLoading] = useState(true);

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
              logo: logo ? `${API_BASE_URL}${logo.url}` : null,
              stamp: stamp ? `${API_BASE_URL}${stamp.url}` : null
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

  return (
    <AppContainer>
      <Header>
        <Title>منشئ الفواتير</Title>
        {/* <Subtitle>Invoice Generator - Create Professional Arabic Invoices</Subtitle> */}
      </Header>
      
      <MainContent>
        <FormSection>
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