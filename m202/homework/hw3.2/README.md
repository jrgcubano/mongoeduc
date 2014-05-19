# Homework: 3.2: Operating at reduced capacity

You are running a service with a predictable traffic usage pattern. The peak usage on every Monday is currently 101,400 reads/sec on your replica set and occurs between 4pm and 6pm UTC.

Each day of the week, the peak is approximately 2% more than the previous day (so ~103400 on Tuesday, ~105500 on Wednesday, 107600 on Thursday, 109800 on Friday) at approximately the same time of the day. For purposes of this problem, there is no variation from these values. Weekends see significantly reduced traffic, less than 50% of the weekdays.

The application is distributed across three data centers and is using secondaryPreferred reads. Each secondary has been benchmarked to handle 20,000 reads/sec at its maximum capacity.

The business has mandated that a combination of 2 data centers must be able to handle the peak traffic, so you have deployed accordingly as follows (the business has agreed to allow the primary to be counted as a full capacity node for reads for planning purposes):

Data Center A: Primary, Secondary, Secondary
Data Center B: Secondary, Secondary, Secondary
Data Center C: Secondary, Secondary, Secondary
There is a further mandate to avoid exceeding 90% of available capacity if at all possible (for performance reasons). If the application exceeds 90%, this must be reported and escalated to the executive level.

A failure occurs at 2pm UTC on a Saturday when Data Center C becomes unavailable. Based on the description above, by when must you fix the issues in order to be sure you do not exceed the 90% capacity rule and cause escalations to happen?


Before Sunday
Before Monday
Before Tuesday
Before Wednesday
Before Thursday
(OK) Before Friday
Before Saturday