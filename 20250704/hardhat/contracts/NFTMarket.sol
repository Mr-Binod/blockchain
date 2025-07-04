// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

// erc721의 형태가 맞는지 검증
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// 표준의 내용과 다른 컨트랙트를 만든다 => DAO  => 표준형태는 따로 없고
contract SaleNFT {
    // 판매하고 있는 상품의 내용
    // EOA (externally owned account) -> CA (contract account) -> CA (another contract account)
    struct SaleItem {
        address seller; // 상품 판매의 소유자
        uint price;
    }

    // contract 주소
    // immutable 불변성을 갖게 되었을떄 문제점
    // 프록시 패턴을 사용할때
    address private immutable NFTcontracts;

    // 고유 식별자 unique identifier
    // 판매중인 상태를 저장 리스트
    // 상품의 아이디를 저장할 리스트
    uint[] public listNFTids;
    // 사용자의 ui로 표현될 상품의 리스트
    mapping(uint => SaleItem) public sales;

    // 판매중인 nft의 정보를 로그 기록
    event addSaleList(address indexed seller, uint tokenId, uint price);

    // 판매의 퓌소가 발생했을때 기록할 이벤트
    event removeSaleList(address indexed seller, uint tokenId);

    // 구매가 정상적으로 처리되면
    event buyNFT(
        address indexed buyer,
        address indexed seller,
        uint tokenId,
        uint price
    );

    constructor(address _nftAddress) {
        NFTcontracts = _nftAddress;
    }

    // 판매를 등록하면 호출괼 함수
    function addNFTsale(uint tokenId, uint price) external {
        // nft erc721 컨트랙트에세 요청을 보내기 위해서
        // 메서드를 잘못 호룿하는 것을 방지
        // 최소한의 ERC721 인터페이스와 주소를 가지고
        IERC721 nft = IERC721(NFTcontracts);

        // NFT 인스턴스 생성. CA 주소를 가지고 인스턴스화
        // nft.isApprovedForAll(owner, operator);

        // 호출하는 사람이 nft를 가지고있는지
        // 토큰 소유자의 주소 tokenId : address
        require(nft.ownerOf(tokenId) == msg.sender);
        // 금액을 정상적으로 작성 하였는지
        require(price > 0);

        // 중개자가 있는 판매의 구조
        require(nft.isApprovedForAll(msg.sender, address(this)));

        // 판매 리스트에 추가
        sales[tokenId] = SaleItem(msg.sender, price);
        listNFTids.push(tokenId);
        emit addSaleList(msg.sender, tokenId, price);
    }

    // 구매 함수 (ether 전송)
    function BuyNFT(uint tokenId) external payable {
        SaleItem memory sale = sales[tokenId];
        require(sale.price == msg.value); // for cheaper gasfee
        // require(sales[tokenId].price == msg.value);
        // learn assembly
        require(msg.sender != sale.seller); // 판매자가 구매를 할수 없게

        IERC721 nft = IERC721(NFTcontracts);
        // 위임 (명령어 요구 ) 받은 사람이 호출을 해서 소유권을 전환해주는 함수
        nft.transferFrom(sale.seller, msg.sender, tokenId);

        // 판매자에게 금액을 보내기 중간 수수료가 있다면 차감 후에 전송
        payable(sale.seller).transfer(msg.value);
        // 판매한 금액만크 판매자에게 이더 전송

        // 판매 리스트에서 제거
        // 가스비 네트워크 제안에서 따라서 배역의 값을 제거
        delete sales[tokenId];
        // mapping delete
        // mapping에 있는 키를 제거 초기 값으로 돌린다
        // 키 값 => 초기값으로 값ㅇ르 바꿔
        // 반복문 돌려서

        // listNFTids
        uint length = listNFTids.length;
        for (uint i = 0; i < length; i++) {
            if (tokenId == listNFTids[i]) {
                listNFTids[i] = listNFTids[length - 1];
                listNFTids.pop();
                break;
            }
        }

        emit buyNFT(msg.sender, sale.seller, tokenId, sale.price);
    }
    function cancelSale(uint tokenId) external {
        require(sales[tokenId].seller == msg.sender);
        delete sales[tokenId];
        uint length = listNFTids.length;
        for (uint i = 0; i < length; i++) {
            if (tokenId == listNFTids[i]) {
                listNFTids[i] = listNFTids[length - 1];
                listNFTids.pop();
                break;
            }
        }
        emit removeSaleList(msg.sender, tokenId);
    }


    function getSaleList() external view returns(uint[] memory) {
        return listNFTids;
    }

    
}