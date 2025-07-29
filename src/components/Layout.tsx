import { Outlet } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      <main className="flex-1">
        <Outlet />
      </main>
      <Rodape />
    </div>
  );
}