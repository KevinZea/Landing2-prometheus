// src/components/Header.jsx
import { Box, Flex, Image, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { HiMenu, HiX } from 'react-icons/hi'; // Cambiamos a react-icons
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const MotionFlex = motion(Flex);

function Header() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box position="fixed" top="0" w="100%" zIndex="999" bg="white" boxShadow="sm">
            <Flex
                px={{ base: 4, md: 8 }}
                py={4}
                align="center"
                justify="space-between"
            >
                <Image
                    src={logo}
                    // h="50px"
                    boxSize={70}
                    alt="Hotel Logo"
                    borderRadius="full"
                />

                <IconButton
                    display={{ base: 'block', md: 'none' }}
                    onClick={onToggle}
                    icon={isOpen ? <HiX /> : <HiMenu />}
                    variant="ghost"
                    aria-label="Toggle Navigation"
                />

                <Flex
                    display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
                    flexDir={{ base: 'column', md: 'row' }}
                    align="center"
                    gap={8}
                >
                    {['Inicio', 'Servicios', 'Galeria', 'Ubicación', 'Contacto'].map((item) => (
                        <Link
                            key={item}
                            to={item.toLowerCase()}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            onClick={onToggle}
                        >
                            <Button variant="ghost" _hover={{ color: 'accent.500' }}>
                                {item}
                            </Button>
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
}

export default Header;