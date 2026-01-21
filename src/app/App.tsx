import React, { useState } from 'react';

// Pages
import { Login } from './pages/Login';
import { StaffLogin } from './pages/StaffLogin';
import { Dashboard } from './pages/Dashboard';
import { DepartmentCategory } from './pages/DepartmentCategory';
import { ItemList } from './pages/ItemList';
import { AddEditItem } from './pages/AddEditItem';
import { Discount } from './pages/Discount';
import { VendorList } from './pages/VendorList';
import { WarehouseModel } from './pages/WarehouseModel';
import { InvoiceEntry } from './pages/InvoiceEntry';
import { OutwardEntry } from './pages/OutwardEntry';

import { ViewStock } from './pages/ViewStock';
import { InventoryLedger } from './pages/InventoryLedger';
import { AuditLogs } from './pages/AuditLogs';
import { LabelCreation } from './pages/LabelCreation';
import { Reports } from './pages/Reports';
import { POS } from './pages/POS';
import { TaxConfig } from './pages/TaxConfig';
import { CompanySettings } from './pages/CompanySettings';

import { CreateCompany } from './pages/CreateCompany';
import { Profile } from './pages/Profile';
import { UserManagement } from './pages/UserManagement';
import { ForgotPassword } from './pages/ForgotPassword';

import { Layout, Page } from './components/wireframe/Layout';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login': return (
        <Login 
          onLogin={() => setCurrentPage('dashboard')} 
          onCreateAccount={() => setCurrentPage('create-company')}
          onForgotPassword={() => setCurrentPage('forgot-password')}
          onStaffLogin={() => setCurrentPage('staff-login')}
        />
      );
      case 'staff-login': return (
        <StaffLogin 
          onLogin={() => setCurrentPage('dashboard')} 
          onBackToMain={() => setCurrentPage('login')}
        />
      );
      case 'forgot-password': return (
        <ForgotPassword 
          onBack={() => setCurrentPage('login')} 
        />
      );
      case 'create-company': return (
        <CreateCompany 
          onBack={() => setCurrentPage('login')} 
          onComplete={() => setCurrentPage('dashboard')} 
        />
      );
      case 'dashboard': return <Dashboard onNavigate={(page) => setCurrentPage(page as Page)} />;
      case 'department-category': return <DepartmentCategory />;
      case 'items': return <ItemList />;
      case 'add-item': return <AddEditItem />;
      case 'discount': return <Discount />;
      case 'vendors': return <VendorList />;
      case 'warehouse': return <WarehouseModel />;
      case 'invoice': return <InvoiceEntry />;
      case 'outward': return <OutwardEntry />;

      case 'stock': return <ViewStock />;
      case 'pos': return <POS />;
      case 'ledger': return <InventoryLedger />;
      case 'users': return <UserManagement />;
      case 'profile': return <Profile />;
      case 'audit': return <AuditLogs />;
      case 'label-creation': return <LabelCreation />;
      case 'reports': return <Reports />;
      case 'tax-config': return <TaxConfig />;
      case 'company-settings': return <CompanySettings />;
      default: return <Dashboard onNavigate={(page) => setCurrentPage(page as Page)} />;
    }
  };

  return (
    <>
      {currentPage === 'login' || currentPage === 'staff-login' || currentPage === 'create-company' || currentPage === 'forgot-password' ? (
        renderPage()
      ) : (
        <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
          {renderPage()}
        </Layout>
      )}
      <ThemeSwitcher />
    </>
  );
}