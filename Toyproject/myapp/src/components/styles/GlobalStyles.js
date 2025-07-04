import styled, { createGlobalStyle } from 'styled-components';

// Color palette for the blockchain theme
export const colors = {
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Purple
  accent: '#06b6d4', // Cyan
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  dark: {
    900: '#0f172a', // Slate 900
    800: '#1e293b', // Slate 800
    700: '#334155', // Slate 700
    600: '#475569', // Slate 600
    500: '#64748b', // Slate 500
    400: '#94a3b8', // Slate 400
  },
  light: {
    100: '#f8fafc', // Slate 100
    200: '#e2e8f0', // Slate 200
    300: '#cbd5e1', // Slate 300
  }
};

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: linear-gradient(135deg, ${colors.dark[900]} 0%, ${colors.dark[800]} 100%);
    color: ${colors.light[100]};
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.dark[800]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.dark[600]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.dark[500]};
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
`;

// Common styled components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  /* margin-right: ${(props) => props.marginRight || 0}; */
`;

export const Card = styled.div`
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, ${colors.primary} 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: linear-gradient(135deg, ${colors.dark[700]} 0%, ${colors.dark[600]} 100%);
  border: 1px solid ${colors.dark[500]};

  &:hover {
    box-shadow: 0 8px 25px rgba(71, 85, 105, 0.4);
  }
`;

export const ButtonSuccess = styled(Button)`
  background: linear-gradient(135deg, ${colors.success} 0%, #059669 100%);

  &:hover {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }
`;

export const Input = styled.input`
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid ${colors.dark[500]};
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: ${colors.light[100]};
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${colors.dark[400]};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${colors.light[200]};
`;

export const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Badge = styled.span`
  background: linear-gradient(135deg, ${colors.accent} 0%, #0891b2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, ${colors.dark[500]} 50%, transparent 100%);
  margin: 2rem 0;
`;

// Animation keyframes
export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const pulse = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const slideIn = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const bounce = `
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
`; 