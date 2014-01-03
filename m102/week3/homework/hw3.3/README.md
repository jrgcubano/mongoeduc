# Homework 3.3

Download week3.js from the Download Handout link. Run this file in the shell to populate in the database of your choice a few documents in collections called:
- policies
- customers
- staffers
(Note some of these may be used in future weeks.)
Once loaded, query each collection above and verify they are non-empty. In particular run:

  db.policies.find().pretty() 
to format the output of the one policy loaded nicely.
We have been asked to find all policies that are status!="expired", with liability coverage at or above $100. Note that current:true indicates the rate that is "current" and not historical.

The query to find those policies is which of the following?



(OK) db.policies.find( { status : { $ne : "expired" }, coverages : { $elemMatch : { type : "liability", rates : { $elemMatch : { rate : { $gte : 100 }, current : true } } } } } )

db.policies.find( { status : { $ne : "expired" }, coverages : { $elemMatch : { type : "liability", rates : { rate : { $gte : 100 }, current : true } } } } )

db.policies.find( { status : { $ne : "expired" }, coverages : { type : "liability", rates : { $elemMatch : { rate : { $gte : 100 }, current : true } } } } )