# web-scrape-project
A full stack project that will scrape listings data from various sites like Ebay using Nodejs and cheerio. I plan to use this project to further practice Reactjs on the frontend and to learn how to create a backend by possibly using Express and mongoDB.


### Planned features
 1. Web Scrapping(Nodejs, Cheerio)
    * [x] Scrape ebay listings
    * [ ] ~Scrape craigslist~(postponed till i figure out how to connect ebay scrape data first.) 
    * [x] get data from multiple pages (pagination)
 2. Backend(Mongodb,express)
    * [x] Make a database.
    * [x] Connect the database.
    * [x] Figure out how to send scrapped data to this database.
 3. Frontend(Reactjs)
    * [ ] Create a search component.
    * [ ] Create a listings component.
    * [ ] Implement hooks.

### Updates
- 2/21/21 Added Ebay scrapping.
- 2/23/21 Switched from scrapping FB marketplace to another website due to the classes being to convoluted.
- 3/1/21  Pagination for ebay web scrapped data implemented.
- 3/5/21  Refactored the web scrapper to scrape fewer results.
- 3/6/21  Successfully connected the database to web scrapped data!
### Dependencies
- [cheerio.js](https://cheerio.js.org/) Parses html data and extracts data.
- [axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and node.js.
- [esm](https://www.npmjs.com/package/esm) Allows for import and exports.
- [mongoose](https://www.npmjs.com/package/mongoose) Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [express](http://expressjs.com) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
### How to run and use

On the file index.js input your search term onto the following function:
``` 
scrapperEbay("Search term goes here");
```
Run the command to run the project:
```
npm start
```
