describe('A single Tinycarousel', function() {
    before(function () {
        document.head.innerHTML = __html__['test/fixtures/tinycarousel-css.html'];
    });

    beforeEach(function () {
        document.body.innerHTML = __html__['test/fixtures/tinycarousel.html'];
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });

    it('should have a chainable constructor', function() {
        $('#slider1').tinycarousel().addClass('testing');

        expect($('#slider1').hasClass('testing')).to.equal(true);
    });

    it('should have a accessible instance', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance).to.be.a('object');
        expect(instance._name).to.equal('tinycarousel');
    });

    it('should have a chainable stop method', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance.stop()._name).to.equal('tinycarousel');
    });

    it('should stop automatic sliding when stop method is called.', function() {
        var instance = $('#slider1').tinycarousel({ interval : true }).data('plugin_tinycarousel');

        expect(instance.stop().intervalActive).to.equal(false);
    });

    it('should have a chainable start method', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance.start()._name).to.equal('tinycarousel');
    });

    it('should not start automatic sliding when start method is called and interval is not allowed.', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance.start().intervalActive).to.equal(false);
    });

    it('should start automatic sliding when start method is called and interval is allowed.', function() {
        var instance = $('#slider1').tinycarousel({ interval : true }).data('plugin_tinycarousel');

        instance.stop();

        expect(instance.start().intervalActive).to.equal(true);
    });

    it('should have a chainable move method', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance.move()._name).to.equal('tinycarousel');
    });

    it('should move to last slide if given index is less then 1', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        instance.move(-1);

        expect(instance.slideCurrent).to.equal(instance.slidesTotal - 1);
    });

    it('should move to slide 1 if given index is more then slidesTotal', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        instance.move(100);

        expect(instance.slideCurrent).to.equal(1);
    });

    it('should stay in place if move method is called without arguments', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        instance.move();

        expect(instance.slideCurrent).to.equal(0);
    });

    it('should trigger the move method when the prev button is clicked', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');
        var spy = sinon.spy(instance, 'move');

        $('#slider1').find('.prev').trigger('click');

        spy.restore();

        expect(spy.calledOnce).to.equal(true);
    });

    it('should trigger the move method when the next button is clicked', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');
        var spy = sinon.spy(instance, 'move');

        $('#slider1').find('.next').trigger('click');

        spy.restore();

        expect(spy.called).to.equal(true);
        expect(spy.calledOnce).to.equal(true);
    });

    it('should have a chainable update method', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect(instance.update()._name).to.equal('tinycarousel');
    });

    it('should set slidesTotal after a update', function() {
        var instance = $('#slider1').tinycarousel().data('plugin_tinycarousel');

        expect($('#slider1').find('li:not(.mirrored)')).to.have.length(instance.slidesTotal);

        $('#slider1 .overview').append('<li>6</li>');

        instance.update();

        expect($('#slider1').find('li:not(.mirrored)')).to.have.length(instance.slidesTotal);
    });
});
