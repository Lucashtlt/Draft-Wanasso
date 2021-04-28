var fetch = require("node-fetch");
var chai = require('chai');
var assert = chai.assert;
const supertest = require('supertest');
const api = supertest("http://localhost:3000/api/events")
var id = ''

describe('Test Apis', function () {
    it('should return the list of events', function (done) {
        api
            .get('')
            .set('Accept', 'application/json')
            .end((err,res) => {
                assert.equal(err, undefined);
                for (let obj of res.body) {
                    assert.exists(obj.title);
                    assert.exists(obj._id);
                    assert.exists(obj.description);
                    assert.exists(obj.startDate);
                    assert.exists(obj.endDate);
                    assert.exists(obj.image);
                };
                done();
            });
    });



    it('should create a new event', function (done) {
        let data = {
            title: "titre",
            description: "description de l'événement",
            startDate: new Date('2018-09-22T15:00:00.000Z'),
            endDate: new Date('2018-09-22T16:00:00.000Z'),
            image: "URL de l'image"
        }
        api.post('')
            .send(data)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                console.log(res.body);
                assert.strictEqual(res.body.title, "titre");
                assert.strictEqual(res.body.description, "description de l'événement");
                assert.strictEqual(res.body.startDate, '2018-09-22T15:00:00.000Z');
                assert.strictEqual(res.body.endDate, '2018-09-22T16:00:00.000Z');
                assert.strictEqual(res.body.image, "URL de l'image");
                id = res.body._id
                done();
            })
    });


    it('should delete an event', function (done) {
        console.log(id);
        api.delete("/" + id)
            .end( function (err, res) {
                console.log(res.body);
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.id, id);
                done();
            })

    })

    it('should not find the deleted event', function (done) {
        api.get('')
            .set('Accept', 'application/json')
            .end((err, val) => {
                assert.equal(err, undefined);
                if (val.body.length != 0) {
                    for (let obj of val.body) {
                        assert.notEqual(obj._id, id);
                        console.log(obj);
                    };
                }
                else {
                    throw (err)
                }
                done();
            });

    })

})
