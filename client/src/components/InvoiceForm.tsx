import React, { useState } from 'react';
import styled from 'styled-components';
import { InvoiceData, ServiceEntry } from '../types/invoice';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const FormContainer = styled.div`
  padding: 30px;
  background: white;
  overflow-y: auto;
  max-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ServicesTable = styled.div`
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  background: #f8f9fa;
  padding: 12px;
  font-weight: 600;
  border-bottom: 1px solid #e1e5e9;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  padding: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:first-child {
    flex: 0.5;
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #5a6fd8;
  }
  
  &.secondary {
    background: #6c757d;
    
    &:hover {
      background: #5a6268;
    }
  }
  
  &.danger {
    background: #dc3545;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  
  &:hover {
    background: #218838;
  }
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #c82333;
  }
`;

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  onDataChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData, onDataChange }) => {
  const updateField = (section: keyof InvoiceData, field: string, value: any) => {
    onDataChange({
      ...invoiceData,
      [section]: {
        ...invoiceData[section],
        [field]: value
      }
    });
  };

  const updateService = (index: number, field: keyof ServiceEntry, value: any) => {
    const newData = { ...invoiceData };
    newData.services[index] = { ...newData.services[index], [field]: value };
    onDataChange(newData);
  };

  const addService = () => {
    const newService: ServiceEntry = {
      date: '',
      breakfastMeals: 0,
      lunchMeals: 0,
      price: 0
    };
    const newData = { ...invoiceData };
    newData.services.push(newService);
    onDataChange(newData);
  };

  const removeService = (index: number) => {
    const newData = { ...invoiceData };
    newData.services.splice(index, 1);
    onDataChange(newData);
  };

  const calculateTotal = () => {
    return invoiceData.services.reduce((sum, service) => sum + service.price, 0);
  };

  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - invoiceData.summary.discount;
  };

  const calculateUSD = () => {
    const finalTotal = calculateFinalTotal();
    return (finalTotal / invoiceData.summary.exchangeRate).toFixed(0);
  };

  return (
    <FormContainer>
      {/* Company Information */}
      <Section>
        <SectionTitle>معلومات الشركة</SectionTitle>
{/*         
        <FormGroup>
          <Label>اسم الشركة</Label>
          <Input
            type="text"
            value={invoiceData.companyInfo.name}
            onChange={(e) => updateField('companyInfo', 'name', e.target.value)}
            placeholder="اسم الشركة"
          />
        </FormGroup> */}

        <FormGroup>
          <Label>المسؤول</Label>
          <Input
            type="text"
            value={invoiceData.companyInfo.manager}
            onChange={(e) => updateField('companyInfo', 'manager', e.target.value)}
            placeholder="اسم المسؤول"
          />
        </FormGroup>

        {/* Logo and Stamp are now static - no upload needed */}
        <FormGroup>
          <Label>الشعار</Label>
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            الشعار ثابت - لا يمكن تغييره
          </div>
        </FormGroup>

        <FormGroup>
          <Label>الختم</Label>
          <div style={{ 
            padding: '10px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            الختم ثابت - لا يمكن تغييره
          </div>
        </FormGroup>
      </Section>

      {/* Invoice Information */}
      <Section>
        <SectionTitle>معلومات الفاتورة</SectionTitle>
        
        <FormGroup>
          <Label>رقم الفاتورة</Label>
          <Input
            type="text"
            value={invoiceData.invoiceInfo.number}
            onChange={(e) => updateField('invoiceInfo', 'number', e.target.value)}
            placeholder="رقم الفاتورة"
          />
        </FormGroup>

        <FormGroup>
          <Label>تاريخ الفاتورة</Label>
          <Input
            type="date"
            value={invoiceData.invoiceInfo.date}
            onChange={(e) => updateField('invoiceInfo', 'date', e.target.value)}
          />
        </FormGroup>
      </Section>

      {/* Client Information */}
      <Section>
        <SectionTitle>معلومات العميل</SectionTitle>
        
        <FormGroup>
          <Label>اسم العميل</Label>
          <Input
            type="text"
            value={invoiceData.clientInfo.name}
            onChange={(e) => updateField('clientInfo', 'name', e.target.value)}
            placeholder="اسم العميل"
          />
        </FormGroup>
      </Section>

      {/* Services */}
      <Section>
        <SectionTitle>الخدمات</SectionTitle>
        
        <ServicesTable>
          <TableHeader>
            <TableCell>التاريخ</TableCell>
            <TableCell>وجبات الفطور</TableCell>
            <TableCell>وجبات الغداء</TableCell>
            <TableCell>السعر</TableCell>
            <TableCell></TableCell>
          </TableHeader>
          
          {invoiceData.services.map((service, index) => (
            <TableRow key={index}>
              <TableCell>
                <NumberInput
                  type="text"
                  value={service.date}
                  onChange={(e) => updateService(index, 'date', e.target.value)}
                  placeholder="التاريخ"
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  type="number"
                  value={service.breakfastMeals}
                  onChange={(e) => updateService(index, 'breakfastMeals', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  type="number"
                  value={service.lunchMeals}
                  onChange={(e) => updateService(index, 'lunchMeals', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  type="number"
                  value={service.price}
                  onChange={(e) => updateService(index, 'price', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </TableCell>
              <TableCell>
                <RemoveButton onClick={() => removeService(index)}>
                  <FiTrash2 />
                </RemoveButton>
              </TableCell>
            </TableRow>
          ))}
        </ServicesTable>
        
        <AddButton onClick={addService}>
          <FiPlus />
          إضافة خدمة
        </AddButton>
      </Section>

      {/* Summary */}
      <Section>
        <SectionTitle>الملخص</SectionTitle>
        
        <FormGroup>
          <Label>الخصم</Label>
          <Input
            type="number"
            value={invoiceData.summary.discount}
            onChange={(e) => updateField('summary', 'discount', parseInt(e.target.value) || 0)}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>سعر الصرف</Label>
          <Input
            type="number"
            value={invoiceData.summary.exchangeRate}
            onChange={(e) => updateField('summary', 'exchangeRate', parseInt(e.target.value) || 0)}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>العملة</Label>
          <Input
            type="text"
            value={invoiceData.summary.currency}
            onChange={(e) => updateField('summary', 'currency', e.target.value)}
            placeholder="العملة"
          />
        </FormGroup>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <p><strong>المجموع:</strong> {calculateTotal().toLocaleString()} {invoiceData.summary.currency}</p>
          <p><strong>الخصم:</strong> {invoiceData.summary.discount.toLocaleString()} {invoiceData.summary.currency}</p>
          <p><strong>المجموع النهائي:</strong> {calculateFinalTotal().toLocaleString()} {invoiceData.summary.currency}</p>
          <p><strong>بالدولار الأمريكي:</strong> {calculateUSD()} $</p>
        </div>
      </Section>
    </FormContainer>
  );
};

export default InvoiceForm; 