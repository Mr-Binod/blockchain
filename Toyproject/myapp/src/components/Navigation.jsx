import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { colors, Button, FlexBetween } from './styles/GlobalStyles';

const NavContainer = styled.nav`
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.light[100]};
  text-decoration: none;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${colors.light[200]};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${colors.light[100]};
    background: rgba(99, 102, 241, 0.1);
  }

  &.active {
    color: ${colors.primary};
    background: rgba(99, 102, 241, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    transition: width 0.2s ease;
  }

  &.active::after {
    width: 80%;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

const AccountBadge = styled.span`
  background: rgba(6, 182, 212, 0.2);
  border: 1px solid ${colors.accent};
  color: ${colors.accent};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Navigation = ({ account, connectWallet }) => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">🚀 NFT Marketplace</Logo>
        
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>
            Upload NFT
          </NavLink>
          <NavLink to="/mypage" className={location.pathname === '/mypage' ? 'active' : ''}>
            My Page
          </NavLink>
          
          {account ? (
            <WalletInfo>
              <AccountBadge>
                {account.slice(0, 6)}...{account.slice(-4)}
              </AccountBadge>
            </WalletInfo>
          ) : (
            <Button onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation; 