// src/App.jsx
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <Box>
      <Header />
      <Hero />
      <Services />
      <BookingForm/>
      <Gallery />
      <Location />
      <Footer />
    </Box>
  );
}

export default App;
