import { Header } from './components/Header';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Start } from './components/Start';
import { Programm } from './components/Programm';
import { Info } from './components/Info';
import { Anmeldung } from './components/Anmeldung';
import { Sponsoren } from './components/Sponsoren';
import { Archiv } from './components/Archiv';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="main-content">
        <Hero />
        <div className="main-content__below-hero">
          <div className="main-content__bg-deco" aria-hidden="true">
            <img src="/bg-logo.png" alt="" />
          </div>
          <Start />
        <Programm />
        <Info />
        <Anmeldung />
        <Sponsoren />
        <Archiv />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
