// src/components/Gallery.jsx
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Image,
    Text,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MotionBox = motion(Box);

const images = [
    {
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        alt: 'Habitación Deluxe',
        title: 'Habitación Deluxe',
        description: 'Espaciosas habitaciones con vistas panorámicas'
    },
    {
        src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
        alt: 'Restaurante',
        title: 'Restaurante Gourmet',
        description: 'Experiencia culinaria de clase mundial'
    },
    {
        src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
        alt: 'Piscina',
        title: 'Piscina Infinity',
        description: 'Relájate con vistas al océano'
    },
    {
        src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
        alt: 'Spa',
        title: 'Spa & Wellness',
        description: 'Tratamientos exclusivos para tu bienestar'
    },
    {
        src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        alt: 'Suite Presidencial',
        title: 'Suite Presidencial',
        description: 'El máximo lujo y confort'
    },
    {
        src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        alt: 'Sala de Eventos',
        title: 'Sala de Eventos',
        description: 'Espacios versátiles para cualquier ocasión'
    },
];

const GalleryItem = ({ image, index, onClick }) => {
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
            cursor="pointer"
            onClick={() => onClick(index)}
            position="relative"
            overflow="hidden"
            role="group"
        >
            <Image
                src={image.src}
                alt={image.alt}
                w="full"
                h="300px"
                objectFit="cover"
                transition="transform 0.3s ease"
                _groupHover={{
                    transform: 'scale(1.05)'
                }}
            />
            <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0,0,0,0.7)"
                color="white"
                p={4}
                transform="translateY(100%)"
                transition="transform 0.3s ease"
                _groupHover={{
                    transform: 'translateY(0)'
                }}
            >
                <Heading size="sm" mb={2}>{image.title}</Heading>
                <Text fontSize="sm">{image.description}</Text>
            </Box>
        </MotionBox>
    );
};

function Gallery() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        onOpen();
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Box
            py={20}
            bg="white"
            id="galeria"
        >
            <Container maxW="container.xl">
                <VStack spacing={12}>
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        textAlign="center"
                    >
                        <Heading
                            mb={4}
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            fontFamily="heading"
                        >
                            Galería
                        </Heading>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="2xl"
                            mx="auto"
                        >
                            Explora nuestras instalaciones de lujo y descubre los espacios que harán de tu estancia una experiencia inolvidable.
                        </Text>
                    </MotionBox>

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={8}
                        w="full"
                    >
                        {images.map((image, index) => (
                            <GalleryItem
                                key={index}
                                image={image}
                                index={index}
                                onClick={openLightbox}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>

                <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                    <ModalOverlay />
                    <ModalContent bg="transparent" boxShadow="none">
                        <ModalCloseButton color="white" />
                        <ModalBody>
                            <Flex justify="center" align="center" position="relative">
                                <IconButton
                                    icon={<FaChevronLeft />}
                                    onClick={prevImage}
                                    position="absolute"
                                    left={4}
                                    aria-label="Previous image"
                                    bg="whiteAlpha.800"
                                    _hover={{ bg: "whiteAlpha.900" }}
                                />
                                <Image
                                    src={images[currentImageIndex].src}
                                    alt={images[currentImageIndex].alt}
                                    maxH="80vh"
                                    objectFit="contain"
                                />
                                <IconButton
                                    icon={<FaChevronRight />}
                                    onClick={nextImage}
                                    position="absolute"
                                    right={4}
                                    aria-label="Next image"
                                    bg="whiteAlpha.800"
                                    _hover={{ bg: "whiteAlpha.900" }}
                                />
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
}

export default Gallery;