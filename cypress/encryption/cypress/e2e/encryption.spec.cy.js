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
        it(`rejectMetamaskEncryptionPublicKeyRequest should reject public encryption key request`, () => {
            cy.get('#getEncryptionKeyButton').click();
            cy.rejectMetamaskEncryptionPublicKeyRequest().then(rejected => {
                expect(rejected).to.be.true;
            });
            cy.get('#encryptionKeyDisplay').contains(
                'Error: MetaMask EncryptionPublicKey: User denied message EncryptionPublicKey.',
            );
        });
        it(`confirmMetamaskEncryptionPublicKeyRequest should confirm public encryption key request`, () => {
            cy.get('#getEncryptionKeyButton').click();
            cy.confirmMetamaskEncryptionPublicKeyRequest().then(confirmed => {
                expect(confirmed).to.be.true;
            });
            cy.get('#encryptionKeyDisplay').contains(
                'zhoSmidt69sNWTn8BSvPdlGC6UrgL9CNllCAR8nghQo=',
            );
        });
        it(`confirmMetamaskDecryptionRequest should confirm request to decrypt message with private key`, () => {
            cy.get('#encryptMessageInput').type('test message');
            cy.get('#encryptButton').click();
            cy.get('#ciphertextDisplay').contains('0x7');
            cy.get('#decryptButton').click();
            cy.confirmMetamaskDecryptionRequest().then(confirmed => {
                expect(confirmed).to.be.true;
            });
            cy.get('#cleartextDisplay').contains('test message');
        });
        it(`rejectMetamaskDecryptionRequest should reject request to decrypt message with private key`, () => {
            cy.get('#decryptButton').click();
            cy.rejectMetamaskDecryptionRequest().then(rejected => {
                expect(rejected).to.be.true;
            });
            cy.get('#cleartextDisplay').contains(
                'Error: MetaMask Decryption: User denied message decryption.',
            );
        });
    });
});
