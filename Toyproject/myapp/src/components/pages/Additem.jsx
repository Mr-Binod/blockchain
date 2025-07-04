import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Card, 
  Button, 
  ButtonSuccess, 
  ButtonSecondary,
  Input, 
  Label, 
  colors 
} from '../styles/GlobalStyles';

const PageContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 80px);
`;

const UploadCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 2px dashed ${colors.dark[500]};
`;

const PreviewInfo = styled.div`
  h3 {
    color: ${colors.light[100]};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${colors.accent};
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const UploadIcon = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${colors.secondary};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Additem = ({ contract, account, isNetwork, connectWallet }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    price: ''
  });
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update preview when URL changes
    if (name === 'url' && value) {
      setPreview(value);
    }
  };

  const Sell = async (e) => {
    e.preventDefault();
    
    if (!contract) {
      alert("Please connect your wallet first");
      return;
    }

    if (!formData.name || !formData.url || !formData.price) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    setIsLoading(true);
    
    try {
      await contract.sellNFT(formData.name, formData.url, formData.price);
      const getNFT = await contract.getCoins();
      console.log(getNFT, "getnft");
      setItems(...getNFT);
      alert("NFT uploaded successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error uploading NFT:", error);
      alert("Failed to upload NFT. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container>
        <UploadCard>
          <UploadIcon>📤</UploadIcon>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Upload Your NFT
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: colors.light[200], 
            marginBottom: '2rem' 
          }}>
            Share your unique digital assets with the world
          </p>

          <form onSubmit={Sell}>
            <FormGroup>
              <Label htmlFor="name">NFT Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a unique name for your NFT"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="url">Image URL *</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com/your-image.jpg"
                value={formData.url}
                onChange={handleInputChange}
                required
              />
              <small style={{ 
                color: colors.light[200], 
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                display: 'block'
              }}>
                Enter a valid image URL (JPG, PNG, GIF supported)
              </small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Price (Tokens) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price in tokens"
                value={formData.price}
                onChange={handleInputChange}
                min="1"
                step="1"
                required
              />
              <small style={{ 
                color: colors.light[200], 
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                display: 'block'
              }}>
                Set the price in tokens for your NFT
              </small>
            </FormGroup>

            {/* Preview Section */}
            {preview && (
              <PreviewSection>
                <h3>Preview</h3>
                <PreviewImage 
                  src={preview} 
                  alt="NFT Preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Image+Not+Found';
                  }}
                />
                <PreviewInfo>
                  <h3>{formData.name || 'NFT Name'}</h3>
                  <p>💎 {formData.price || '0'} Tokens</p>
                </PreviewInfo>
              </PreviewSection>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem',
              justifyContent: 'center'
            }}>
              <ButtonSecondary 
                type="button" 
                onClick={() => navigate('/')}
                style={{ minWidth: '120px' }}
              >
                Cancel
              </ButtonSecondary>
              <ButtonSuccess 
                type="submit"
                disabled={isLoading || !formData.name || !formData.url || !formData.price}
                style={{ minWidth: '120px' }}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner /> Processing...
                  </>
                ) : (
                  'Upload NFT'
                )}
              </ButtonSuccess>
            </div>
          </form>
        </UploadCard>
      </Container>
    </PageContainer>
  );
};

export default Additem;
