
var cust = { 
    _id : ObjectId("5097f7351d9a5941f5111d61"),
    name : { first:"Jane", last:"Doe" },
    address : { street:"123 Main Street", state:"VA" }
};
db.customers.save(cust);

var staff = { 
    _id : ObjectId("5097f7351d9a5999f5111d69"),
    name : { first:"Jane", last:"Smith" }
}
db.staffers.save(staff);   
staff = { 
    _id : 
    ObjectId("5097f84cf8dd729bc7273068"),
    name : { first:"Dave", last:"Paul" }
};
db.staffers.save(staff);
{
    delete cust.address;
    db.staffers.save(cust);
}

var t = db.policies;

if( t.count() > 100 ) { 
    throw "stopping afraid there is real data in this db or something as there are lots of things in the policies collection";    
}
t.drop();

var x = 
{ 
    _id : "1024850AB",
    status : "draft",
    insured_item : {
	make   : "Cessna",
	model  : "Skylane",
	year   : 1982,
	serial : "AB1783A"
    },
    insured_parties : [ 
		       ObjectId("5097f7351d9a5941f5111d61")
			],
    coverages : 
[
 {
    type: "liability", limit:1000000, 
    rates:
      [ { rate:200,staff_id:ObjectId("5097f7351d9a5999f5111d69"), 
          date: ISODate("2012-11-05T17:29:54.561Z"),
          current:true
        }
      ]
 },
 {
    type:"property", deductible:5000, limit:100000, 
    rates:
      [ {rate:300,staff_id:ObjectId("5097f7351d9a5999f5111d69"), 
         date:
	    ISODate("2012-11-05T17:29:56.561Z"),current:true
        }
      ]
 }
],
	"underwriting" : {
	"staff_id" : ObjectId("5097f84cf8dd729bc7273068"),
	    "action" : "approved",
	    "date" : ISODate("2012-11-05T17:33:00.693Z")
	    }
};

t.insert( x );

function map_closest() {
    var pitt = [-80.064879, 40.612044];
    var phil = [-74.978052, 40.089738];

    function distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (distance(this.loc, pitt) < distance(this.loc, phil)) {
        emit("pitt",1);
    } else {
        emit("phil",1);
    }
}
