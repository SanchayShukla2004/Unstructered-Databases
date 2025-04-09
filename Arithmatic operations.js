db.sales.insertMany([ { "_id": 1, "product": "Laptop", "category": "Electronics", "price": 800, "quantity": 5, "date": ISODate("2024-03-01T10:00:00Z"), "store": "A" }, { "_id": 2, "product": "Phone", "category": "Electronics", "price": 600, "quantity": 10, "date": ISODate("2024-03-02T12:00:00Z"), "store": "B" }, { "_id": 3, "product": "TV", "category": "Electronics", "price": 1200, "quantity": 3, "date": ISODate("2024-03-03T15:00:00Z"), "store": "A" }, { "_id": 4, "product": "Shoes", "category": "Fashion", "price": 50, "quantity": 20, "date": ISODate("2024-03-04T16:00:00Z"), "store": "C" }, { "_id": 5, "product": "Watch", "category": "Fashion", "price": 150, "quantity": 7, "date": ISODate("2024-03-05T18:00:00Z"), "store": "B" }] )

//  Total sales per product.
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])

2. Total revenue per product.

db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])

3. Total revenue per category.

db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])


4. Count of products per category.

db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 }
    }
  }
])
5. Store-wise total sales.


db.sales.aggregate([
  {
    $group: {
      _id: "$store",
      totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])
db.sales.aggregate([ { $group: { _id: "$store", totalSales: { $sum: "$quantity" } } }] )
6. Average price of products per category.

db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" }
    }
  }
])

7. Top-selling product.
db.sales.aggregate([{
$group: {_id: "$product",
totalSales: { $sum: "$quantity" }}},
{$sort: { totalSales: -1 }},
{$limit: 1}])

8. Total sales for Electronics category.
db.sales.aggregate([ {
 $match: {category: "Electronics" } }, 
{ $group: { _id: "Electronics",
 totalSales: { $sum:{$multiply:["$price","$quantity"] } 
}}}] )

9. Sales trend over time (day-wise total sales).
db.sales.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      totalSales: { $sum: { $multiply: ["$price", "$quantity"] }
    }
  }
])
10. Highest revenue-generating product.
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  },
  {
    $limit: 1
  }
])

11. Average revenue per sale.
db.sales.aggregate([ { 
$project: { sales: { $multiply: ["$price", "$quantity"] } } },
 { $group: { _id: "category", avgSales: { $avg: "$sales" } }
 }] )

12. Sales performance per store.
db.sales.aggregate([ { $group: { _id: "$store", totalsales: { $sum: { $multiply: ["$price", "$quantity"] } } } }] )

13. Products sold more than 5 times.
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: "$quantity" }
    }
  },
  {
    $match: { totalSales: { $gt: 5 } }
  }
])

14. Least sold product.
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: "$quantity" }
    }
  },
  {
    $sort: { totalSales: 1 }
  },
  {
    $limit: 1
  }
])

15. Monthly sales summary.
db.sales.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
      totalSales: { $sum:{ $multiply: ["$price", "$quantity"] } }
    }
  }
])

16. Number of unique products sold.
db.sales.aggregate([
  {
    $group: {
      _id: "product",
      uniqueProducts: { $addToSet: "$product" }
    }
  },
  {
    $project: {
      uniqueProducts: { $size: "$uniqueProducts" }
    }
  }
])

17. Maximum and minimum priced product.
db.sales.aggregate([
  {
    $group: {
      _id: "price",
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" }
    }
  }
])

18. Total revenue per product in descending order.
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  }
])

19. Revenue generated per store per category.
db.sales.aggregate([
  {
    $group: {
      _id: { store: "$store", category: "$category" },
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])

20. Products contributing more than 50% revenue.

db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      productRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$productRevenue" },
      products: { $push: "$$ROOT" }  // Keep all products in an array
    }
  },
  {
    $unwind: "$products"
  },
  {
    $match: {
      "products.productRevenue": { $gt: { $multiply: ["$totalRevenue", 0.5] } }
    }
  }])