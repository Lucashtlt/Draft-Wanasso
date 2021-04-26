var fetch = require("node-fetch");
var chai = require('chai'); 
const { json } = require("body-parser");
var assert = chai.assert;

describe('Test Apis', function () {
    it('should return the list of events', function (done) {
        fetch('http://localhost:3000/api/events').then((val) => {
            assert.equal(val.status, 200);
            val.json().then( (res) => {
                for( let obj of res) {
                    assert.exists(obj.title);
                    assert.exists(obj._id);
                    assert.exists(obj.description);
                    assert.exists(obj.startDate);
                    assert.exists(obj.endDate);
                    assert.exists(obj.image);
                    console.log(obj);
                };

                done();
            });
          
        });
    });


    it('should create a new event', function (done) {
        fetch("http://localhost:3000/api/events", {
            method: "POST",
            body: JSON.stringify(
            {
                title: "titre",
                description: "description de l'événement",
                startDate: new Date(),
                endDate: new Date(),
                image: "URL de l'image"
            })
          }).then((res) => {
                console.log(res);
            
              assert.strictEqual(res.status, 200);
              assert.strictEqual(res.body.title, "titre" );
              assert.strictEqual(res.body.description, "description de l'événement");
              assert.strictEqual(res.body.image, "URL de l'image");
              done();
          })
    })
    it('should delete an event', function (done) {
        fetch("http://localhost:3000/api/events/cdca7f73-0fc4-431d-9c6d-416b3e8495ab",{
            method: 'DELETE',
          }).then((res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, "cdca7f73-0fc4-431d-9c6d-416b3e8495ab" );
            done();
            })
            
    })
})