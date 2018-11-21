# Gulp CSS/SCSS/JS starter kit

## What

This is a starter kit for compiling you scss into a final CSS bundle while also having the option to include vendor files

## Setup

- Requires node.js/npm so install that first
  Run the following commands to install dependencies the first time.
  // run the FOLLOWING BEFORE trying to run gulp
  // npm install gulp-cli -g
  // npm install gulp -D
  // npm install

## Folder Structure

/src -- Is the area you add and edit files
/src/js -- Your app files go here, vendor files (code that is not yours) goes in the vendor sub folder
/src/scss -- Sass files go here, partials start with \_filename.scss and are imported into the main style.scss file

You do not edit the /css or /js directories, gulp outputs to those, only edit in the /src folder

## Adding Bootstrap3 / Font-awesome / jQuery

To install all these vendors run `gulp vendors` otherwise individually with commands `gulp bootstrap3` or `gulp jquery` etc..

## Updating Vendors

run `npm update` and then the same commands to add them to your project such as `gulp vendors` or `gulp jquery`
