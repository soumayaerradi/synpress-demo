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
        it(`rejectMetamaskTransaction should reject transaction`, () => {
            cy.importMetamaskAccount(Cypress.env('PRIVATE_KEY_WITH_FUNDS'));
            cy.get('#requestPermissions').click();
            cy.acceptMetamaskAccess();
            cy.get('#createToken').click();
            cy.rejectMetamaskTransaction().then(rejected => {
                expect(rejected).to.be.true;
            });
            cy.contains('#tokenAddresses', 'Creation Failed', {timeout: 60000});
        });
        it(`confirmMetamaskTransaction should confirm transaction for token creation (contract deployment) and check tx data`, () => {
            cy.get('#createToken').click();
            cy.confirmMetamaskTransaction().then(txData => {
                expect(txData.networkName).to.be.not.empty;
                expect(txData.customNonce).to.be.not.empty;
                expect(txData.confirmed).to.be.true;
            });
            cy.contains('#tokenAddresses', /0x.*/, {timeout: 60000})
                .invoke('text')
                .then(text => cy.log('Token hash: ' + text));
        });
        it(`rejectMetamaskAddToken should cancel importing a token`, () => {
            cy.get('#watchAssets').click();
            cy.rejectMetamaskAddToken().then(rejected => {
                expect(rejected).to.be.true;
            });
        });
        it(`confirmMetamaskAddToken should confirm importing a token`, () => {
            cy.get('#watchAssets').click();
            cy.confirmMetamaskAddToken().then(confirmed => {
                expect(confirmed).to.be.true;
            });
        });
        it(`importMetamaskToken should import token to metamask`, () => {
            const USDCContractAddressOnSepolia =
                '0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f';
            cy.importMetamaskToken(USDCContractAddressOnSepolia).then(tokenData => {
                expect(tokenData.tokenContractAddress).to.be.equal(
                    USDCContractAddressOnSepolia,
                );
                expect(tokenData.tokenSymbol).to.be.equal('USDC');
                expect(tokenData.tokenDecimals).to.be.equal('6');
                expect(tokenData.imported).to.be.true;
            });
        });
        it(`importMetamaskToken should import token to metamask using advanced token settings`, () => {
            const tDAIContractAddressOnSepolia =
                '0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0';
            cy.importMetamaskToken({
                address: tDAIContractAddressOnSepolia,
                symbol: 'IADt',
            }).then(tokenData => {
                expect(tokenData.tokenContractAddress).to.be.equal(
                    tDAIContractAddressOnSepolia,
                );
                expect(tokenData.tokenSymbol).to.be.equal('IADt');
                expect(tokenData.tokenDecimals).to.be.equal('18');
                expect(tokenData.imported).to.be.true;
            });
        });
        it(`rejectMetamaskPermissionToSpend should reject permission to spend token`, () => {
            cy.get('#approveTokens').click();
            cy.rejectMetamaskPermissionToSpend().then(rejected => {
                expect(rejected).to.be.true;
            });
        });
        it(`confirmMetamaskPermissionToSpend should approve permission to spend token`, () => {
            cy.get('#approveTokens').click();
            cy.confirmMetamaskPermissionToSpend().then(approved => {
                expect(approved).to.be.true;
            });
        });
    });
});
