describe('User List Module.', function() {
    var scope;

    beforeEach(function() {
        module('svcCommunication');
    });

    it('CommunicationService - Validate initialization of controller properties.', inject(function(CommunicationService) {
        expect(CommunicationService.FetchType).toEqual({ GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' });
    }));
});