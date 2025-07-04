import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  ButtonSuccess, 
  ButtonSecondary, 
  Input, 
  Label, 
  Grid, 
  Flex, 
  FlexBetween, 
  Badge, 
  Divider,
  colors 
} from '../styles/GlobalStyles';

const SIDEBAR_WIDTH = 350;
const SIDEBAR_RIGHT = 40;

const PageContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 80px);
  background: inherit;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }
  
  p {
    color: ${colors.light[200]};
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StatsCard = styled(Card)`
  text-align: center;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.accent};
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: ${colors.light[200]};
    font-size: 0.9rem;
  }
`;

const TokenPurchaseCard = styled(Card)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const NFTGrid = styled(Grid)`
  margin-top: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const NFTCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 0.7rem 0.7rem 1rem 0.7rem;
  min-width: 0;
  max-width: 160px;
  margin: 0 auto;
  
  .nft-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.7rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .nft-image {
    transform: scale(1.05);
  }
  
  .nft-info {
    margin-bottom: 0.7rem;
  }
  
  .nft-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: ${colors.light[100]};
  }
  
  .nft-price {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: ${colors.accent};
    font-weight: 600;
    font-size: 0.95rem;
  }
  
  .price-icon {
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.light[200]};
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const MainLayout = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  margin-top: 2.5rem;
`;

const CenterColumn = styled.div`
  flex: 2;
  min-width: 0;
`;

const RightColumn = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  position: fixed;
  top: 100px;
  right: ${SIDEBAR_RIGHT}px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled(Card)`
  margin-bottom: 2rem;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: rgba(30, 41, 59, 0.98);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  max-width: 400px;
  text-align: center;
  color: ${colors.light[100]};
`;

const WelcomeTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeButton = styled(Button)`
  margin-top: 2rem;
  width: 100%;
`;

const splashFadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; pointer-events: none; }
`;

const SplashOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  transition: opacity 0.7s;
  animation: ${props => props.fadeOut ? splashFadeOut : 'none'} 0.7s forwards;
`;

const SplashTagline = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 1.5rem;
  color: #e0e7ff;
  letter-spacing: 0.5px;
`;

function OpeningAnimation({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onFinish, 700);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFinish]);
  return (
    <SplashOverlay fadeOut={fadeOut} onClick={() => setFadeOut(true)}>
      🚀 NFT Marketplace
      <SplashTagline>Discover, collect, and trade unique digital assets</SplashTagline>
    </SplashOverlay>
  );
}

function WelcomeModal({ onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <WelcomeTitle>Welcome to NFT Marketplace!</WelcomeTitle>
        <p style={{ color: colors.light[200], marginBottom: '1.5rem' }}>
          Discover, collect, and trade unique digital assets.<br />
          Connect your wallet and start your NFT journey!
        </p>
        <WelcomeButton onClick={onClose}>Let&apos;s Start 🚀</WelcomeButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const Mainpage = ({ contract, account, isNetwork, connectWallet }) => {
  const [allcoins, setAllcoins] = useState([]);
  const [tokenamt, setTokenamt] = useState(null);
  const [usertoken, setUsertoken] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BuyToken = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    if (tokenamt < 100) {
      alert("Minimum purchase is 100 tokens");
      return;
    }
    setIsLoading(true);
    try {
      await contract.buyToken(tokenamt);
      navigate(0);
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert("Failed to purchase tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const BuyNFT = async (index) => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    if (usertoken < events[index].price) {
      alert("Insufficient balance");
      return;
    }
    setIsLoading(true);
    try {
      const _price = allcoins[index].price;
      await contract.buyNFT(index, _price);
      navigate(0);
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Failed to purchase NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!account) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    const eventLoad = async () => {
      if (!contract) return;
      
      try {
        const events = await contract.queryFilter("NFTEvents");
        const eventDTO = events?.map(({ args }) => ({
          owner: args.owner,
          name: args.name,
          url: args.url,
          price: args.price
        }));
        setEvents(eventDTO);
        
        const Coins = await contract.getCoins();
        const CoinsDTO = Coins?.map((coin, index) => ({
          id: index,
          owner: coin.owner,
          name: coin.name,
          url: coin.url,
          price: coin.price.toString(),
        }));
        setAllcoins(CoinsDTO);

        const usertoken = await contract.getuserTokens();
        setUsertoken(usertoken);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    
    eventLoad();
  }, [contract]);

  return (
    <PageContainer>
      <Container marginRight={`${SIDEBAR_WIDTH + SIDEBAR_RIGHT + 12}px`}>
        <HeroSection>
          <h1>🚀 NFT Marketplace</h1>
          <p>Discover, collect, and trade unique digital assets on the blockchain</p>
        </HeroSection>
        {/* Main two-column layout */}
        <MainLayout>
          {/* Center: NFT Grid and actions */}
          <CenterColumn>
            <Divider />
            <div>
              <h2>🛍️ Available NFTs</h2>
              {allcoins?.length > 0 ? (
                <NFTGrid>
                  {allcoins.map((el, index) => (
                    <NFTCard key={index}>
                      <img 
                        src={el.url} 
                        alt={el.name} 
                        className="nft-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/6366f1/ffffff?text=NFT+Image';
                        }}
                      />
                      <div className="nft-info">
                        <div className="nft-name">{el.name}</div>
                        <div className="nft-price">
                          <span className="price-icon">💎</span>
                          <span>{el.price} Tokens</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => BuyNFT(index)}
                        disabled={isLoading || !account || usertoken < el.price}
                        style={{ width: '100%' }}
                      >
                        {!account ? 'Connect Wallet' : 
                         usertoken < el.price ? 'Insufficient Balance' : 
                         isLoading ? 'Processing...' : 'Buy NFT'}
                      </Button>
                    </NFTCard>
                  ))}
                </NFTGrid>
              ) : (
                <EmptyState>
                  <div className="empty-icon">🖼️</div>
                  <h3>No NFTs Available</h3>
                  <p>Be the first to upload an NFT to the marketplace!</p>
                </EmptyState>
              )}
            </div>
          </CenterColumn>
          {/* Right: Info and Purchase Token */}
          <RightColumn>
            <InfoCard>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>Wallet Status & Token</div>
              <div style={{ fontSize: '1.2rem', color: account ? colors.success : colors.error, fontWeight: 700, marginBottom: 8 }}>{account ? 'Connected' : 'Not Connected'}</div>
              <div style={{ fontSize: '2rem', color: colors.accent, fontWeight: 700 }}>{usertoken || 0} Tokens</div>
            </InfoCard>
            <TokenPurchaseCard>
              <h2>💎 Purchase Tokens</h2>
              <p style={{ color: colors.light[200], marginBottom: '1.5rem' }}>
                Buy tokens to purchase NFTs from the marketplace
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
                <div style={{ flex: 1 }}>
                  <Label htmlFor="tokenAmount">Token Amount (Min: 100)</Label>
                  <Input
                    id="tokenAmount"
                    type="number"
                    placeholder="Enter token amount"
                    value={tokenamt || ''}
                    onChange={(e) => setTokenamt(e.target.value)}
                    min="100"
                  />
                </div>
                <ButtonSuccess 
                  onClick={BuyToken} 
                  disabled={isLoading || !tokenamt || tokenamt < 100}
                >
                  {isLoading ? 'Processing...' : 'Buy Tokens'}
                </ButtonSuccess>
              </div>
            </TokenPurchaseCard>
          </RightColumn>
        </MainLayout>
      </Container>
    </PageContainer>
  );
};

export default Mainpage;