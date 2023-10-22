describe('Metamask', () => {
    context('Test commands', () => {
        it(`setupMetamask should finish metamask setup using secret words`, () => {
            cy.setupMetamask(
                'eternal elevator word faith innocent echo iron breeze kick decline gain finish',
                'sepolia',
                'Test123!',
            ).then(setupFinished => {
                expect(setupFinished).to.be.true;
            });
        });
        it(`acceptMetamaskAccess should accept connection request to metamask`, () => {
            cy.visit('/');
            cy.get('#connectButton').click();
            cy.acceptMetamaskAccess().then(connected => {
                expect(connected).to.be.true;
            });
            cy.get('#network').contains('11155111');
            cy.get('#chainId').contains('0xaa36a7');
            cy.get('#accounts').should(
                'have.text',
                '0xc3c6f796335f9d1cceeb4f0ad92a21d6ad48a117',
            );
        });
        it(`deployNFTs should deploy NFTs`, () => {
            cy.get('#deployNFTsButton').click();
            cy.confirmMetamaskTransaction();
        });
        it(`mintNFT should mint NFT`, () => {
            cy.get('#mintButton').click();
            cy.confirmMetamaskTransaction();
        });
        it(`rejectMetamaskPermisionToApproveAll should reject permission to approve all collectibles upon warning`, () => {
            cy.get('#setApprovalForAllButton').click();
            cy.rejectMetamaskPermisionToApproveAll().then(rejected => {
                expect(rejected).to.be.true;
            });
        });
        it(`confirmMetamaskPermisionToApproveAll should confirm permission to approve all collectibles`, () => {
            cy.get('#setApprovalForAllButton').click();
            cy.confirmMetamaskPermisionToApproveAll().then(confirmed => {
                expect(confirmed).to.be.true;
            });
        });
        it(`rejectMetamaskPermisionToTransfer should reject permission to transfer collectible upon warning`, () => {
            cy.get('#transferFromButton').click();
            cy.rejectMetamaskTransaction();
        });
        it(`confirmMetamaskPermisionToTransfer should confirm permission to transfer collectible`, () => {
            cy.get('#transferFromButton').click();
            cy.confirmMetamaskTransaction();
        });
    });
});
