// src/components/Services.jsx
import { Box, Container, Heading, SimpleGrid, Text, Icon, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSpa, FaWifi, FaSwimmingPool, FaConciergeBell, FaUtensils, FaParking } from 'react-icons/fa';

const MotionBox = motion(Box);

const ServiceCard = ({ title, description, icon, index }) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <MotionBox
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <VStack
                p={8}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="xl"
                shadow="lg"
                textAlign="center"
                spacing={4}
                height="100%"
                _hover={{
                    transform: 'translateY(-5px)',
                    shadow: '2xl',
                }}
                transition="all 0.3s"
            >
                <Icon
                    as={icon}
                    w={12}
                    h={12}
                    color="accent.500"
                    mb={4}
                />
                <Heading size="md" fontFamily="heading">
                    {title}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                    {description}
                </Text>
            </VStack>
        </MotionBox>
    );
};

const services = [
    {
        title: 'Spa & Bienestar',
        description: 'Relájate en nuestro spa de clase mundial con tratamientos exclusivos y terapias rejuvenecedoras.',
        icon: FaSpa,
    },
    {
        title: 'Wi-Fi de Alta Velocidad',
        description: 'Conectividad premium en todas las áreas del hotel para mantenerte conectado durante tu estancia.',
        icon: FaWifi,
    },
    {
        title: 'Piscina Infinity',
        description: 'Disfruta de nuestra piscina infinity con vistas panorámicas al océano y servicio de bar.',
        icon: FaSwimmingPool,
    },
    {
        title: 'Servicio de Conserjería',
        description: 'Nuestro equipo de conserjería está disponible 24/7 para atender todas tus necesidades.',
        icon: FaConciergeBell,
    },
    {
        title: 'Restaurantes Gourmet',
        description: 'Experiencias culinarias únicas en nuestros restaurantes de primera clase con chefs reconocidos.',
        icon: FaUtensils,
    },
    {
        title: 'Estacionamiento Privado',
        description: 'Servicio de valet parking y estacionamiento seguro para tu vehículo durante tu estancia.',
        icon: FaParking,
    },
];

function Services() {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <Box
            py={20}
            bg={useColorModeValue('gray.50', 'gray.900')}
            id="servicios"
        >
            <Container maxW="container.xl">
                <VStack spacing={12}>
                    <MotionBox
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        textAlign="center"
                    >
                        <Heading
                            mb={4}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            fontFamily="heading"
                        >
                            Nuestros Servicios
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={useColorModeValue('gray.600', 'gray.300')}
                            maxW="2xl"
                            mx="auto"
                        >
                            Descubre una experiencia hotelera excepcional con nuestra amplia gama de servicios premium diseñados para hacer tu estancia inolvidable.
                        </Text>
                    </MotionBox>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={8}
                        w="full"
                    >
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.title}
                                {...service}
                                index={index}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}

export default Services;