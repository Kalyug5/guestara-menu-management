# Menu Management API
This project is a Node.js application for managing categories, sub-categories, and items in a menu. It allows you to create, retrieve, edit, and search for these entities using a RESTful API.

## Features
Create, Edit, and Retrieve Categories
Create, Edit, and Retrieve Sub-Categories
Create, Edit, and Retrieve Items
Search Items by Name

## Prerequisites
### Node.js
### npm 
### MongoDB (local instance or MongoDB Atlas)

## Installation

Step 1: Get this or clone this repository

Step2: Install dependencies: npm install

Step 3: Set up environment variables -> Create a .env file in the root directory and add the following environment variables:
MONGO_URI="Your_mongoDB URL"
PORT=8080

## Start the Application
For Starting the application in your localhost type "npm start"

## Try Out this feature live 
Link : https://guestara-menu-management.onrender.com

# Routes to try:
## Category Route-> 
1. GET all Category-> url/api/category
2. GET single Category-> url/api/category/:identifier // identifer can be id or name
3. POST one Category-> url/api/category
4. PUT specific Category-> url/api/category/:id
5. DELETE specific Category and all it's childs sub-category and items => url/api/category/:id //id of category

## Sub Category Route->
1. GET all Sub Category-> url/api/sub-category
2. GET all Sub Category within a Category-> url/api/sub-category/subcategories/:id
3. GET specific Sub Category-> url/api/sub-category/:identifier  // identifer can be id or name
4. POST one Sub category under specific Category-> url/api/sub-category/create/:categoryId
5. PUT Sub category -> url/api/sub-category/:id
6. DELETE specific sub-category -> url/api/sub-category/:id //id of specific sub category

## Item Route->
1. GET all Items-> url/api/item
2. GET specific Item-> url/api/item/:id  // id can be id or name
3. GET all Item for a Category-> url/api/item/category/:id
4. GET all item under a Sub-Category-> url/api/item/subCategory/:id
5. GET Search the item by name -> url/api/item/search?name=xyz
6. POST item-> url/api/item
7. PUT item-> url/api/item/:id
8. DELETE item->url/api/item/:id //id of the particular item


### Try All These in https://www.postman.com/
