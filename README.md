# web-scrape-project
A full stack project that will scrape listings data from various sites like Ebay using Nodejs and cheerio. I plan to use this project to further practice Reactjs on the frontend and to learn how to create a backend by possibly using Express and mongoDB.


### Planned features
 1. Web Scrapping(Nodejs, Cheerio)
    * [x] Scrape ebay listings
    * [x] get data from multiple pages (pagination)
    * [ ] Get Etsy data.
 2. Backend(Mongodb,express)
    * [x] Make a database.
    * [x] Connect the database.
    * [x] Figure out how to send scrapped data to this database.
    * [ ] Send etsy data to the database
   
 3. Frontend(Reactjs)
    * [x] Create a search component.
    * [x] Create a listings component.
    * * [x] Display Ebay Listings 
    * * [ ] Display Etsy listings
    * [x] Implement hooks.

### Updates
- 2/21/21 Added Ebay scrapping.
- 2/23/21 Switched from scrapping FB marketplace to another website due to the classes being to convoluted.
- 3/1/21  Pagination for ebay web scrapped data implemented.
- 3/5/21  Refactored the web scrapper to scrape fewer results.
- 3/6/21  Successfully connected the database to web scrapped data!
- 3/16/21 Connected SearchBar Component to database.
- 3/24/21 Listings display data pulled from db.
- 4/07/21 Started work on implementing etsy results.
### Dependencies
- [cheerio.js](https://cheerio.js.org/) Parses html data and extracts data.
- [axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and node.js.
- [esm](https://www.npmjs.com/package/esm) Allows for import and exports.
- [mongoose](https://www.npmjs.com/package/mongoose) Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [express](http://expressjs.com) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [morgan](https://github.com/expressjs/morgan#readme) HTTP request logger middleware for node.js.
### How to run and use

On the file index.js input your search term onto the following function:
``` 
scrapperEbay("Search term goes here");
```
Run the command to run the project:
```
npm start
```
