import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
    Text,
    useToast,
    Card,
    CardBody,
    Image,
    Badge,
    Checkbox,
    HStack,
    VStack,
    IconButton,
} from '@chakra-ui/react';
import { FaBed, FaCalendarAlt, FaUsers, FaChild, FaSearch, FaDoorOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';

// Componente de carrusel para las imágenes de habitaciones
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Si no hay imágenes, muestra una imagen por defecto
    if (!images || images.length === 0) {
        return (
            <Image
                src="https://via.placeholder.com/400x300"
                alt="No hay imagen disponible"
                height="200px"
                objectFit="cover"
            />
        );
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <Box position="relative" height="200px">
            <Image
                src={images[currentIndex]?.url || "https://via.placeholder.com/400x300"}
                alt={`Imagen ${currentIndex + 1} de la habitación`}
                height="200px"
                width="100%"
                objectFit="cover"
            />

            {/* Controles del carrusel */}
            {images.length > 1 && (
                <>
                    <IconButton
                        aria-label="Imagen anterior"
                        icon={<FaChevronLeft />}
                        size="sm"
                        position="absolute"
                        left="2"
                        top="50%"
                        transform="translateY(-50%)"
                        borderRadius="full"
                        onClick={goToPrevious}
                        bg="white"
                        color="green.600"
                        _hover={{ bg: "green.100" }}
                    />
                    <IconButton
                        aria-label="Siguiente imagen"
                        icon={<FaChevronRight />}
                        size="sm"
                        position="absolute"
                        right="2"
                        top="50%"
                        transform="translateY(-50%)"
                        borderRadius="full"
                        onClick={goToNext}
                        bg="white"
                        color="green.600"
                        _hover={{ bg: "green.100" }}
                    />

                    {/* Indicador de posición */}
                    <HStack
                        spacing="1"
                        position="absolute"
                        bottom="2"
                        left="50%"
                        transform="translateX(-50%)"
                        justify="center"
                    >
                        {images.map((_, index) => (
                            <Box
                                key={index}
                                h="2"
                                w="2"
                                borderRadius="full"
                                bg={index === currentIndex ? "white" : "whiteAlpha.600"}
                                cursor="pointer"
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </HStack>
                </>
            )}
        </Box>
    );
};

const BookingForm = () => {
    const api = import.meta.env.VITE_API_URL;
    const toast = useToast();

    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const [availableRooms, setAvailableRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [showRooms, setShowRooms] = useState(false);

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const searchRooms = async () => {
        if (!entryDate || !exitDate) {
            toast({
                title: 'Fechas requeridas',
                description: 'Por favor seleccione las fechas de entrada y salida',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            const params = new URLSearchParams({
                hotelId: 'cm7t3kif80002o301zqozycc0',
                entryDate: new Date(entryDate).toISOString(),
                exitDate: new Date(exitDate).toISOString(),
                adults: adults,
                children: children
            });

            const response = await fetch(`${api}/rooms/find?${params}`);
            const data = await response.json();

            if (data.length === 0) {
                toast({
                    title: 'Sin habitaciones disponibles',
                    description: 'No hay habitaciones disponibles para las fechas seleccionadas',
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                });
                return;
            }

            setAvailableRooms(data);
            setShowRooms(true);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Error al buscar habitaciones disponibles',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleRoomSelection = (roomId) => {
        setSelectedRooms(prev => {
            if (prev.includes(roomId)) {
                return prev.filter(id => id !== roomId);
            } else {
                return [...prev, roomId];
            }
        });
    };

    const calculateTotalPrice = () => {
        return selectedRooms.reduce((sum, roomId) => {
            const room = availableRooms.find(r => r.id === roomId);
            return sum + room.price;
        }, 0);
    };

    const createReservation = async () => {
        if (!customerName || !customerEmail || !customerPhone) {
            toast({
                title: 'Datos incompletos',
                description: 'Por favor complete todos los campos',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            const totalPrice = calculateTotalPrice();

            const reservationData = {
                entryDate: format(new Date(entryDate), 'yyyy-MM-dd HH:mm:ss.SSS'),
                exitDate: format(new Date(exitDate), 'yyyy-MM-dd HH:mm:ss.SSS'),
                price: totalPrice,
                adults,
                children,
                name: customerName,
                phone: customerPhone,
                email: customerEmail,
                roomsIds: selectedRooms
            };

            const response = await fetch(`${api}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                toast({
                    title: 'Reservación exitosa',
                    description: 'Su reservación ha sido creada correctamente',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                // Resetear formulario
                setShowRooms(false);
                setSelectedRooms([]);
                setCustomerName('');
                setCustomerEmail('');
                setCustomerPhone('');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Error al crear la reservación',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.xl" py={8}>
            <Box
                bg="white"
                borderRadius="xl"
                boxShadow="xl"
                p={6}
            >
                <Heading size="lg" mb={6} color="green.600">
                    Reserva tu estadía
                </Heading>

                {/* Formulario de búsqueda */}
                <Stack spacing={6} direction={{ base: 'column', md: 'row' }} mb={8}>
                    <FormControl >
                        <FormLabel>
                            <Flex align="center">
                                <FaCalendarAlt color="green" />
                                &nbsp;Fecha de entrada
                            </Flex>
                        </FormLabel>

                        <Input
                            type="date"
                            value={entryDate}
                            onChange={(e) => setEntryDate(e.target.value)}
                            focusBorderColor="green.400"
                        />
                    </FormControl>

                    <FormControl >
                        <FormLabel>
                            <Flex align="center">
                                <FaCalendarAlt color="green" />
                                &nbsp;Fecha de salida
                            </Flex>
                        </FormLabel>

                        <Input
                            type="date"
                            value={exitDate}
                            onChange={(e) => setExitDate(e.target.value)}
                            focusBorderColor="green.400"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            <Flex align="center">
                                <FaUsers color="green" />
                                &nbsp;Adultos
                            </Flex>
                        </FormLabel>
                        <NumberInput
                            min={1}
                            value={adults}
                            onChange={(value) => setAdults(Number(value))}
                            focusBorderColor="green.400"
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            <Flex align="center">
                                <FaChild color="green" />
                                &nbsp;Niños
                            </Flex>
                        </FormLabel>
                        <NumberInput
                            min={0}
                            value={children}
                            onChange={(value) => setChildren(Number(value))}
                            focusBorderColor="green.400"
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <Button
                        colorScheme="green"
                        size="lg"
                        onClick={searchRooms}
                        alignSelf="flex-end"
                        leftIcon={<FaSearch />}
                    >
                    </Button>
                </Stack>

                {/* Visualización de habitaciones disponibles */}
                {showRooms && (
                    <>
                        <VStack spacing={6} align="stretch">
                            <Heading size="md" color="green.600">
                                Habitaciones Disponibles
                            </Heading>

                            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                                {availableRooms.map((room) => (
                                    <Card
                                        key={room.id}
                                        overflow="hidden"
                                        variant="outline"
                                        borderWidth={selectedRooms.includes(room.id) ? '2px' : '1px'}
                                        borderColor={selectedRooms.includes(room.id) ? 'green.400' : 'gray.200'}
                                    >
                                        {/* Aquí usamos el componente de carrusel en lugar de una sola imagen */}
                                        <ImageCarousel images={room.photos} />
                                        <CardBody>
                                            <VStack align="stretch" spacing={3}>
                                                <Heading size="md" color="green.600">{room.name}</Heading>
                                                <Text color="gray.600" noOfLines={2}>
                                                    {room.description}
                                                </Text>
                                                <HStack justify="space-between">
                                                    <Badge colorScheme="green">
                                                        <Flex align="center">
                                                            <FaBed />&nbsp;{room.capacity} personas
                                                        </Flex>
                                                    </Badge>
                                                    <Badge colorScheme="purple">
                                                        <Flex align="center">
                                                            <FaDoorOpen />&nbsp;{room.beds} camas
                                                        </Flex>
                                                    </Badge>
                                                </HStack>
                                                <Text fontWeight="bold" color="green.600" fontSize="lg">
                                                    ${room.price.toLocaleString()}/noche
                                                </Text>
                                                <Checkbox
                                                    colorScheme="green"
                                                    size="lg"
                                                    isChecked={selectedRooms.includes(room.id)}
                                                    onChange={() => handleRoomSelection(room.id)}
                                                >
                                                    Seleccionar habitación
                                                </Checkbox>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Grid>

                            {selectedRooms.length > 0 && (
                                <Box bg="green.50" p={6} borderRadius="lg">
                                    <VStack spacing={4}>
                                        <Heading size="md" color="green.600">
                                            Completar Reservación
                                        </Heading>

                                        <Text fontWeight="bold">
                                            Habitaciones seleccionadas: {selectedRooms.length}
                                        </Text>
                                        <Text fontWeight="bold" fontSize="lg" color="green.600">
                                            Total a pagar: ${calculateTotalPrice().toLocaleString()}
                                        </Text>

                                        <FormControl >
                                            <FormLabel>Nombre completo</FormLabel>
                                            <Input
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                type="email"
                                                value={customerEmail}
                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                        <FormControl >
                                            <FormLabel>Teléfono</FormLabel>
                                            <Input
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                        <Button
                                            colorScheme="green"
                                            size="lg"
                                            width="full"
                                            onClick={createReservation}
                                        >
                                            Confirmar Reservación
                                        </Button>
                                    </VStack>
                                </Box>
                            )}
                        </VStack>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default BookingForm;