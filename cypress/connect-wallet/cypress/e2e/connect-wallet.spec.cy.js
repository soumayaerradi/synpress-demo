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
        it('rejectMetamaskAccess should reject connection request to metamask', () => {
            cy.visit('/');
            cy.get('#connectButton').click();
            cy.rejectMetamaskAccess().then(rejected => {
                expect(rejected).to.be.true;
            });
        });
        it(`acceptMetamaskAccess should accept connection request to metamask`, () => {
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
        it(`eth_accounts should return valid wallet address`, () => {
            cy.get('#getAccounts').click();
            cy.get('#getAccountsResult').should(
                'have.text',
                '0xc3c6f796335f9d1cceeb4f0ad92a21d6ad48a117',
            );
        });

        it(`importMetamaskAccount should import new account using private key`, () => {
            cy.importMetamaskAccount(
                '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6',
            ).then(imported => {
                expect(imported).to.be.true;
            });
            cy.get('#requestPermissions').click();
            cy.acceptMetamaskAccess();
            cy.get('#accounts').contains(
                '0xa0ee7a142d267c1f36714e4a8f75612f20a79720',
            );
        });
        it(`createMetamaskAccount should create new account with default name`, () => {
            cy.createMetamaskAccount().then(created => {
                expect(created).to.be.true;
            });
        });
        it(`createMetamaskAccount should create new account with custom name`, () => {
            cy.createMetamaskAccount('custom-wallet').then(created => {
                expect(created).to.be.true;
            });
        });
        it(`createMetamaskAccount should not fail when creating new account with already existing custom name`, () => {
            cy.createMetamaskAccount('custom-wallet').then(created => {
                expect(created).to.be.equal('This account name already exists');
            });
        });
        it(`switchMetamaskAccount should switch to another account using order number`, () => {
            cy.switchMetamaskAccount(2).then(switched => {
                expect(switched).to.be.true;
            });
        });
        it(`getMetamaskWalletAddress should return wallet address of current metamask account`, () => {
            cy.getMetamaskWalletAddress().then(address => {
                expect(address).to.be.equal(
                    '0xC9795c44EeC77c0D706737BBD3DC3c027231F025',
                );
            });
        });
        it(`switchMetamaskAccount should switch to another account using account name`, () => {
            cy.switchMetamaskAccount('account 1').then(switched => {
                expect(switched).to.be.true;
            });
        });
        it(`getMetamaskWalletAddress should return valid wallet address of metamask account after changing an account`, () => {
            cy.getMetamaskWalletAddress().then(address => {
                expect(address).to.be.equal(
                    '0xc3c6F796335F9d1CcEeB4F0aD92A21d6AD48A117',
                );
            });
        });
        it(`resetMetamaskAccount should reset current account`, () => {
            cy.resetMetamaskAccount().then(resetted => {
                expect(resetted).to.be.true;
            });
        });
    });
});
