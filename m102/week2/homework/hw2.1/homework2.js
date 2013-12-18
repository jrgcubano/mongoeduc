// homework2.js
homework = { }
homework.a = function() { 
    if( db != "pcat" ) { 
        print("the db variable is not set to the 'pcat' database context. do that and try again?");
        return 0;
    }
    return db.products_bak.findOne({monthly_price:60}).limits.voice.over_rate + db.products_bak.find({type:'service'}).count();
}
homework.b = function() { 
    var x = db.products.findOne( { _id : ObjectId("507d95d5719dbef170f15c00") } );
    if( x == null ) { 
        print("hmmm, something isn't right? try again / investigate?");
        return 0;
    }
    return "" + x.limits.voice.over_rate + x.limits.sms.over_rate + x.monthly_price + x.term_years + db.products.find({term_years:3}).count();
}
homework.c = function() { 
    // this could be done with aggregation framework too; using the older and less sophisticated group command
    // so that it would work with pre v2.2 releases of mongodb.
    // e.g. something like 
    //   db.products.aggregate( { $group : { _id : "grand", total : { $sum : "$price" } } } ).result[0].total
    return "" + 
    db.products.group( {cond:{for:'ac3'},  reduce: function(obj,prev) { prev.csum += obj.price; },  initial: { csum: 0 } })[0].csum +
    db.products.group( {cond:{price:{$gte:0}},  reduce: function(obj,prev) { prev.csum += obj.price; },  initial: { csum: 0 } })[0].csum;
}

