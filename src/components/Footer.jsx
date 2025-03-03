// src/components/Footer.jsx
import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Heading,
    Input,
    Button,
    IconButton,
    VStack,
    HStack,
    Divider,
    Link
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaTripadvisor,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt
} from 'react-icons/fa';

const MotionBox = motion(Box);

const SocialButton = ({ children, label, href }) => {
    return (
        <IconButton
            bg="whiteAlpha.200"
            rounded="full"
            w={8}
            h={8}
            cursor="pointer"
            as="a"
            href={href}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.3s"
            _hover={{
                bg: 'accent.500',
                transform: 'translateY(-2px)'
            }}
            icon={children}
            aria-label={label}
        />
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight="500" fontSize="lg" mb={2} color="white">
            {children}
        </Text>
    );
};

function Footer() {
    return (
        <Box
            bg="gray.900"
            color="white"
            mt="auto"
            id='contacto'
        >
            <Container as={Stack} maxW="container.xl" py={16}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
                    spacing={8}
                >
                    {/* Sobre Nosotros */}
                    <Stack spacing={6}>
                        <Box>
                            <Heading size="md" mb={4}>Luxury Hotel</Heading>
                            <Text fontSize="sm" color="gray.400">
                                Ofrecemos una experiencia única de hospitalidad de lujo,
                                combinando confort excepcional con servicios de primera clase
                                para hacer de su estancia un momento inolvidable.
                            </Text>
                        </Box>
                        <HStack spacing={6}>
                            <SocialButton label="Facebook" href="#">
                                <FaFacebookF />
                            </SocialButton>
                            <SocialButton label="Twitter" href="#">
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label="Instagram" href="#">
                                <FaInstagram />
                            </SocialButton>
                            <SocialButton label="LinkedIn" href="#">
                                <FaLinkedinIn />
                            </SocialButton>
                            <SocialButton label="TripAdvisor" href="#">
                                <FaTripadvisor />
                            </SocialButton>
                        </HStack>
                    </Stack>

                    {/* Links Rápidos */}
                    <Stack align="flex-start">
                        <ListHeader>Links Rápidos</ListHeader>
                        {['Inicio', 'Habitaciones', 'Servicios', 'Reservas', 'Galería', 'Contacto'].map((text) => (
                            <Link
                                key={text}
                                href="#"
                                color="gray.400"
                                _hover={{ color: 'accent.500' }}
                            >
                                {text}
                            </Link>
                        ))}
                    </Stack>

                    {/* Políticas */}
                    <Stack align="flex-start">
                        <ListHeader>Políticas</ListHeader>
                        {[
                            'Términos y Condiciones',
                            'Política de Privacidad',
                            'Política de Cancelación',
                            'Política de Cookies',
                            'FAQs'
                        ].map((text) => (
                            <Link
                                key={text}
                                href="#"
                                color="gray.400"
                                _hover={{ color: 'accent.500' }}
                            >
                                {text}
                            </Link>
                        ))}
                    </Stack>

                    {/* Newsletter */}
                    <Stack align="flex-start">
                        <ListHeader>Newsletter</ListHeader>
                        <Text color="gray.400">
                            Suscríbete para recibir ofertas especiales y novedades exclusivas.
                        </Text>
                        <Stack direction="row" width="100%">
                            <Input
                                placeholder="Tu email"
                                bg="whiteAlpha.100"
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300'
                                }}
                            />
                            <Button
                                bg="accent.500"
                                _hover={{
                                    bg: 'accent.600'
                                }}
                            >
                                Suscribir
                            </Button>
                        </Stack>

                        {/* Información de Contacto */}
                        <VStack spacing={3} align="flex-start" mt={6}>
                            <HStack spacing={3}>
                                <FaPhone />
                                <Text color="gray.400">+1 (305) 555-0123</Text>
                            </HStack>
                            <HStack spacing={3}>
                                <FaEnvelope />
                                <Text color="gray.400">reservations@luxuryhotel.com</Text>
                            </HStack>
                            <HStack spacing={3}>
                                <FaMapMarkerAlt />
                                <Text color="gray.400">123 Ocean Drive, Miami Beach, FL 33139</Text>
                            </HStack>
                        </VStack>
                    </Stack>
                </SimpleGrid>

                <Divider my={8} />

                {/* Copyright */}
                <Text
                    pt={6}
                    fontSize="sm"
                    textAlign="center"
                    color="gray.400"
                >
                    © {new Date().getFullYear()} Luxury Hotel. Todos los derechos reservados.
                </Text>
            </Container>
        </Box>
    );
}

export default Footer;