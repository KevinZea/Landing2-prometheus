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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Tooltip,
    Divider,
} from '@chakra-ui/react';
import {
    FaBed,
    FaCalendarAlt,
    FaUsers,
    FaChild,
    FaSearch,
    FaDoorOpen,
    FaChevronLeft,
    FaChevronRight,
    FaExclamationTriangle,
    FaTag,
    FaClock,
    FaInfoCircle
} from 'react-icons/fa';
// Función helper para formatear fechas
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().replace('T', ' ').substring(0, 23);
};

// Componente para mostrar información de precios dinámicos
const PricingInfo = ({ room }) => {
    const { hasSpecialPricing, hasRecurringPricing, specialPrices, recurringPrices, totalPrice, basePrice } = room;

    if (!hasSpecialPricing && !hasRecurringPricing) {
        return (
            <Text fontSize="sm" color="gray.600">
                Precio base: ${basePrice?.toLocaleString()}/noche
            </Text>
        );
    }

    return (
        <VStack align="stretch" spacing={2}>
            <HStack justify="space-between" align="center">
                <Text fontSize="sm" color="gray.600">
                    Precio base: ${basePrice?.toLocaleString()}/noche
                </Text>
                <Tooltip label="Esta habitación tiene precios especiales aplicados">
                    <Box color="blue.500" cursor="help">
                        <FaInfoCircle />
                    </Box>
                </Tooltip>
            </HStack>

            {hasSpecialPricing && specialPrices.length > 0 && (
                <Box>
                    <Text fontSize="xs" color="blue.600" fontWeight="semibold" mb={1}>
                        <FaTag style={{ display: 'inline', marginRight: '4px' }} />
                        Precios Especiales:
                    </Text>
                    {specialPrices.slice(0, 2).map((sp, index) => (
                        <Text key={index} fontSize="xs" color="blue.500">
                            • ${sp.price?.toLocaleString()}/noche
                            {sp.reason && ` - ${sp.reason}`}
                        </Text>
                    ))}
                    {specialPrices.length > 2 && (
                        <Text fontSize="xs" color="gray.500">
                            +{specialPrices.length - 2} más...
                        </Text>
                    )}
                </Box>
            )}

            {hasRecurringPricing && recurringPrices.length > 0 && (
                <Box>
                    <Text fontSize="xs" color="purple.600" fontWeight="semibold" mb={1}>
                        <FaClock style={{ display: 'inline', marginRight: '4px' }} />
                        Precios Recurrentes:
                    </Text>
                    {recurringPrices.slice(0, 2).map((rp, index) => (
                        <Text key={index} fontSize="xs" color="purple.500">
                            • {rp.name}: ${rp.price?.toLocaleString()}/noche
                        </Text>
                    ))}
                    {recurringPrices.length > 2 && (
                        <Text fontSize="xs" color="gray.500">
                            +{recurringPrices.length - 2} más...
                        </Text>
                    )}
                </Box>
            )}
        </VStack>
    );
};

// Componente para mostrar habitaciones bloqueadas
const BlockedRoomsAlert = ({ blockedRooms }) => {
    if (!blockedRooms || blockedRooms.length === 0) return null;

    return (
        <Alert status="warning" borderRadius="lg" mb={4}>
            <AlertIcon />
            <Box>
                <AlertTitle>Habitaciones con fechas no disponibles</AlertTitle>
                <AlertDescription>
                    {blockedRooms.length} habitación(es) tienen fechas bloqueadas en el período seleccionado.
                </AlertDescription>
            </Box>
        </Alert>
    );
};

