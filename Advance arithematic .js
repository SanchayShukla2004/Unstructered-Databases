db.orders.insertMany([
  {
    "_id": 1,
    "customer_name": "Alice",
    "products": [
      { "product_id": "p1", "price": 100, "quantity": 2 },
      { "product_id": "p2", "price": 200, "quantity": 1 }
    ],
    "order_date": "2024-01-12",
    "status": "Completed"
  },
  {
    "_id": 2,
    "customer_name": "Bob",
    "products": [
      { "product_id": "p3", "price": 150, "quantity": 4 }
    ],
    "order_date": "2024-01-15",
    "status": "Pending"
  },
  {
    "_id": 3,
    "customer_name": "Charlie",
    "products": [
      { "product_id": "p1", "price": 100, "quantity": 1 },
      { "product_id": "p4", "price": 250, "quantity": 2 }
    ],
    "order_date": "2024-01-16",
    "status": "Completed"
  }
])
------
// Calculate Total Sales for Each Order.



db.orders.aggregate([
  {
    $unwind: "$products"
  },
  {
    $group: {
      _id: "$_id",
      customer_name: { $first: "$customer_name" },
      total_sales: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
    }
  }
])


// Calculate Average Order Value for Completed Orders. 

db.orders.aggregate([
  {
    $match: { status: "Completed" }
  },
  {
    $unwind: "$products"
  },
  {
    $group: {
      _id: "$_id",
      total_order_value: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
    }
  },
  {
    $group: {
      _id: null,
      average_order_value: { $avg: "$total_order_value" }
    }
  }
])


db.orders.aggregate([
{$match:{status:"Completed"}},
{$unwind:"$products"},
{$group:{_id:"$_id",Totalsales:{$sum:{$multiply:["$products.price","$products.quantity"]}}}},
{$group:{_id:null,Average:{$avg:"$Totalsales"}}}
])

//Find the Maximum Quantity Sold per Product. 

db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.product_id",
      max_quantity: { $max: "$products.quantity" }
    }
  }
])

//Find Total Number of Orders for Each Status. 
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      total_orders: { $sum: 1 }
    }
  }
])

//Calculate Total Quantity of Products Sold Across All Orders. 

db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: null,
      total_quantity: { $sum: "$products.quantity" }
    }
  }
])

//Get Minimum and Maximum Order Dates.
db.orders.aggregate([
  {
    $group: {
      _id: null,
      min_date: { $min: "$order_date" },
      max_date: { $max: "$order_date" }
    }
  }
])

//Find Total Sales for Each Customer. 

db.orders.aggregate([
  {
    $unwind: "$products"
  },
  {
    $group: {
      _id: "$customer_name",
      total_sales: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
    }
  }
])



//Calculate the Total Number of Distinct Products Sold.

db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.product_id"
    }
  },
  {
    $group: {
      _id: null,
      distinct_products: { $sum: 1 }
    }
  }
])


