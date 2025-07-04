import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  Grid, 
  Flex, 
  FlexBetween, 
  Badge, 
  Divider,
  colors 
} from '../styles/GlobalStyles';
import LoadingSpinner from '../LoadingSpinner';

const PageContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 80px);
`;

const ProfileCard = styled(Card)`
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  margin-bottom: 2rem;
`;

const StatsGrid = styled(Grid)`
  margin-bottom: 3rem;
`;

const StatCard = styled(Card)`
  text-align: center;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  
  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${colors.accent};
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: ${colors.light[200]};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const CollectionGrid = styled(Grid)`
  margin-top: 2rem;
`;

const NFTCollectionCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
  }
  
  .nft-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .nft-image {
    transform: scale(1.05);
  }
  
  .nft-info {
    text-align: center;
  }
  
  .nft-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${colors.light[100]};
  }
  
  .nft-status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.2);
    color: ${colors.success};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const EmptyCollection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${colors.light[200]};
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: ${colors.light[100]};
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  .account-avatar {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .account-details {
    flex: 1;
  }
  
  .account-address {
    font-family: 'Courier New', monospace;
    background: rgba(30, 41, 59, 0.6);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid ${colors.dark[500]};
    font-size: 0.9rem;
    color: ${colors.accent};
  }
`;

const TokenBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.success};
  
  .token-icon {
    font-size: 2rem;
  }
`;

const Mypage = ({ contract, account, isNetwork, connectWallet }) => {
  const [usertoken, setUsertoken] = useState(null);
  const [usercoins, setUsercoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Load = async () => {
      if (!contract) {
        setIsLoading(false);
        return;
      }
      
      try {
        const Usertoken = await contract.getuserTokens();
        setUsertoken(Usertoken);
        
        const UserCoins = await contract.getuserCoins();
        console.log(UserCoins);
        const CoinsDTO = UserCoins.map((coin, index) => ({
          id: index,
          name: coin.name,
          url: coin.url,
        }));
        console.log(usercoins);
        setUsercoins(CoinsDTO);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    Load();
  }, [contract]);

  if (isLoading) {
    return (
      <PageContainer>
        <Container>
          <LoadingSpinner text="Loading your collection..." />
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        {/* Profile Section */}
        <ProfileCard>
          <AccountInfo>
            <div className="account-avatar">
              {account ? account.slice(2, 4).toUpperCase() : '??'}
            </div>
            <div className="account-details">
              <h2>My Profile</h2>
              {account ? (
                <div className="account-address">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              ) : (
                <p style={{ color: colors.light[200] }}>Wallet not connected</p>
              )}
            </div>
            <TokenBalance>
              <span className="token-icon">💎</span>
              <span>{usertoken || 0}</span>
            </TokenBalance>
          </AccountInfo>
        </ProfileCard>

        {/* Stats Section */}
        <StatsGrid>
          <StatCard>
            <div className="stat-value">{usercoins?.length || 0}</div>
            <div className="stat-label">NFTs Owned</div>
          </StatCard>
          <StatCard>
            <div className="stat-value">{usertoken || 0}</div>
            <div className="stat-label">Token Balance</div>
          </StatCard>
          <StatCard>
            <div className="stat-value">{account ? 'Active' : 'Inactive'}</div>
            <div className="stat-label">Wallet Status</div>
          </StatCard>
        </StatsGrid>

        {/* Collection Section */}
        <div>
          <FlexBetween style={{ marginBottom: '2rem' }}>
            <h2>🎨 My NFT Collection</h2>
            <Link to="/upload" style={{ textDecoration: 'none' }}>
              <Button>📤 Add New NFT</Button>
            </Link>
          </FlexBetween>

          {usercoins?.length > 0 ? (
            <CollectionGrid>
              {usercoins.map((el, index) => (
                <NFTCollectionCard key={index}>
                  <img 
                    src={el.url} 
                    alt={el.name} 
                    className="nft-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x250/6366f1/ffffff?text=NFT+Image';
                    }}
                  />
                  <div className="nft-info">
                    <div className="nft-name">{el.name}</div>
                    <div className="nft-status">
                      <span>✓</span>
                      <span>Owned</span>
                    </div>
                  </div>
                </NFTCollectionCard>
              ))}
            </CollectionGrid>
          ) : (
            <EmptyCollection>
              <div className="empty-icon">🖼️</div>
              <h3>No NFTs in Your Collection</h3>
              <p>
                You haven't purchased any NFTs yet. Start building your collection 
                by browsing the marketplace or uploading your own NFTs.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button>🛍️ Browse Marketplace</Button>
                </Link>
                <Link to="/upload" style={{ textDecoration: 'none' }}>
                  <Button>📤 Upload NFT</Button>
                </Link>
              </div>
            </EmptyCollection>
          )}
        </div>
      </Container>
    </PageContainer>
  );
};

export default Mypage;
