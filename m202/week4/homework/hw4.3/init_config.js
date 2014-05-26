config = { _id: "m202", members:[
          { _id : 0, host : "localhost:27017"},
          { _id : 1, host : "localhost:27018"}]
	  };
rs.initiate(config);
rs.status()
