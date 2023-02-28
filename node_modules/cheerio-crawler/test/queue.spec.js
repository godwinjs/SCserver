const should = require('should');

const Queue = require('../lib/queue');

describe('Queue', () => {

    describe('instance', () => {
        var queue;
        beforeEach(() => {
            queue = new Queue();
        });

        it('should throw error when adding falsy value', () => {
            should(() => {
                queue.add('');
            }).throw();
        });

        describe('when 1 url is added', () => {
            beforeEach(() => {
                queue.add('http://localhost:3000/');
            });
            it('should know it was added', () => {
                should(queue.wasAdded('http://localhost:3000/')).eql(true);
            });
            it('should know something else was not added', () => {
                should(queue.wasAdded('http://localhost:3000/something-else')).eql(false);
            });
            it('should get next unvisited', () => {
                should(queue.next()).eql('http://localhost:3000/');
            });
            it('should only get each next unvisited once', () => {
                queue.next();
                should(queue.next()).not.be.ok();
            });
            it('should know it was added after getting next', () => {
                queue.next();
                should(queue.wasAdded('http://localhost:3000/')).eql(true);
            });
            it('should have visited one', () => {
                queue.next();
                queue.next();
                should(queue.visited).eql(['http://localhost:3000/']);
            });
        });

        describe('when 2 urls are added', () => {
            beforeEach(() => {
                queue.add('http://localhost:3000/');
                queue.add('http://localhost:3000/about');
            });
            it('should know first was added', () => {
                should(queue.wasAdded('http://localhost:3000/')).eql(true);
            });
            it('should know second was added', () => {
                should(queue.wasAdded('http://localhost:3000/about')).eql(true);
            });
            it('should get next unvisited', () => {
                should(queue.next()).eql('http://localhost:3000/');
            });
            it('should get next in same order', () => {
                queue.next();
                should(queue.next()).eql('http://localhost:3000/about');
            });
            it('should run out of next urls', () => {
                queue.next();
                queue.next();
                should(queue.next()).not.be.ok();
            });

            describe('when cleared', () => {
                beforeEach(() => {
                    queue.clear();
                });
                it('should run out of next urls', () => {
                    should(queue.next()).not.be.ok();
                });
            });
        });

        describe('when adding 2 same urls', () => {
            beforeEach(() => {
                queue.add('http://localhost:3000/');
                queue.add('http://localhost:3000/');
            });
            it('should know it was added', () => {
                should(queue.wasAdded('http://localhost:3000/')).eql(true);
            });
            it('should get next', () => {
                should(queue.next()).eql('http://localhost:3000/');
            });
            it('should get next only once', () => {
                queue.next();
                should(queue.next()).not.be.ok();
            });
        });

        describe('when adding 2 urls then duplicating first', () => {
            beforeEach(() => {
                queue.add('http://localhost:3000/');
                queue.add('http://localhost:3000/about');
                queue.add('http://localhost:3000/');
            });
            it('should get next', () => {
                should(queue.next()).eql('http://localhost:3000/');
            });
            it('should get next second', () => {
                queue.next();
                should(queue.next()).eql('http://localhost:3000/about');
            });
            it('should run out after third next', () => {
                queue.next();
                queue.next();
                should(queue.next()).not.be.ok();
            });
        });
    });
});
