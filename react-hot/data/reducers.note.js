/*
- Reducer never modify the state; they always create a new copy with
the needed modification.
- Middleware is a more advanced of Redux
- The middleware act like interceptors for actions before they reach the store
- Middleware can modify the actions, create more actions, suppress actions, and much more
- Since the middleware have access to the actions, the dispatch function and store,
they are the most versatile and powerful entities in Redux

- A pure function returns values by using its arguments, it uses no additional
data and changes no data structures, touches no storage, and emits no external events
(like network calls), this means that you can be completely sure that every time
you call the function with the same arguments, you will always get the same result

- You can use Object.freeze to lock object changes
- Object.freeze won't freeze nested objects

const orders = {
  bread: {
    price: 10
  },
  milk: {
    price: 20
  }
}

Object.freeze(orders);

orders.milk.price -= 15;
console.log(orders.milk.price);

// Elasticsearch

Partitioning your document into different containers or `shards`
which can be stored on a single node or on multiple nodes

Balancing these shards across the nodes in your cluster to spread
the indexing and search load

Duplicating each shard to provide redundant copies of your data,
to prevent data loss in case of hardware failure

Seamlessly integrating new nodes as your cluster grows or redistributing
shards to recover from node loss

While Elasticsearch can benefit from more-powerful hardware, vertical
scale has its limits. Real scalability comes from horizontal scale - the ability
to add more nodes to the cluster and to spread load and reliability between them.

 */