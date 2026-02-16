import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    Divider,
    Checkbox,
    FormControlLabel,
    Stack,
    IconButton,
    InputAdornment,
    Link,
    Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const GoogleIcon = (props: any) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M23.52 12.29C23.52 11.43 23.44 10.59 23.29 9.77H12V14.41H18.45C18.17 15.89 17.31 17.15 16.03 18.01V20.99H19.89C22.15 18.91 23.52 15.85 23.52 12.29Z" fill="#4285F4" />
        <path d="M12 24C15.24 24 17.96 22.92 19.89 21.14L16.03 18.15C14.95 18.87 13.58 19.29 12 19.29C8.87 19.29 6.22 17.17 5.27 14.33H1.28V17.42C3.18 21.19 7.33 24 12 24Z" fill="#34A853" />
        <path d="M5.27 14.33C5.03 13.61 4.9 12.83 4.9 12.02C4.9 11.21 5.03 10.43 5.27 9.71V6.62H1.28C0.46 8.24 0 10.07 0 12.02C0 13.97 0.46 15.8 1.28 17.42L5.27 14.33Z" fill="#FBBC05" />
        <path d="M12 4.75C13.76 4.75 15.33 5.36 16.57 6.54L20.01 3.11C17.96 1.19 15.24 0 12 0C7.33 0 3.18 2.81 1.28 6.58L5.27 9.67C6.22 6.83 8.87 4.75 12 4.75Z" fill="#EA4335" />
    </svg>
);

const AppleIcon = (props: any) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M17.05 20.28C15.65 22.28 14.05 22.23 12.55 22.23C11 22.23 10.55 21.33 8.9 21.33C7.2 21.33 6.65 22.18 5.35 22.23C3.8 22.23 2.1 20.53 1 17.43C-1.3 11 2.2 8.43 2.25 8.38C2.3 8.33 4.3 6.08 7.05 6.08C8.5 6.08 9.5 7.03 10.35 7.03C11.15 7.03 12.5 6.08 13.9 6.08C14.71 6.09 16.89 6.3 18.25 8.28C18.14 8.35 16.05 9.61 16.05 12.58C16.05 15.24 18.3 16.79 18.4 16.84C18.35 17.06 17.75 19.23 17.05 20.28ZM12.05 4.38C12.75 3.53 13.15 2.28 13.05 1.13C11.95 1.23 10.7 1.83 9.95 2.73C9.25 3.53 8.8 4.73 8.95 5.88C10.1 5.98 11.3 5.23 12.05 4.38Z" />
    </svg>
);

const XIcon = (props: any) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.915L1.25403 2.25H8.08003L12.793 8.481L18.244 2.25ZM17.087 19.769H18.923L7.08403 4.126H5.11403L17.087 19.769Z" />
    </svg>
);

export const LoginPage: React.FC = () => {
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password, remember);
        if (success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f9fafb',
                position: 'relative',
                overflow: 'hidden',

                backgroundImage: `radial-gradient(#e0e7ff 1px, transparent 1px), radial-gradient(#e0e7ff 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                }}
            />

            <Card
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 4,
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: 4,
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Stack alignItems="center" spacing={1} mb={3}>

                    <Typography variant="h5" fontWeight="bold" align="center">
                        Welcome back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Please enter your details to sign in
                    </Typography>
                </Stack>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}


                <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
                    {[
                        { icon: GoogleIcon, label: 'Google' },
                        { icon: AppleIcon, label: 'Apple' },
                        { icon: XIcon, label: 'X' },
                    ].map((social, idx) => (
                        <IconButton
                            key={idx}
                            size="medium"
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: '50%',
                                p: 1,
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                    borderColor: 'text.primary',
                                },
                            }}
                        >
                            <social.icon />
                        </IconButton>
                    ))}
                </Stack>

                <Divider sx={{ my: 2, color: 'text.secondary', fontSize: '0.75rem' }}>OR</Divider>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Your Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Type your email"
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Type your password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        color="primary"
                                        size="small"
                                        sx={{ borderRadius: 1 }}
                                    />
                                }
                                label={<Typography variant="caption">Remember me</Typography>}
                            />
                            <Link href="#" variant="caption" underline="hover" fontWeight="medium" color="text.primary">
                                Forgot password?
                            </Link>
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="medium"
                            disabled={isLoading}
                            disableElevation
                            sx={{
                                py: 1.2,
                                bgcolor: 'text.primary',
                                color: 'background.paper',
                                '&:hover': {
                                    bgcolor: '#000',
                                },
                            }}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Stack>
                </form>

                <Box mt={3} textAlign="center" pt={2} borderTop={1} borderColor="divider">
                    <Typography variant="caption" color="text.secondary">
                        Don't have an account?{' '}
                        <Link href="#" fontWeight="bold" color="text.primary" underline="hover">
                            Sign up
                        </Link>
                    </Typography>
                    <Typography variant="caption" display="block" color="text.disabled" mt={1}>
                        Demo: intern@demo.com | intern123
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};