// Componente de carrusel para las imágenes de habitaciones
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const [searchResults, setSearchResults] = useState(null);
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
                hotelId: 'cm76prt5b00017kb46mvyjgfv',
                entryDate: new Date(entryDate).toISOString(),
                exitDate: new Date(exitDate).toISOString(),
                adults: adults,
                children: children
            });

            const response = await fetch(`${api}/rooms/find?${params}`);
            const data = await response.json();

            if (data.message) {
                toast({
                    title: 'Información de disponibilidad',
                    description: data.message,
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                });
            }

            setSearchResults(data);
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
        if (!searchResults?.availableRooms) return 0;

        return selectedRooms.reduce((sum, roomId) => {
            const room = searchResults.availableRooms.find(r => r.id === roomId);
            return sum + (room?.totalPrice || room?.price || 0);
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
                entryDate: formatDateForAPI(entryDate),
                exitDate: formatDateForAPI(exitDate),
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
                setSearchResults(null);
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
        <Container maxW="container.xl" py={8} id="reserva">
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
                    <FormControl>
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

                    <FormControl>
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
                        Buscar
                    </Button>
                </Stack>

                {/* Resultados de búsqueda */}
                {showRooms && searchResults && (
                    <VStack spacing={6} align="stretch">
                        {/* Información de resultados */}
                        <Box bg="gray.50" p={4} borderRadius="lg">
                            <HStack justify="space-between" wrap="wrap">
                                <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" color="gray.600">
                                        Habitaciones disponibles: <strong>{searchResults.totalAvailable || 0}</strong>
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        Período: {formatDate(entryDate)} - {formatDate(exitDate)}
                                    </Text>
                                </VStack>
                                <VStack align="end" spacing={1}>
                                    <Text fontSize="sm" color="gray.600">
                                        Huéspedes: {adults} adulto(s), {children} niño(s)
                                    </Text>
                                    {searchResults.hasBlockedDates && (
                                        <Badge colorScheme="orange" size="sm">
                                            <FaExclamationTriangle style={{ marginRight: '4px' }} />
                                            Algunas fechas bloqueadas
                                        </Badge>
                                    )}
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Alert para habitaciones bloqueadas */}
                        <BlockedRoomsAlert blockedRooms={searchResults.blockedRooms} />

                        {/* Habitaciones disponibles */}
                        {searchResults.availableRooms && searchResults.availableRooms.length > 0 && (
                            <>
                                <Heading size="md" color="green.600">
                                    Habitaciones Disponibles
                                </Heading>

                                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                                    {searchResults.availableRooms.map((room) => (
                                        <Card
                                            key={room.id}
                                            overflow="hidden"
                                            variant="outline"
                                            borderWidth={selectedRooms.includes(room.id) ? '2px' : '1px'}
                                            borderColor={selectedRooms.includes(room.id) ? 'green.400' : 'gray.200'}
                                        >
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
                                                        {room.hasDynamicPricing && (
                                                            <Badge colorScheme="blue" variant="outline">
                                                                <FaTag style={{ marginRight: '2px' }} />
                                                                Precio especial
                                                            </Badge>
                                                        )}
                                                    </HStack>

                                                    <Divider />

                                                    {/* Información de precios */}
                                                    <PricingInfo room={room} />

                                                    <Text fontWeight="bold" color="green.600" fontSize="lg">
                                                        Total: ${(room.totalPrice || room.price)?.toLocaleString()}
                                                        <Text as="span" fontSize="sm" color="gray.500" fontWeight="normal">
                                                            {room.totalPrice !== room.basePrice ? ' (precio ajustado)' : ''}
                                                        </Text>
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
                            </>
                        )}

                        {/* Formulario de reservación */}
                        {selectedRooms.length > 0 && (
                            <Box bg="green.50" p={6} borderRadius="lg">
                                <VStack spacing={4}>
                                    <Heading size="md" color="green.600">
                                        Completar Reservación
                                    </Heading>

                                    <HStack justify="space-between" w="full">
                                        <Text fontWeight="bold">
                                            Habitaciones seleccionadas: {selectedRooms.length}
                                        </Text>
                                        <Text fontWeight="bold" fontSize="lg" color="green.600">
                                            Total a pagar: ${calculateTotalPrice().toLocaleString()}
                                        </Text>
                                    </HStack>

                                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} w="full">
                                        <FormControl>
                                            <FormLabel>Nombre completo</FormLabel>
                                            <Input
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                type="email"
                                                value={customerEmail}
                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Teléfono</FormLabel>
                                            <Input
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                focusBorderColor="green.400"
                                                bg="white"
                                            />
                                        </FormControl>
                                    </Stack>

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

                        {/* Mensaje cuando no hay habitaciones disponibles */}
                        {searchResults.availableRooms && searchResults.availableRooms.length === 0 && (
                            <Alert status="info" borderRadius="lg">
                                <AlertIcon />
                                <Box>
                                    <AlertTitle>No hay habitaciones disponibles</AlertTitle>
                                    <AlertDescription>
                                        {searchResults.message || 'No se encontraron habitaciones disponibles para las fechas y capacidad seleccionadas.'}
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        )}
                    </VStack>
                )}
            </Box>
        </Container>
    );
};

export default BookingForm;