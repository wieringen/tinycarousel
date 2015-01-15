describe('Hello', function () {
    it('should be an function', function() {
      expect(Hello).to.be.an('function');
    });

    describe('.register()', function() {
      it('should add an event handler correctly if addEventListener is supported', function() {
        var testObj = new Hello('World'),
            el = {
              addEventListener: function() {}
            },
            mock = sinon.mock(el);

        mock.expects('addEventListener').once().callsArgWith(1, 'click').callsArgWith(3, 'false');

        testObj.register(el);
        mock.verify();
      });

      it('should add an event handler correctly if attachEvent is supported', function() {
        var testObj = new Hello('World'),
            el = {
              attachEvent: function() {}
            },
            mock = sinon.mock(el);

        mock.expects('attachEvent').once().withArgs('onclick');

        testObj.register(el);
        mock.verify();
      });
    });

  describe('.hello()', function() {
    it('should change document title correctly when created without a parameter"', function() {
      var testObj = new Hello();
      document.title = 'A document title';
      testObj.hello();
      expect(document.title).to.equal('Hello World!')
    });

    it('should change document title correctly when created with a parameter"', function() {
      var testObj = new Hello('Everyone');
      document.title = 'A document title';
      testObj.hello();
      expect(document.title).to.equal('Hello Everyone!')
    });
  });
});
