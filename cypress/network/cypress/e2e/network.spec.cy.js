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
        it(`getCurrentNetwork should return network by default`, () => {
            cy.visit('/');
            cy.getCurrentNetwork().then(network => {
                expect(network.name).to.match(/sepolia/i);
                expect(network.id).to.be.equal(11155111);
                expect(network.testnet).to.be.true;
            });
        });
        it(`addMetamaskNetwork should add custom network`, () => {
            cy.addMetamaskNetwork({
                networkName: 'Optimism Network',
                rpcUrl: 'https://mainnet.optimism.io',
                chainId: 10,
                symbol: 'oETH',
                blockExplorer: 'https://optimistic.etherscan.io',
                isTestnet: false,
            }).then(networkAdded => {
                expect(networkAdded).to.be.true;
            });
            cy.get('#network').contains('10');
            cy.get('#chainId').contains('0xa');
        });
        it(`getCurrentNetwork should return valid network after adding a new network`, () => {
            cy.getCurrentNetwork().then(network => {
                expect(network.name).to.match(/optimism network/i);
                expect(network.id).to.be.equal(10);
                expect(network.testnet).to.be.false;
            });
        });
        it(`changeMetamaskNetwork should change network using pre-defined network`, () => {
            cy.changeMetamaskNetwork('ethereum').then(networkChanged => {
                expect(networkChanged).to.be.true;
            });
            cy.get('#network').contains('1');
            cy.get('#chainId').contains('0x1');
        });
        it(`getCurrentNetwork should return valid network after changing a network`, () => {
            cy.getCurrentNetwork().then(network => {
                console.log(network);
                expect(network.name).to.match(/ethereum/i);
                expect(network.id).to.be.equal(1);
            });
        });
        it(`changeMetamaskNetwork should discard changing network if it is current one`, () => {
            cy.changeMetamaskNetwork('ethereum').then(networkChanged => {
                expect(networkChanged).to.be.false;
            });
        });
        it(`changeMetamaskNetwork should change network using custom network name`, () => {
            cy.changeMetamaskNetwork('optimism network').then(networkChanged => {
                expect(networkChanged).to.be.true;
            });
            cy.get('#network').contains('10');
            cy.get('#chainId').contains('0xa');
            cy.changeMetamaskNetwork('sepolia');
        });
    });
});
