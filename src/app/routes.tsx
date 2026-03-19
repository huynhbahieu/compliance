import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuditList } from "./pages/AuditList";
import { AuditDetail } from "./pages/AuditDetail";
import { CapaList } from "./pages/CapaList";
import { CertificateList } from "./pages/CertificateList";
import { CertificateStorage } from "./pages/CertificateStorage";
import { ChecklistPage } from "./pages/ChecklistPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "audits", element: <AuditList /> },
      { path: "audits/:id", element: <AuditDetail /> },
      { path: "capa", element: <CapaList /> },
      { path: "certificates", element: <CertificateList /> },
      { path: "certificate-storage", element: <CertificateStorage /> },
      { path: "checklist/:id", element: <ChecklistPage /> },
    ],
  },
]);