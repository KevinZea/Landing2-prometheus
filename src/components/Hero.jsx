// src/components/Hero.jsx
import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

function Hero() {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <Box
            h="100vh"
            w="100%"
            position="relative"
            backgroundImage="url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')"
            backgroundSize="cover"
            backgroundPosition="center"
            id='inicio'
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="rgba(0,0,0,0.5)"
            />

            <Container
                maxW="container.xl"
                h="100%"
                position="relative"
                centerContent
                justifyContent="center"
            >
                <Stack
                    spacing={6}
                    textAlign="center"
                    color="white"
                    ref={ref}
                >
                    <MotionHeading
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        Luxury Hotel & Resort
                    </MotionHeading>

                    <MotionText
                        fontSize={{ base: "xl", md: "2xl" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Experimenta el lujo y la comodidad en cada detalle
                    </MotionText>

                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button
                            size="lg"
                            colorScheme="teal"
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            Reserva Ahora
                        </Button>
                    </MotionBox>
                </Stack>
            </Container>
        </Box>
    );
}

export default Hero;