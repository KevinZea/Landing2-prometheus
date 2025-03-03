import { Box, Container, Heading, Text, VStack, HStack, Icon, Link, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const MotionBox = motion(Box);

const ContactInfo = ({ icon, title, content, link }) => (
    <HStack spacing={4} align="flex-start">
        <Icon as={icon} w={6} h={6} color="accent.500" />
        <Box>
            <Text fontWeight="bold" fontSize="lg">
                {title}
            </Text>
            {link ? (
                <Link href={link} color="accent.500" _hover={{ textDecoration: 'none', color: 'accent.600' }}>
                    {content}
                </Link>
            ) : (
                <Text color="gray.600">{content}</Text>
            )}
        </Box>
    </HStack>
);

function Location() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <Box
            py={20}
            bg="gray.50"
            id="ubicación"
        >
            <Container maxW="container.xl">
                <VStack spacing={12}>
                    <MotionBox
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        textAlign="center"
                        w="full"
                    >
                        <Heading
                            mb={4}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            fontFamily="heading"
                        >
                            Ubicación y Contacto
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="2xl"
                            mx="auto"
                        >
                            Ubicados en el corazón de la ciudad, con fácil acceso a las principales atracciones turísticas y zonas de interés.
                        </Text>
                    </MotionBox>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                        <MotionBox
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <VStack spacing={6} align="stretch">
                                <ContactInfo
                                    icon={FaMapMarkerAlt}
                                    title="Dirección"
                                    content="123 Ocean Drive, Miami Beach, FL 33139"
                                    link="https://maps.google.com" // Reemplaza con el link real
                                />
                                <ContactInfo
                                    icon={FaPhone}
                                    title="Teléfono"
                                    content="+1 (305) 555-0123"
                                    link="tel:+13055550123"
                                />
                                <ContactInfo
                                    icon={FaEnvelope}
                                    title="Email"
                                    content="reservations@luxuryhotel.com"
                                    link="mailto:reservations@luxuryhotel.com"
                                />
                                <ContactInfo
                                    icon={FaClock}
                                    title="Horario de Recepción"
                                    content="24 horas, 7 días a la semana"
                                />
                            </VStack>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            borderRadius="xl"
                            overflow="hidden"
                            boxShadow="xl"
                            h="400px"
                        >
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.19722938537599%2C25.758994175010666%2C-80.18648982048036%2C25.764543770923066&amp;layer=mapnik"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Ubicación del Hotel"
                            />
                        </MotionBox>
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}

export default Location;