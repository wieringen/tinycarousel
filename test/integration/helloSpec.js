describe('Button click', function () {
    beforeEach(function () {
      injectFixture('test/fixtures/dom_elements.html');
    });

    afterEach(function () {
      clearFixture();
    });

    it("should change the title of the document when the button is clicked", function() {
      var testObj = new Hello('Everyone'),
          btn = document.getElementById('hw');
      testObj.register(btn);
      btn.click();
      expect(document.title).to.equal('Hello Everyone!')
    });
});
