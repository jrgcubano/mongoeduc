// week4.js

homework = { } 

var d = db.getSisterDB("week4");

homework.init = function() { 
    if( rs.conf() != null ) { 
	print("at this stage of the homework the mongod should NOT be using --replSet");
	return;
    }
    if( d.foo.count() != 0 ) { 
	print("expected week4.foo collection to be empty to init. can't init. :-(");
	return;
    }
    for( var i = 0; i < 5000; i++ ) d.foo.insert({x:i,y:Math.random()});
    var result = db.getLastError();
    if( result ) print("Something is wrong? : " + result);
    else print("ok");
}

homework.a = function() { 
    return d.foo.stats().count + d.foo.stats().nindexes;
}

homework.b = function() { 
    if( !db.isMaster().ismaster ) {
	print("something is wrong. try again. initiate?");
	return;
    }
    if( rs.status().members.length != 1 ) { 
	print("only supposed to be one member of the set at this point. try again?");
	return;
    }
    return rs.status().members.length + d.foo.count() + 1;
}

homework.c = function() { 
    var s = rs.status();
    if( s.members.length != 3 ) { 
	print("something is wrong i don't see 3 members");
	return;
    }
    var x = 0;
    s.members.forEach( function(m){x+=m.state} );
    if( x > 7 ) { 
	print("something isn't right yet. did you wait for the new members to finish synchronizing?");
    }
    return x;
}

homework.d = function() {
    var s = rs.status();
    if( s.members.length != 2 ) {
	print("something is wrong i don't see 2 members");
	return;
    }
    var x = 0;
    s.members.forEach( function(m){x+=m._id+m.state} );
    if( x > 9 ) {
	print("something isn't right yet. did you wait for a new election to finish? want to see a primary and a secondary");
    }
    return x;
}
