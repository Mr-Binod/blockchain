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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  h1 {
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0;
    line-height: 1;
  }
  
  p {
    color: ${colors.light[200]};
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 0;
    line-height: 1;
    text-align: center;
  }
`;

const RecentlyAddedSection = styled.div`
  width: 1466px;
  box-sizing: border-box;
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: none;
  margin-right: 0;
  height: 276px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  margin-bottom: 0;
`;

const RecentlyAddedGrid = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  box-sizing: border-box;
`;

const RecentlyAddedCard = styled(Card)`
  width: 220px;
  height: 206px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  text-align: center;
  padding: 1rem;
  .nft-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
  .nft-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: ${colors.light[100]};
  }
  .nft-price {
    color: ${colors.accent};
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
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
  height: 420px;
`;

const NFTGrid = styled(Grid)`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 350px);
  justify-content: center;
  gap: 1rem;
`;

const NFTCard = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 0.7rem 0.7rem 1rem 0.7rem;
  min-width: 0;
  width: 100%;
  
  .nft-image {
    width: 100%;
    height: 305px;
    object-fit: cover;
    display: block;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 0.7rem;
    transition: transform 0.3s ease;
    margin-left: 0;
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
  width: 100%;
  align-items: flex-start;
  margin-top: 0;
`;

const CenterColumn = styled.div`
  max-width: calc(100vw - ${SIDEBAR_WIDTH + SIDEBAR_RIGHT + 64}px);
  min-width: 0;
  width: 100%;
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

const TallCard = styled(Card)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoCard = styled(Card)`
  margin-top: 55px  ;
  margin-bottom: 2rem;
  text-align: center;
  overflow: hidden;
  height: 220px;
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

const RecentlyAddedTitle = styled.h2`
  margin-bottom: 0;
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
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const navigate = useNavigate();

  // Extract eventLoad to a separate function
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
    
  useEffect(() => {
    eventLoad();
  }, [contract]);

  const BuyToken = async () => {
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }
    if (tokenamt < 100) {
      alert("Minimum purchase is 100 tokens");
      return;
    }
    setIsTokenLoading(true);
    try {
      await contract.buyToken(tokenamt);
      await eventLoad();
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert("Failed to purchase tokens. Please try again.");
    } finally {
      setIsTokenLoading(false);
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
    setLoadingIndex(index);
    try {
      const _price = allcoins[index].price;
      await contract.buyNFT(index, _price);
      await eventLoad();
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Failed to purchase NFT. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  useEffect(() => {
    if (!account) {
      connectWallet();
    }
  }, []);

  // Helper function to scroll to NFT grid
  const scrollToNFTGrid = () => {
    const grid = document.getElementById('nft-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper function to scroll to NFT card in the main grid
  const scrollToNFTCard = (index) => {
    const card = document.getElementById(`nft-card-${index}`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <PageContainer>
      <Container marginRight={`${SIDEBAR_WIDTH + SIDEBAR_RIGHT + 12}px`} width={90}>
        <HeroSection>
        </HeroSection>
        <RecentlyAddedSection>
          <RecentlyAddedTitle>Recently Added NFTs</RecentlyAddedTitle>
          <RecentlyAddedGrid>
            {(allcoins.slice(0, 6)).map((el, index) => (
              <RecentlyAddedCard key={index} onClick={() => scrollToNFTCard(index)} style={{ cursor: 'pointer' }}>
                <img 
                  src={el.url} 
                  alt={el.name} 
                  className="nft-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/220x120/6366f1/ffffff?text=NFT+Image';
                  }}
                />
                <div className="nft-name">{el.name}</div>
                <div className="nft-price">{el.price} Tokens</div>
              </RecentlyAddedCard>
            ))}
          </RecentlyAddedGrid>
        </RecentlyAddedSection>
        {/* Main two-column layout */}
        <MainLayout>
          {/* Center: NFT Grid and actions */}
          <CenterColumn>
            <Divider />
            <div>
              <h2 style={{ marginBottom: 0 }}>🛍️ Available NFTs</h2>
              {allcoins?.length > 0 ? (
                <NFTGrid id="nft-grid">
                  {allcoins.map((el, index) => (
                    <NFTCard key={index} id={`nft-card-${index}`}>
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
                        disabled={loadingIndex === index || !account || usertoken < el.price}
                        style={{ width: '100%' }}
                      >
                        {!account ? 'Connect Wallet' : 
                         usertoken < el.price ? 'Insufficient Balance' : 
                         loadingIndex === index ? 'Processing...' : 'Buy NFT'}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
                <div style={{ flex: 1 }}>
                  <Label htmlFor="tokenAmount">Token Amount (Min: 100)</Label>
                  <Input
                    id="tokenAmount"
                    type="text"
                    placeholder="Enter token amount"
                    value={tokenamt || ''}
                    onChange={(e) => setTokenamt(e.target.value)}
                    min="100"
                  />
                </div>
                <ButtonSuccess 
                  onClick={BuyToken} 
                  disabled={!tokenamt || tokenamt < 100}
                >
                  Buy Tokens
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