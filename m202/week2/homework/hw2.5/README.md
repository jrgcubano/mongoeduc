# Homework: Homework 2.5: Replica set chaining

You are operating a geographically dispersed replica set as outlined below.

- Diagram: 
	. Site A: P, S1.
	. SiteB: S2, S3. 
	. SiteC: S4

Your network operations team has asked if you can limit the amount of outbound traffic from Site A because of some capacity issues with the traffic in and out of that site (imagine this is where the majority of your users stream/download from for example). However due to how the application is deployed, you wish to keep your write traffic in Site A for performance. A further requirement is that you keep load on your primary to a minimum.

Using replica set chaining, how do you ensure that the traffic due to MongoDB replication in and out of Site A is minimized? There are several ways to achieve this, but out of the following chains, which one is best given the requirements specified above?

Note: It will probably help you to draw each of the choices below for yourself as you think through them.



P to S1/S2/S3/S4 (All secondaries replicate from the primary.)

(OK) P to S1; S1 to S2; S2 to S3; S3 to S4

P to S2; S2 to S1; S2 to S3; S3 to S4

P to S2; P to S4; S2 to S3; S2 to S4