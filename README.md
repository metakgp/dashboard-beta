# Dashboard

This is an open-source project built by Team MetaKGP for event Dashboard of the 5th Inter-IIT Tech Meet held at IIT Kanpur. Dashboard is a web application that encompasses all requirements of a student at campus, at a single place. This includes features such as -

- [x] Community curated content such as `How-To` guides, `Yellow pages`, `Course reviews`
- [x] Search for previous year Question papers
- [x] Search for professors based on their research projects and fields of expertise
- [x] Academic Timetable scraper for calendar notifications
- [x] In-campus event calendar
- [x] Dedicated newsfeed of campus-related Facebook posts
- [x] Driver status & Cab sharing portals
- [ ] Buy & Sell portal
- [ ] Lost / Found portal

### Team Members

- [Naresh Ramesh](https://github.com/ghostwriternr)
- [Athitya Kumar](https://github.com/athityakumar)
- [Ayush Goyal](https://github.com/DefCon-007)
- [Rameshwar Bhaskaran](https://github.com/zorroblue)

### Dependencies

Since this web interface has been built on MEAN stack, these dependencies have to be installed first - 

- Nodejs
- Yarn
- Mongodb

After they have been installed, `yarn install` will install all the other dependencies. Following this, simply `node app.js` should be rendering to `localhost:3000`.

### Sub-modules

Multiple sub-modules have been integrated to make this Dashboard, a single go-to place for students. These sub-modules are much more well maintained, and have a bigger community developing it.

- Wiki ([Deployed](http://wiki.metakgp.org/))

The Wiki is **NOT** just a deployed version of the open-sourced MediaWiki. It has it's own specialities of automization - with `PyWikiBots`. For example, all course pages that have been populated on the Wiki with grade dstributions - have been created by bot `blackjack`. Similarly, there are more Wiki bots that we use - such as, `batman` and `kakashi`.

- MFQP ([GitHub](https://github.com/metakgp/mfqp) | [Deployed](https://qp.metakgp.org/))

This is the sub-module responsible for whipping up the previous year Question papers as fuzzy-search results. 

- MCMP ([GitHub](https://github.com/metakgp/mcmp) | [Deployed](http://metakgp.github.io/mcmp/))

This is the sub-module responsible for whipping up professors and their projects as fuzzy-search results. 

- Naarad ([GitHub](https://github.com/metakgp/naarad-source) | [Deployed](https://athityakumar.github.io/naarad-source/))

Naarad is the facebook newsfeed scraper, who is responsible for showing a dedicated campus newsfeed.

- GYFT ([GitHub](https://github.com/metakgp/gyft))

GYFT used to be a simple Python script that would run locally to sync the user's timetable to Google Calendar, until it got integrated into Dashboard.

- Driver status ([GitHub](https://github.com/zorroblue/driver_status))

A Django App, that provides the status of the drivers as an API to the Dashboard.

- Driver Status App ([GitHub](https://github.com/zorroblue/DriverStatusApp))

An Android App, that would be used by the Cab drivers to update their status on the go.

- Buy & Sell ([GitHub](https://github.com/zorroblue/buyandsell))

A Django App that provides API end-points to the Dashboard's Buy & Sell actions.

- Lost & Found ([GitHub](https://github.com/zorroblue/lostandfound))

A Django App that provides API end-points to the Dashboard's Lost & Found actions.